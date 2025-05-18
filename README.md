# Task Manager

A simple task management application built with React Native.

## Features

- Add and delete tasks
- Mark tasks as complete/incomplete
- Tasks organized in "To Do" and "Completed" sections
- Visual feedback for all user interactions
- Clean, responsive interface

## Setup Instructions

1. Prerequisites
   - Node.js
   - npm or yarn
   - Expo Go app (required for both Android and iOS)
     * Android: Install Expo Go and use it to scan QR code
     * iOS: Install Expo Go and scan QR code with Camera app

2. Installation

   Clone the repository:
   ```bash
   git clone https://github.com/pleroux64/Task-Manager.git
   ```

   Navigate to project directory:
   ```bash
   cd Task-Manager
   ```

   Install dependencies:
   ```bash
   npm install
   ```

3. Running the App

   Start the development server:
   ```bash
   npx expo start
   ```

   Then:
   - Android: Open Expo Go and scan QR code
   - iOS: Use Camera to scan QR code (opens in Expo Go)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## How to Use

1. Adding Tasks
   - Type task in the input field
   - Press + button or return to add

2. Managing Tasks
   - Tap checkbox to complete/incomplete
   - Tap trash icon to delete
   - Completed tasks automatically move to "Completed" section

## Third-Party Libraries

- **React Native** - Used for the task list interface and input field
- **React** - Handles task state management with hooks
- **Expo** - Provides our development and testing environment
- **@expo/vector-icons** - Used for task action buttons
- **TypeScript** - Ensures type safety in task structure and props

## File Structure

- `components/` – Contains `TaskItem`, the reusable task component
- `constants/` – Shared style values like colors, font sizes, spacing
- `types/` – TypeScript interfaces (e.g., `Task`)
- `app/` – Main screen (`index.tsx`) that handles task logic and layout
