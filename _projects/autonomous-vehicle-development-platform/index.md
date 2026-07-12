---
layout: post
title: GPS-Guided RC Racing Integration
permalink: /projects/autonomous-vehicle-development-platform/
category: Embedded Autonomy
card_order: 30
year: 2025
description: Integrated RTK-GNSS localization and TUM raceline-planning ROS nodes into a Donkey Car stack running on a Jetson Nano.
card_summary: ROS2 integration project connecting RTK-GNSS state estimation and TUM raceline planning to an existing Donkey Car control stack.
visual_alt: Diagram of an RC racing stack from Point One RTK-GNSS and IMU through EKF prediction and TUM raceline planning into the Donkey Car framework.
glance:
  - label: Platform
    value: Jetson + ROS2
  - label: Contribution
    value: System integration
  - label: Planning
    value: TUM raceline
skills:
  - ROS2
  - Docker
  - Embedded Linux
  - NVIDIA Jetson
  - RTK-GNSS
  - EKF Integration
  - Donkey Car
main-image: /project-visual.svg
---

## What It Does

This team project connected GPS-guided racing components to an existing RC autonomy framework. My work focused on integrating ROS localization and planning nodes with Donkey Car rather than developing the underlying controller or TUM planning algorithm.

## System Flow

- Point One RTK-GNSS and IMU measurements enter ROS2 nodes running on the Jetson Nano.
- EKF prediction increases the localization-state update rate from 10 Hz measurements to a 40 Hz estimate for downstream planning.
- TUM raceline-optimization and path-planning nodes generate the racing trajectory.
- The planned trajectory is passed into the existing Donkey Car framework, which supplies the low-level control and vehicle actuation.

## Engineering Focus

- Built a Dockerized WSL environment that matched the Jetson software dependencies, reducing hardware-only debugging.
- Integrated independently developed ROS nodes across localization, planning, and the Donkey Car runtime.
- Kept the interfaces modular so state-estimation and planning components could be tested separately from the vehicle controller.
