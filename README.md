# Personal Journal App

## Overview

The Personal Journal App is a web application designed to allow users to store their thoughts, ideas, feelings, and more. Users can create, view, and delete journal entries. The app uses Firebase for authentication and data storage.

## Features

- **User Authentication:** Users can sign up, sign in, and sign out using email and password.
- **Journal Entries:** Users can create, view, and delete their journal entries.
- **Real-time Updates:** Entries are updated in real-time.
- **User-Friendly Interface:** Simple and intuitive UI using Material-UI components.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Next.js:** React framework for server-side rendering and static site generation.
- **Firebase:** Platform for authentication and cloud-based data storage.
- **Material-UI:** React components library for user interface design.

## Setup and Installation

### Prerequisites

1. **Node.js:** Ensure Node.js is installed. You can download it from [nodejs.org](https://nodejs.org/).
2. **Firebase Account:** Create a Firebase account at [Firebase Console](https://console.firebase.google.com/).

### Clone the Repository

1. Clone the repository using the following command:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

### Install Dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

### Firebase Configuration

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
2. **Add Firebase to your web app** from the Firebase Console. This will provide you with your Firebase configuration credentials.
3. **Create a file named `.env.local`** in the root directory of your project.
4. **Add your Firebase configuration** to this file. The contents should look something like this:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

5. **Replace the placeholder values** with your actual Firebase configuration values.

### Run the Application

Start the development server by running:

```bash
npm run dev
```

Navigate to http://localhost:3000 in your browser to see the application in action.

### File Structure

- **`src/app/page.js`**: Redirects users to the welcome page.
- **`src/app/welcome/page.js`**: Displays the introduction and redirects to the sign-in page.
- **`src/app/auth/page.js`**: Handles user authentication (sign in and sign up).
- **`src/app/journal/page.js`**: Displays and manages journal entries for authenticated users.

### Thank you for visiting!