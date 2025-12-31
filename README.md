### HaiIntel Chat Companion — UI Developer Challenge

A floating AI chat companion built as part of the HaiIntel UI Developer Assessment, demonstrating modern UI engineering, AI-native interaction patterns, and brand-aligned design.

This project focuses on human-centered AI interfaces, combining clean visual design, thoughtful UX decisions, and simulated AI behaviors to mirror real-world conversational experiences.

### Overview

The HaiIntel Chat Companion is a floating, glassmorphic chat widget designed to integrate naturally with HaiIntel’s dark, minimal website aesthetic.

It demonstrates how AI-driven conversational interfaces can feel:

Calm and purposeful

Responsive and performant

Accessible and user-friendly

The chat simulates AI responses using static data while showcasing streaming responses, session persistence, feedback mechanisms, and contextual UI states.

### Key Features
Conversational UI

Floating AI launcher with subtle pulse effect

Expandable chat window with smooth motion transitions

User and AI message separation with clear visual hierarchy

Streaming / type-as-you-go AI responses

Typing indicator positioned near the composer for clarity

UX & Interaction

Glassmorphic UI inspired by HaiIntel’s brand theme (dark, minimal)

Neutral, classic user message styling for readability

AI message bubbles with feedback actions (like / dislike)

Follow-up suggestion prompts to guide conversation

First-time empty state with welcome message and starter questions

State & Persistence

Chat messages persisted using localStorage

Feedback state (like / dislike) persisted across refresh

Graceful handling of first-time users and incognito sessions

Performance & Polish

Auto-scroll behavior tuned to avoid jumpiness

Custom subtle scrollbar styling for dark UI

Responsive layout for smaller screens

Disabled input & send action while AI is responding

ESLint configured using modern ESLint v9 flat config

### AI Simulation Details

AI responses are simulated using predefined static content inspired by HaiIntel’s positioning and services

Responses are streamed character-by-character to mimic real AI generation

Follow-up suggestions encourage exploration without overwhelming the user

No real AI APIs are used as part of this challenge.

### AI Collaboration (Tools Used)

AI tools were used as development collaborators, not content generators:

Cursor / ChatGPT

Iterating on UI logic and edge cases

Refining UX decisions (typing indicators, empty states)

Reviewing component structure and state management

All AI-assisted suggestions were manually reviewed, refined, and implemented to ensure correctness and intentional design.

### Design Decisions & Brand Alignment

Brand theme: Dark, minimal, calm — inspired by haiintel.com

Color usage:

Brand accent (indigo) reserved for the AI launcher

Neutral tones used inside the chat to reduce visual noise

Motion: Subtle and purposeful (no distracting animations)

Accessibility: High-contrast text, readable spacing, predictable interactions

### Tech Stack

Framework: React + TypeScript

Build Tool: Vite

Styling: Tailwind CSS

Animation: Framer Motion

State Persistence: Local Storage

Linting: ESLint v9 (flat config, React Hooks + TypeScript rules)

Deployment: Vercel

### Getting Started
# Install dependencies
npm install

# Run locally
npm run dev

# Lint the project
npm run lint

### Deployment

The project is deployed on Vercel and can be embedded as a floating widget or integrated into a larger application.

### What This Demonstrates

This project showcases:

Strong frontend fundamentals

Attention to UX details and edge cases

Ability to translate brand intent into UI

Comfort building AI-style interfaces without backend dependency

Clean, maintainable React + TypeScript code
