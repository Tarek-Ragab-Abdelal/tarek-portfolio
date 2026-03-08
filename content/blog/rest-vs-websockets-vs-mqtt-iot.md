---
title: "REST vs WebSockets vs MQTT: Choosing the Right Protocol for IoT Projects"
excerpt: "A practical decision framework for selecting communication protocols in IoT systems, based on real project trade-offs across latency, reliability, and infrastructure complexity."
date: "2026-03-08"
tags: ["IoT", "Architecture", "MQTT", "WebSockets", "REST"]
---

Every IoT project eventually hits the same question: how should devices talk to the cloud, and how should the cloud talk to clients? The answer shapes your infrastructure, your latency characteristics, and your operational complexity for years. Getting it wrong early means expensive refactoring later.

I have worked across enough IoT and data projects to have made mistakes with all three major options. This post is the framework I now use to make that decision early and confidently.

## The three protocols and what they are actually for

### REST over HTTP

REST is stateless request-response. A client sends a request, a server sends a response, the connection closes. Simple, well-understood, and supported everywhere.

Where it works in IoT:
- **Device provisioning and configuration**: a device registers itself, fetches its configuration, or updates its firmware. These are infrequent, latency-tolerant operations where REST is ideal.
- **Command dispatch when polling is acceptable**: if a device checks in every 30 seconds and asks "do I have any pending commands?", REST works fine.
- **Dashboard data queries**: a browser asking for aggregated sensor history over the last 24 hours is a classic REST use case.

Where it fails:
- **Real-time data streaming**: polling every second is not real-time. It is expensive, introduces latency, and does not scale.
- **Constrained devices**: HTTP headers, TLS handshakes, and TCP connection overhead are significant on microcontrollers with 256KB of RAM. Each connection costs memory and CPU cycles you may not have.

### WebSockets

WebSockets establish a persistent, bidirectional TCP connection. Once the handshake completes, both sides can push messages to each other at any time without the overhead of a new connection per message.

Where it works in IoT:
- **Browser dashboards with live data**: a web client displaying real-time sensor readings is the canonical WebSocket use case. The server pushes new readings as they arrive; the browser renders them instantly.
- **Interactive device control with low latency**: if an operator needs to send commands and see immediate feedback, WebSockets provide the round-trip response time that REST polling cannot match.
- **Notification delivery**: pushing alerts to a browser or desktop client when a threshold is crossed.

Where it fails:
- **Unreliable networks**: WebSockets assume a stable TCP connection. On a device connected over cellular or a flaky Wi-Fi link, the connection drops frequently. Every drop requires a full reconnect and re-handshake, which consumes bandwidth and battery.
- **Many concurrent devices**: maintaining thousands of persistent WebSocket connections on a server is resource-intensive. You pay the connection cost even when devices are idle.
- **Constrained devices**: WebSockets are TCP-based and require the same connection overhead as HTTP. Not suitable for devices where power consumption and memory are tightly constrained.

### MQTT

MQTT is a publish-subscribe protocol designed specifically for constrained devices and unreliable networks. Devices publish messages to topics. A broker receives and routes messages to subscribers. The connection is persistent but lightweight, with a minimal binary header.

Where it works in IoT:
- **High-frequency sensor telemetry**: a sensor publishing temperature every 500ms over MQTT adds negligible overhead per message. The same pattern over REST would be unusable at scale.
- **Unreliable networks**: MQTT has built-in Quality of Service levels. QoS 1 guarantees at-least-once delivery with automatic retransmission. QoS 2 guarantees exactly-once delivery. These are protocol-level features, not application-level workarounds.
- **Battery-powered devices**: MQTT supports a Last Will and Testament message (automatically sent if a device disconnects unexpectedly) and a keep-alive mechanism. Both are designed for intermittent connectivity.
- **Fan-out and multi-consumer architectures**: one device publishes to a topic; multiple consumers subscribe. Adding a new consumer requires zero changes to the device or the existing consumers.

Where it fails:
- **Browser clients**: browsers cannot open raw TCP connections. To use MQTT in a browser, you need MQTT over WebSockets, which adds complexity and partially negates the protocol's overhead advantages.
- **Request-response patterns**: MQTT is fundamentally publish-subscribe. Implementing request-response requires topic conventions and correlation IDs. It is doable but awkward compared to REST.
- **Operational simplicity**: you need to run a broker (Mosquitto, HiveMQ, AWS IoT Core, Azure IoT Hub). This is additional infrastructure to manage.

## The decision framework

When I start an IoT project, I answer four questions:

**1. How frequently does the device send data?**

Less than once per minute: REST polling from the device is workable. More frequently than that, REST becomes expensive and MQTT becomes the clear choice.

**2. How constrained is the device?**

A Raspberry Pi can run full HTTP with TLS without issue. An ESP32 can handle it but you pay attention to connection overhead. An Arduino-class device with 32KB of RAM cannot afford HTTP connection overhead at any reasonable frequency. MQTT was built for this tier.

**3. Does the browser need live data?**

If yes, you need WebSockets or Server-Sent Events on the client side regardless of what the device uses. A common and effective pattern: devices publish over MQTT, the server subscribes and forwards updates to browser clients over WebSockets. Each protocol does what it is best at.

**4. What are the reliability requirements?**

If a missed reading is acceptable, QoS 0 MQTT or REST polling with occasional gaps is fine. If every data point matters (medical devices, billing meters, industrial controls), you need MQTT QoS 1 or 2 with appropriate retry logic.

## A pattern that works in practice

On the reporting platform I built for RES-VA, the architecture used all three protocols in their appropriate roles:

- **ESP32 sensors**: published telemetry every 10 seconds via MQTT to an Azure IoT Hub. MQTT's lightweight protocol and built-in reconnect logic handled the variable cellular connectivity without custom retry code.
- **Backend service**: subscribed to IoT Hub events, processed incoming telemetry, and stored it in PostgreSQL.
- **REST API**: exposed historical data queries for the dashboard. Time-range queries, aggregations, and device lists are all request-response patterns where REST is natural.
- **WebSocket endpoint**: pushed live telemetry updates to connected browser sessions. When a new reading arrived, the backend forwarded it to any active dashboard sessions in under 200ms.

The total complexity of each layer was low because each protocol was used for exactly the use case it was designed for. The alternative—streaming everything through REST or forcing everything through WebSockets—would have created friction at every layer.

## Common mistakes

**Using REST for high-frequency telemetry**: I have seen teams poll device endpoints or push sensor data via HTTP every second. At 100 devices, that is 100 connections per second, each with its own TCP handshake and HTTP header overhead. The server buckles, the devices drain their batteries faster, and the latency is worse than a proper pub-sub setup.

**Using MQTT for everything including browser clients**: MQTT over WebSockets works, but it requires the browser to understand MQTT topics, connection management, and subscription semantics. For most dashboard use cases, a simple WebSocket connection to your own backend is easier to reason about.

**Underestimating broker operational complexity**: self-hosted MQTT brokers require monitoring, access control configuration, TLS certificate management, and capacity planning. For smaller projects, a managed service like AWS IoT Core or Azure IoT Hub eliminates this overhead and adds features like device identity management and per-device authentication.

## The short version

- **REST**: infrequent operations, request-response, configuration, historical data queries.
- **WebSockets**: browser real-time display, low-latency interactive control.
- **MQTT**: device telemetry, constrained hardware, unreliable networks, fan-out to multiple consumers.

Most non-trivial IoT systems use all three. The engineering decision is not which one to use but where each one belongs in your architecture.
