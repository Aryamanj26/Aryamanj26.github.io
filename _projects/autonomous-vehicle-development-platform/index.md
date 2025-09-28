---
layout: post
title: Autonomous Vehicle Development Platform
description: |
  Built and deployed an autonomy stack on an NVIDIA Jetson Nano, integrating perception, localization, and control within a Dockerized ROS2 environment. Combined classical computer vision, real-time edge AI, and sensor fusion to achieve high-speed, centimeter-level localization and control on an RC-scale vehicle.
skills:
  - ROS2
  - Docker
  - Computer Vision
  - Sensor Fusion
  - Embedded Linux
  - Real-time Control
  - Edge AI
  - PID Control
  - EKF (Extended Kalman Filter)
  - OpenCV
  - NVIDIA Jetson
main-image: /image.png
---

## Overview

I built and deployed an autonomy stack on an NVIDIA Jetson Nano, integrating perception, localization, and control within a Dockerized ROS2 environment on Linux. The platform combined classical computer vision, real-time edge AI, and sensor fusion to achieve high-speed, centimeter-level localization and control on an RC-scale vehicle.

## What I Built

**Development Environment:**
- Set up a full Linux development workflow, resolving Jetson dependency conflicts by building OpenCV from source.
- Created a Dockerized simulation of the Jetson environment on WSL, enabling isolated software testing before hardware deployment.
- This workflow reduced debugging scope on hardware and ensured reproducibility.

**Perception:**
- Deployed a ROS2-based lane-following model using OpenCV to detect the road center line and apply error-box correction.
- Integrated YOLO inference on the Myriad X VPU in the OAK-D Lite camera for real-time edge AI inference.

**Localization:**
- Achieved 3 cm localization accuracy by fusing Point One Nav RTK-GPS and IMU data with an Extended Kalman Filter (EKF).
- Implemented EKF-based sensor upsampling from 10 Hz to 40 Hz, enabling stable high-speed path tracking at 12 mph.

**Control:**
- Designed a PID controller for path following, correcting trajectory relative to lane center and fused localization.
- Optimized trajectory efficiency by 30% through control parameter tuning.

---

## My Experience

The biggest challenge was building a stable Linux-based development environment for the Jetson. Installing ROS2 and OpenCV often broke dependencies, so I built OpenCV from scratch to ensure GPU-accelerated CV worked consistently. To reduce wasted time debugging on hardware, I built a WSL-based Docker image that mirrored the Jetson runtime, letting me test perception and fusion nodes locally before deploying. This workflow proved invaluable, especially when tuning PID parameters and validating sensor fusion logic.

---

## Takeaways

- **Environment reproducibility matters:** Dockerized Linux workflows isolated testing and cut hardware debugging time dramatically.
- **Building from source (e.g., OpenCV):** Sometimes the only way to guarantee stability on embedded systems like Jetson.
- **Sensor fusion and upsampling:** The real enablers of high-speed autonomy, not just the models.
- **ROS2 modularity + containerization:** Made the system extensible and robust.
