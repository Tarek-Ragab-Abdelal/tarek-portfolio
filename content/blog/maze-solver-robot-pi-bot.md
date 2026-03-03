---
title: "Maze-Solver Robot: pi-bot"
excerpt: "A throwback to a 2021 internship robotics project, focused on firmware logic and algorithmic navigation behavior."
date: "2023-05-19"
tags: ["Robotics", "Arduino", "Firmware", "Internship"]
coverImage: "/images/blog/maze-solver-pibot.jpg"
sourceUrl: "https://www.linkedin.com/posts/tarek-ragab_maze-solver-robot-pi-bot-activity-7065342828087754752-Lv1T"
---

![Maze-solver robot pi-bot](/images/blog/maze-solver-pibot.jpg)

Back in 2021, during my internship at Sector B5, I worked on a project that still influences how I think about embedded systems today: an autonomous maze-solving robot we called **pi-bot**. My teammate handled the mechanical design in SolidWorks while I owned the firmware and navigation logic. It was one of those projects where the gap between "works in theory" and "works on a table" taught me more than any textbook.

## The hardware stack

We built pi-bot around an **Arduino Uno** with a motor driver shield controlling two geared DC motors. For perception, we used **three ultrasonic sensors** mounted at the front, left, and right of the chassis. Power came from three lithium-ion batteries supplying around 11.2V at 2000mAh, which gave us a decent runtime for testing runs without worrying about mid-maze battery drops.

One detail that seems small but mattered a lot: we had to calibrate the PWM values based on actual battery voltage. As the batteries drained, the motor speed changed, which affected turn accuracy. We measured voltage with a multimeter before each session and adjusted PWM accordingly. I had planned to add a voltage sensor for automatic compensation, but the competition timeline didn't allow for it.

## The wall-follower algorithm

For navigation, we implemented the **wall-follower algorithm**, one of the classic approaches for simply-connected mazes (mazes without loops). The idea is straightforward: pick a wall (we went with the left wall) and keep following it. At every junction, the robot prioritizes turning toward the followed wall. When it hits a dead end, it turns around and backtracks to the last junction.

The tricky part was not the algorithm itself, it was making it work reliably on real hardware. Ultrasonic sensors are noisy. They occasionally return garbage readings when the sound wave bounces at an angle or when the surface is too close. I had to add filtering logic and distance thresholds to avoid false junction detections.

The actual decision flow looked like this:
- **Check left**: if open, turn left and move forward.
- **Check front**: if open, move forward.
- **Check right**: if open, turn right and move forward.
- **Dead end**: execute a 180-degree turn.

Each turn had to be precise. A 5-degree error compounded over multiple turns would send the robot into a wall two junctions later. I spent a lot of time tuning motor timing for consistent 90-degree and 180-degree rotations.

## What actually made it hard

The biggest challenge was not the algorithm. It was the interaction between software decisions and physical behavior. When the robot decided to turn left, the firmware sent a specific PWM signal for a specific duration. But "specific duration" depended on floor friction, battery voltage, wheel alignment, and whether one motor was slightly weaker than the other.

I ended up building a calibration routine that ran before each maze attempt. The robot would execute a known sequence of moves, and I would fine-tune delay values until the movements matched expectations. It was tedious, but it was the only way to get repeatable results.

The other major issue was timing between sensor reads and motor commands. If the robot read sensors while turning, the readings were meaningless. I had to structure the control loop so that sensing only happened during straight-line movement, and turns were executed as blocking operations with sensor reads disabled.

## The result

Pi-bot won **first place** in the program's competition. But honestly, the ranking mattered less than what I learned. This project gave me my first real exposure to the core tension in embedded development: the code can be logically perfect and still fail because the physical world doesn't behave like your simulator.

## Why it still matters to me

Three years later, I still apply the same instincts I built during this project. When I work on IoT firmware at scale, I think about sensor noise filtering, I think about calibration routines, and I think about the gap between "works on my desk" and "works in production." Pi-bot was a small robot solving a simple maze, but the engineering discipline it demanded was anything but simple.

The source code is available on [GitHub](https://github.com/Tarek-Ragab-Abdelal/pi-bot) if you want to dig into the implementation details.
