---
title: "Throwback: Introduction to IoT Session at HTI"
excerpt: "A look back at delivering an Intro to IoT session at HTI in collaboration with IEEE HTI OCT SB."
date: "2023-05-28"
tags: ["IoT", "Education", "IEEE", "HTI"]
coverImage: "/images/blog/intro-to-iot-hti.jpg"
sourceUrl: "https://www.linkedin.com/posts/tarek-ragab_throwback-iot-education-activity-7068682610557751296-M3At"
---

![Introduction to IoT session at HTI](/images/blog/intro-to-iot-hti.jpg)

This was one of the sessions I still think about often. In collaboration with **IEEE HTI OCT SB**, I delivered an "Introduction to IoT" session at the Higher Technological Institute. The audience was mostly undergraduate engineering students, many of whom had never programmed a microcontroller before.

## Why intro sessions matter more than advanced ones

There is a common bias in the tech community: advanced topics get more respect. People want to talk about edge computing, digital twins, and ML on microcontrollers. But the reality is that most engineers who end up working in IoT built their first mental model of the field during an intro session or a beginner workshop.

If that first exposure is confusing, abstract, or disconnected from real hardware, a lot of potential talent walks away. If it is clear, hands-on, and shows a path from "blinking an LED" to "building a product," people stick around. That is why I take intro sessions seriously and put the same preparation into them as I would for a conference talk.

## What I covered

The session was structured to build understanding progressively:

### 1. What IoT actually means

I started with a definition that avoids buzzwords: IoT is about connecting physical things to software systems so you can monitor, control, or automate them. That is it. No need to invoke Industry 4.0 or smart cities in the first five minutes.

I showed a simple example: a temperature sensor connected to an ESP32 that sends readings to a dashboard. From this single example, you can explain:
- How a sensor converts physical phenomena to electrical signals.
- How a microcontroller reads those signals and processes them.
- How data moves from the device to a server (WiFi, MQTT, HTTP).
- How a frontend displays that data to a human.

### 2. The hardware landscape

I introduced the most common platforms students would encounter:
- **Arduino**: great for learning, simple programming model, massive community.
- **ESP32**: adds WiFi and Bluetooth, more processing power, widely used in real products.
- **STM32**: professional-grade, used in industrial applications, steeper learning curve.
- **Raspberry Pi**: when you need a full Linux environment on the edge.

The point was not to pick a winner but to show that different tools exist for different problems. A student building a home automation project has different needs than an engineer designing industrial monitoring equipment.

### 3. Communication protocols

This is where most beginners get lost, so I kept it practical:
- **HTTP**: familiar, works for low-frequency data, high overhead.
- **MQTT**: lightweight publish-subscribe model, ideal for IoT. Low bandwidth, low power, designed for unreliable networks.
- **WebSocket**: real-time bidirectional communication, good for dashboards and live monitoring.

I used the ESP32 WebSocket project I had built earlier as a live reference, showing students how data flows from sensor to browser in real time.

### 4. From prototype to product

The last section addressed the gap between a working breadboard prototype and a deployable product. Key considerations I highlighted:
- **Power management**: a battery-powered device needs to sleep aggressively and wake only when necessary.
- **Reliability**: what happens when WiFi drops? What happens when the sensor returns bad data?
- **Security**: IoT devices are attack surfaces. Unencrypted communication and default credentials are real risks.
- **OTA updates**: you need a way to update firmware remotely after deployment.

## The audience response

What stood out was how engaged the students were. The questions were excellent. Not just "how do I connect this wire" but questions like "how do you handle sensor drift over time?" and "what happens if two devices publish to the same MQTT topic simultaneously?" These are the kinds of questions that show someone is already thinking like an engineer, not just following a tutorial.

One student asked about career paths in IoT, which led to a broader conversation about how IoT engineering sits at the intersection of embedded systems, cloud infrastructure, and product design. It is not a narrow specialization. It is one of the most cross-disciplinary fields in software engineering.

## The experience of teaching

During this period, I was also serving as an **IoT Instructor at CIC Cairo**, where I delivered a full curriculum with 80+ hours of workshops and lab sessions for 200+ students. The HTI session was part of a broader commitment to technical education that I maintained throughout 2022-2023.

Teaching forces you to understand things at a deeper level than building does. When you build, you can sometimes get away with "it works, I will figure out why later." When you teach, students ask "why" immediately, and you need a clear answer. That pressure improved my own understanding of IoT fundamentals significantly.

## What I carry forward

Every strong introduction creates long-term leverage. One student from a session like this might build the next product that solves a real problem in their community. You never know which explanation is the one that makes something click for someone.

Technical education is not a side activity for me. It is part of how I grow as an engineer. I plan to keep doing it as long as there are curious people in the room.
