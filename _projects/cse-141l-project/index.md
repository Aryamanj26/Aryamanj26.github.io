---
layout: post
title: 8-bit Processor Design Project
description: |
  Designed a custom CPU in SystemVerilog with a 9-bit ISA and 8-bit datapath that supports 16-bit arithmetic and floating-point operations. This project was my first full CPU design and taught me how to navigate constraints, iterate on architectures, and find balance in trade-offs.
skills:
  - SystemVerilog HDL
  - RTL Design
  - Computer Architecture
  - Pipelining
  - Testbench Development
  - Performance Optimization
  - ISA Design
  - Assembler Design
main-image: /image.png

---

[View on GitHub](https://github.com/Aryamanj26/CSE-141L-Project.git)

## What I Built

- 15-instruction ISA with ALU, memory, and control flow operations
- 8-register file with R6 for immediates and R7 for flags
- Programs for 16-bit arithmetic and floating-point support written in assembly
- Verification through modular testbenches and waveform analysis in SystemVerilog

## My Experience

As my first CPU design, the process was highly iterative. I frequently redesigned the ISA and datapath to balance encoding limits, hazard handling, and usability. Supporting 16-bit operations on an 8-bit datapath required careful conventions and constant refinement.

## Takeaways

- I learned that design is never one shot, it is iterative
- I discovered how much small ISA and datapath choices ripple across performance and programmability
- I gained hands-on understanding of hazards, forwarding, and control flow design in a real CPU
- I saw that reusable verification units reduce effort and catch bugs earlier, which is why verification frameworks like UVM matter
- Most importantly, I found that I enjoy navigating trade-offs in instruction encoding, datapath width, and architectural simplicity vs. capability