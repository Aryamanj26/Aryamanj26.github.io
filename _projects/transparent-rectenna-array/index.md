---
layout: post
title: Transparent Rectenna Array for Space Applications
permalink: /projects/transparent-rectenna-array/
category: RF Energy Harvesting
card_order: 20
year: 2026
description: Built a scalable ADS co-simulation for a team-designed transparent fused-quartz rectenna array by translating the HFSS multiport model into circuit-level elements.
card_summary: HFSS-to-ADS modeling work that turns a six-element antenna-array S-parameter model into a scalable rectifier simulation.
visual_alt: Diagram of a transparent fused-quartz rectenna array harvesting 2.45 GHz RF energy and converting it through a rectifier into DC output.
glance:
  - label: Frequency
    value: 2.45 GHz
  - label: Array
    value: 6 elements
  - label: Output
    value: 4.51 V simulated
skills:
  - HFSS
  - ADS
  - RF Energy Harvesting
  - Antenna Design
  - S-Parameters
  - Rectifier Design
  - Fused Quartz
main-image: /project-visual.svg
paper: /_projects/transparent-rectenna-array/paper.pdf
---

## What It Does

This team project explores transparent rectennas for spacecraft surfaces, viewports, and sensor covers. The sparse copper geometry preserves optical transparency while the simulated system receives incident 2.45 GHz RF and converts it to DC power.

## My Contribution

- Exported the HFSS antenna array as a multiport SNP model for use in Keysight ADS.
- Reverse-engineered the HFSS port and array layout into individual circuit-level elements so the nonlinear rectifier simulation could scale from one element to six.
- Built the ADS workflow used to evaluate DC output and RF-to-DC efficiency while keeping the electromagnetic and circuit assumptions explicit.

## Design Flow

- Adapted a published transparent plexiglass rectenna to fused quartz for lower outgassing, better thermal stability, and space-friendly material behavior.
- Re-tuned the strip-loop antenna and coplanar stripline feed in HFSS after changing the substrate dielectric properties.
- Imported the antenna S-parameter models into ADS and connected SMS7630 rectifier branches using the scalable circuit representation.
- Modeled incident RF illumination as a Thevenin source and swept power density to estimate DC output and RF-to-DC efficiency.
- Expanded the design from a single element to a six-element array with 40 mm spacing and simulated coupling below about -31 dB at 2.45 GHz.

## Results

- The single fused-quartz element achieved a simulated S11 of -17.43 dB at 2.45 GHz.
- At 42 uW/cm^2 incident power density, the single-element model produced 0.750 V with 27.6% simulated efficiency.
- The six-element model produced 4.51 V into a 5.3 kOhm load at 42 uW/cm^2, with peak simulated efficiency around 32%.
- The array result was close to the reference plexiglass array while using a substrate better suited for space environments.

## Modeling Limits

The array-level rectifier result uses a series-cascade approximation for six identical rectifier branches rather than a single nonlinear simulation of all six rectifiers connected to the full S7P network. The model also assumes broadside, uniform illumination, ideal matching and filter components, and no surrounding spacecraft structure. The results are simulation outcomes, not fabricated-hardware measurements.

## Symposium Submission

This work was submitted to the ORS symposium as a team-authored paper and poster. The linked paper documents the modeling assumptions, substrate retuning, co-simulation method, and limitations.
