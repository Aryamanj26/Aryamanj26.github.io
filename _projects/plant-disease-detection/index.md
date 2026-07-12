---
layout: post
title: Plant Disease Detection
permalink: /projects/plant-disease-detection/
category: Applied Computer Vision
card_order: 50
year: 2025
github: https://github.com/aryamanjadhav26/PlantDiseaseDetection.git
report: https://github.com/aryamanjadhav26/PlantDiseaseDetection/blob/main/Project-Report.pdf
description: Built a five-convolutional-layer PyTorch CNN with HSV leaf masking and training-time augmentation for 87,867 images across 38 crop-and-disease labels.
card_summary: Plant-disease classifier combining leaf masking, augmentation, adaptive tuning, and a five-layer CNN across 38 labels.
visual_alt: Diagram of a plant disease detection pipeline from leaf image through preprocessing and a five-layer CNN to a class label.
glance:
  - label: Dataset
    value: 87,867 images
  - label: Classes
    value: 38 crop-and-disease labels
  - label: Reported result
    value: 95.20%*
skills:
  - Python
  - PyTorch
  - Computer Vision
  - Image Processing
  - CNNs
  - Classification
main-image: /project-visual.svg
---

## What It Does

The project classifies plant leaf images across 38 crop-and-disease labels. The verified path uses per-class preprocessing, an HSV-based green-leaf mask, and a custom five-convolutional-layer CNN. The repository also preserves a separate set of experimental handcrafted feature processors.

## Model Pipeline

- Images are resized to 128×128, shuffled within each class, and configured for 70% training, 20% validation, and 10% testing splits.
- Leaf masking converts images to HSV and keeps pixels in a green-leaf range before the tensors are written to the processed dataset.
- Training applies random horizontal flips and rotations up to 10°; validation and test transforms do not apply random augmentation.
- The five-layer CNN uses batch normalization, max pooling, two dropout-regularized fully connected layers, and adaptive learning-rate tuning during 15 training epochs.
- The repository defines K-means, contour, DWT, PCA, and GLCM processors, but the committed `processImages()` function only resizes and writes images; it never calls the constructed processor chain. I therefore treat these as experimental components, separate from the verified CNN path.
- Classification reports, confusion matrices, training curves, and hyperparameter logs are produced for evaluation.

## Engineering Focus

- Moved beyond a shallow 3-layer CNN after it overfit and missed subtle patterns.
- Used masking, training-only augmentation, batch normalization, and dropout to address overfitting.
- Added adaptive tuning based on validation-accuracy trends to adjust the optimizer during training.

## Evaluation Note

The committed `Results/MainTrainingResults/results.txt.txt` reports 95.20% accuracy on 23,858 evaluation images. The source configuration specifies a 10% test split, but `runPreprocessing()` calls the same splitter three times for the train, validation, and test flags without clearing the output directories. Each call reshuffles the classes, so the test folder accumulates the union of three nominal 10% selections. That predicts `87,867 × (1 − 0.9³) ≈ 23,858`, matching the report.

This means the 95.20% figure is a historical repository result on accumulated preprocessed output, not a clean single 10% holdout benchmark. It was not produced by test-time flips or rotations; those are defined only for the training transform.
