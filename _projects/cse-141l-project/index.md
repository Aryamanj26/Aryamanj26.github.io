---
layout: post
title: ANDOR-9 8-bit Processor Design
permalink: /projects/cse-141l-project/
category: Computer Architecture
card_order: 40
year: 2025
description: Designed a SystemVerilog load-store processor and assembler around a 9-bit ISA and 8-bit datapath, with multi-byte conversion routines for a custom 16-bit floating representation.
card_summary: Compact SystemVerilog processor and assembler built around a 15-operation ISA, eight registers, and multi-byte arithmetic on an 8-bit datapath.
visual_alt: Diagram of an 8-bit CPU instruction flow showing fetch, decode, execute, writeback, registers, and verification waveforms.
glance:
  - label: ISA
    value: 15 ops
  - label: Datapath
    value: 8-bit CPU
  - label: Challenge
    value: Multi-byte arithmetic
skills:
  - SystemVerilog
  - RTL Design
  - Computer Architecture
  - ISA Design
  - Numeric Conversion
  - Assembler Design
  - Testbenches
main-image: /project-visual.svg
---

## What It Does

The processor executes a compact instruction set with ALU, memory, and control-flow operations while manipulating 16-bit values across an 8-bit datapath. The software exercises include integer/float conversion experiments using a project-specific 16-bit "IEEE-like" representation; the checked-in `int2float` routine documents a 1-bit sign, 8-bit exponent, and 7-bit mantissa, so the implementation should not be presented as IEEE-754 binary16.

## Architecture

- 9-bit instruction encoding with a 15-instruction ISA.
- 8-register file, including dedicated registers for immediates and flags.
- A load-store datapath coordinating fetch, decode, ALU, memory, and writeback behavior.
- Simple bypass logic for immediate values and memory-address paths.
- Assembly programs for 16-bit arithmetic and integer/float representation experiments.

## Engineering Focus

- Iterated on the ISA to fit useful behavior into tight encoding limits.
- Mapped 16-bit numeric manipulation onto a tiny instruction set without dedicated floating-point hardware, using multi-step assembly routines and register pairs.
- Used modular SystemVerilog testbenches and waveform analysis to validate behavior.
- Built a Python assembler for instruction encoding, macro expansion, labels, and ROM generation.
- Evaluated how datapath and encoding decisions affect data movement and ISA usability.
