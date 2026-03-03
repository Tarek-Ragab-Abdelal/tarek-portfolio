---
title: "Design Patterns in Embedded Development: A Practical Approach"
excerpt: "A practical embedded-systems write-up on why design patterns matter for maintainability, testability, and safer feature growth."
date: "2024-05-14"
tags: ["Embedded", "IoT", "Design Patterns", "Firmware"]
coverImage: "/images/blog/design-patterns-embedded.jpg"
sourceUrl: "https://www.linkedin.com/posts/tarek-ragab_design-patterns-in-embedded-development-activity-7196139727127752704-K_eH"
---

![Design patterns in embedded development](/images/blog/design-patterns-embedded.jpg)

Most embedded developers I know have a complicated relationship with design patterns. On one side, there is the "just ship it" culture where firmware is written as a single loop with global variables and direct hardware access. On the other side, there are over-engineered abstractions that add complexity without clear benefit. The sweet spot is somewhere in the middle, and finding it matters a lot for long-term product quality.

I wrote about this topic because I kept running into the same problem across projects: firmware that worked perfectly as a prototype but became nearly impossible to extend or debug once the product requirements grew. The patterns I use are not academic exercises. They are direct responses to real problems I hit during professional IoT and embedded work.

## The real cost of no structure

In embedded development, bad architecture does not just slow you down. It creates risk. Here is what I have seen happen when teams skip structural thinking:

- **A sensor driver change breaks the communication layer** because everything is coupled through shared globals.
- **Adding a new sensor type requires modifying five files** because the data flow is hardwired instead of abstracted.
- **Testing means flashing hardware every time** because nothing can run in isolation.

These are not theoretical concerns. They are the reason embedded products miss deadlines, ship with bugs, and accumulate technical debt faster than web applications.

## Singleton: managing shared hardware resources

The [embedded_design_showcase](https://github.com/Tarek-Ragab-Abdelal/embedded_design_showcase) project demonstrates this directly. The `SensorManager` class is implemented as a Singleton, ensuring only one instance manages the DHT22 sensor throughout the program lifecycle.

Why does this matter on an ESP32? Because hardware peripherals are physical resources. If two parts of your code independently initialize the same I2C bus or the same sensor pin, you get undefined behavior. A Singleton guarantees a single point of control for hardware access, which eliminates an entire class of initialization bugs.

The pattern also provides a clean global access point. Instead of passing sensor handles through every function call, any module can request the SensorManager instance. In resource-constrained environments where you want to minimize parameter passing overhead, this is a practical trade-off.

## Observer: decoupling data producers from consumers

The same project uses the Observer pattern for handling sensor data updates. The `ISensorObserver` interface defines a contract that any data consumer must implement. In the demo, two concrete observers exist:

- **`Logger`**: writes sensor readings to the serial console.
- **`WebSocketsClient`**: broadcasts readings to connected clients over WebSocket.

The SensorManager does not know or care what happens with the data. It reads the sensor, then notifies all registered observers. Adding a new consumer, say an MQTT publisher or an SD card logger, requires zero changes to the SensorManager. You implement the observer interface, register the new observer, and you are done.

This is powerful in IoT products where the same sensor data often needs to flow to multiple destinations: a local display, a cloud endpoint, a logging system, and maybe a threshold-based alert. Without the Observer pattern, you end up with a growing list of `if` statements or function calls inside your sensor read loop, each one adding coupling and fragility.

## Why these patterns and not others

I specifically chose Singleton and Observer for the showcase because they solve the two most common structural problems in embedded code:

1. **Resource management** (Singleton): who owns the hardware, and how do you prevent conflicts?
2. **Data distribution** (Observer): how do you send sensor data to multiple consumers without coupling them together?

Other patterns like State, Strategy, and Command also have embedded applications, but Singleton and Observer give you the highest return on investment for typical IoT firmware. They address problems that every non-trivial embedded project hits, usually within the first few weeks of development.

## The WebSocket integration

The project uses an ESP32 running a WebSocket server that streams real-time temperature and humidity data from a DHT22 sensor. Clients connect to the WebSocket endpoint and receive JSON-formatted sensor readings as they happen.

This setup demonstrates a complete data pipeline:
1. Hardware sensor read (DHT22 via GPIO).
2. Data processing and validation (SensorManager).
3. Real-time distribution (Observer pattern to Logger + WebSocket).
4. Remote visualization (any WebSocket client).

The architecture scales. If you need to add a second sensor, you create a new manager. If you need a new output channel, you create a new observer. The core data flow remains untouched.

## Practical takeaway

Design patterns in embedded are not about following Gang of Four religiously. They are about identifying the structural problems that will hurt you in three months and applying just enough abstraction to prevent them.

Start by asking two questions about your firmware:
- **Who owns each hardware resource?** If the answer is "everyone" or "it depends," you need resource management patterns.
- **How does data flow from sensors to outputs?** If the answer involves a function that directly calls six other functions, you need decoupling patterns.

The full implementation is on [GitHub](https://github.com/Tarek-Ragab-Abdelal/embedded_design_showcase). It is intentionally small so the patterns are visible, not buried under product complexity.
