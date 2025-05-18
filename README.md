# Task Manager

A simple task management app built with React Native.

## Setup Instructions

1. Prerequisites
   - Node.js
   - npm or yarn

2. Development Options

   **Using Expo Go (Recommended for trying the app)**
   - Android: Install Expo Go from Google Play Store
   - iOS: Just need the default Camera app
   
   **Using Simulators**
   - iOS: Xcode with iOS Simulator
   - Android: Android Studio with AVD

3. Installation
   ```bash
   # Clone the repository
   git clone https://github.com/pleroux64/Task-Manager.git
   cd Task-Manager

   # Install dependencies
   npm install
   ```

4. Running the App
   ```bash
   # Start the development server
   npx expo start
   ```

   Then:
   - Mobile device: Scan QR code with Expo Go (Android) or Camera (iOS)
   - Simulators: Press 'i' for iOS or 'a' for Android
   - Web: Press 'w'

## How to Use

1. Adding Tasks
   - Type your task in the input field
   - Press the + button or hit return to add

2. Managing Tasks
   - Tap the checkbox to complete a task
   - Tap the delete button to remove a task
   - Tasks automatically move to "Completed" when checked

## Features

- Add, complete, and delete tasks
- Automatic task organization
- Task count indicators
- Clean, simple interface

## Libraries Used

- React Native
- Expo
- @expo/vector-icons
