---
title: "Rebuilding the GF3 Licenser Desktop App with Flutter"
excerpt: "A recap of rebuilding a desktop licensing application with Flutter and improving delivery through strong collaboration and UI support."
date: "2024-03-18"
tags: ["Flutter", "Dart", "Desktop", "Product Delivery"]
coverImage: "/images/blog/gf3-licenser-desktop.jpg"
sourceUrl: "https://www.linkedin.com/posts/tarek-ragab_flutter-dart-dartprogramming-activity-7175573438466539520-oNOR"
---

![GF3 Licenser desktop app screenshot](/images/blog/gf3-licenser-desktop.jpg)

This was my second project with Boreal Laser Inc. after delivering the IoT dashboard earlier. They came back with a different problem: their existing licensing workflow for the GF3 product line was manual, error-prone, and slow. Operators had to issue licenses by hand, which introduced delays and mistakes. The goal was to build a cross-platform desktop application that automated the entire process.

## Why Flutter for desktop

The client needed the app to run on both Windows and macOS. The team was already using Dart for some internal tooling, so Flutter Desktop was a natural fit. At the time, Flutter's desktop support was still maturing, but the core rendering engine was stable enough for a production tool, and the single-codebase advantage saved significant development time.

I also wanted to use [Rive](https://rive.app/) for certain UI animations. Licensing tools tend to feel utilitarian and cold. Adding subtle motion to state transitions (license generated, validation passed, error states) made the experience feel more polished without adding complexity to the codebase. Rive integrates cleanly with Flutter, so the animation layer did not require a separate rendering pipeline.

## The licensing flow

The core workflow is:

1. **Operator inputs device or customer details** into a form with validation.
2. **The app calls a licensing API** to generate or validate a license key.
3. **Hardware-based encryption** ties the license to a specific device, preventing unauthorized transfers.
4. **The app stores and manages active licenses** with local caching for offline scenarios.

The validation step was the most sensitive part. License keys had to be cryptographically tied to hardware identifiers, and the validation logic had to work offline after the initial activation. I implemented a local cache layer that stored validated licenses securely so operators could work without constant network access.

## What made this project move fast

Honestly, the technical implementation was not the hardest part. The collaboration model was. And in this case, it worked exceptionally well.

The client provided **clear, decisive feedback** at every stage. When I showed a prototype, they responded within a day with specific notes, not vague "make it better" feedback, but concrete direction like "this field should validate on blur, not on submit" or "the success state needs to be more obvious."

We also had strong **UI/UX support** from their side. Instead of me guessing what the interface should look like, I received design direction that I could implement directly. That eliminated the usual back-and-forth cycle where a developer builds something, the client rejects the look, and the developer rebuilds it.

The result was a build cycle that felt unusually efficient. Features shipped on schedule, revisions were minimal, and the final product matched expectations on the first major review.

## The outcome

The rebuild **reduced manual license issuance time by 50%**. Operators went from a multi-step manual process to a three-click workflow: enter details, generate, done. Error rates dropped because the application validates inputs before anything gets submitted, and the hardware-bound encryption eliminated license sharing issues.

## What I took away

The biggest lesson from this project was not about Flutter or Dart. It was about how much faster engineering moves when the communication layer is clean. Technical quality and communication quality multiply each other. A mediocre developer with a great client relationship often ships better outcomes than a great developer fighting unclear requirements.

When I evaluate freelance projects now, I pay as much attention to how the client communicates as I do to the technical requirements. This project proved that the collaboration model is not secondary to the engineering. It is part of the engineering.
