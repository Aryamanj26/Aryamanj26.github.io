---
layout: post
title: Plant Disease Detection
github: https://github.com/Aryamanj26/PlantDiseaseDetection.git
description: I built a deep learning pipeline for plant disease classification using the New Plant Diseases Dataset (87,000 images, 38 classes). The goal was to design a model robust to real world conditions such as noisy inputs, low quality photos, cluttered backgrounds, and uneven data availability. The final system combined preprocessing, manual feature extraction, and a 5 layer CNN with batch normalization and dropout, achieving 95% test accuracy while maintaining strong generalization.
skills:
  - Image processing
  - Deep learning
  - Computer vision
  - Classification
  - Python
main-image: /ChatGPT Image Sep 27, 2025, 09_55_32 PM.png
---

# Plant Disease Detection
Developed a deep learning-based system for detecting plant diseases from leaf images. Utilized image processing and deep learning techniques to achieve high accuracy in classification and diagnosis.

## Features
- Leaf image classification
- Disease detection
- High accuracy
- End-to-end pipeline

## Skills
- Image processing
- Deep learning
- Computer vision
- Classification
- Python
- PyTorch

{% include image-gallery.html images="20250927_2137_Plant Disease Detection Diagram_simple_compose_01k66zdkgrfck9a46052ppns1x.png" height="400"%}



## What I Built

- Preprocessing pipeline with image augmentation and a novel leaf masking step to remove background clutter
- Manual feature extraction using histogram equalization, K means clustering, contour tracing, DWT, PCA, and GLCM for contrast, shape, and texture features
- Final CNN architecture with 5 convolutional layers, batch normalization, dropout, and max pooling to improve feature learning and generalization
- Adaptive hyperparameter tuning to adjust learning rate and dropout dynamically based on validation trends
- Validation and testing with confusion matrices, ROC curves, and per class precision and recall tracking

## My Experience

At first, a simple 3 layer CNN was not enough as it overfit quickly and missed subtle disease patterns. Iterating on the architecture, expanding it to 5 layers, and refining preprocessing taught me that robust models require both strong data pipelines and careful network design. Masking turned out to be critical as removing noisy backgrounds made classification much more reliable. Adaptive hyperparameter tuning showed limited short term impact but worked better in longer training, pointing to how automation can reduce trial and error in industry workflows. I also encountered imbalanced data availability across disease classes, which made generalization harder and highlighted the need for careful augmentation strategies.

## Takeaways

- Background clutter reduced accuracy; masking solved this by isolating leaves for reliable feature extraction
- Limited and imbalanced data availability is a real bottleneck; augmentation and masking mitigated its impact
- Shallow CNNs underfit complex datasets; deeper 5 layer CNNs with normalization and dropout improved generalization
- Manual hyperparameter sweeps are inefficient; adaptive tuning automated optimization and reduced training overhead
- Real performance gains came from combining data preprocessing with model design, not from model depth alone


## Project Report
[Read the full project report (PDF)](https://github.com/Aryamanj26/PlantDiseaseDetection/blob/main/Project-Report.pdf)

## GitHub Repository
[View on GitHub](https://github.com/Aryamanj26/PlantDiseaseDetection.git)
