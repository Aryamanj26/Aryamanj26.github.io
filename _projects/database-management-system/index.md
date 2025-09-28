---
layout: post
title: Database Management System
github: https://github.com/Aryamanj26/DatabaseManagementSystem.git
description:  Designed and implemented a lightweight DBMS architecture in C++ with a clean, layered architecture to practice large-scale system design. The system separates command processing, parsing, storage, and presentation so each layer can evolve independently. It ships with a tokenizer and command router, a database layer stub, a block-oriented storage module, and a simple tabular view. The codebase is organized for growth rather than demo-only hacks.

skills:
  - Systems Architecture
  - Database Internals
  - Block Storage Design
  - Parsing and Lexical Analysis
  - API and Interface Design
  - Extensibility Patterns (Chain of Responsibility)
  - Error Handling Frameworks
  - Modular C++ Programming
  - Metadata and Schema Management
  - Integration and Regression Testing
  - Scalability and Maintainability Principles
main-image: /image.png
---

## What I Built

**Command Pipeline:**
  - Input → Tokenizer → CommandProcessor chain → Execution → View output

**Controller Layer:**
  - AppController orchestrates command routing, error mapping, and result handling

**Parsing & Tokens:**
  - Keyword set, scanner, and tokenizer with cursor control and lookahead

**Storage Layer:**
  - Block-based I/O abstraction (BlockIO, Storage) for streaming reads/writes and future free-list management

**Database Stub:**
  - Database API with lifecycle hooks and a path to table DDL and metadata management

**Views:**
  - View and TabularView to format results without leaking engine internals

**Test Harness:**
  - Script runner and automatic tests to exercise the command surface and print structured output

---

## Architecture and Design Highlights

- **Layered boundaries by contract**
- **Controller** knows how to route, not how to parse or store
- **Tokenizer** owns lexical concerns; execution never manipulates raw text
- **Storage** exposes block-level primitives and hides filesystem details
- **Chain of Responsibility** for extensibility
- **CommandProcessor** is a chainable handler; adding a new command type does not touch existing handlers
- **Separation of concerns** at the edges
- **ViewInterface** keeps formatting concerns out of business logic
- **Errors and StatusResult** centralize error propagation and mapping to user-facing messages
- **Scalable I/O primitives**
- **Storage APIs** are intentionally small so you can later plug in buffer pools, free-space maps, WAL, or page caches without controller changes
- **Deterministic testing**
- **Scripted tests** drive the same controller path as interactive use, which is how real DBs validate CLI behavior

---

## My Experience

I treated this like a systems design exercise more than a feature sprint. Early prototypes blurred parsing and execution, which made it hard to add commands. Refactoring to the pipeline with explicit interfaces made extension straightforward: new command family → new handler in the chain, new output shape → new View.

The same thinking applied to storage: committing to block-level contracts up front forced me to design for future buffering, free-list, and recovery work rather than ad-hoc file writes.

---

## Takeaways

- **Design for growth:** Small, stable interfaces at layer boundaries enable independent evolution of parser, executor, and storage
- **Route then execute:** A chain-of-responsibility command router keeps the controller closed for modification but open for extension
- **I/O contracts first:** Defining block/page semantics early is what makes buffer pools, free-space management, and logging pluggable later
- **Presentation is a layer:** Views decouple output from execution so you can add JSON, tabular, or API responses without engine changes
- **Testing at the seam:** Script-level tests that hit the controller are the fastest way to guard behavior as the system grows

## GitHub Repository
[View on GitHub](https://github.com/Aryamanj26/DatabaseManagementSystem.git)
