# Quiz Application

A web application for quizzes where users can create quizzes, take quizzes created by others, and get feedback on their performance.

## Table of Contents

- [Quiz Application](#quiz-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
  - [Usage](#usage)

## Overview

The Quiz Application is designed to provide a platform where users can engage in creating, taking, and reviewing quizzes. It allows users to register, create their own quizzes, browse and attempt quizzes created by others, and receive feedback on their quiz attempts.

## Features

- User authentication and authorization
- Create and delete quizzes
- Take quizzes and submit answers
- View quiz results and feedback
- User profile management
- Responsive design for desktop and mobile

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Query
- **Authentication**: JSON Web Tokens (JWT)
- **Routing**: React Router
- **Deployment**: Render

## Getting Started

To run the Quiz Application locally, follow these steps:

1. **Clone the repository:**

   ```bash
   cd ONLINE-QUIZ-MAKER
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and define the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=YOUR_MONOGODB_URI
   JWT_SECRET=YOUR_SECRET_TOKEN
   NODE_ENV=development
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **To run client side react application:**

   ```bash
   cd ONLINE-QUIZ-MAKER
   ```
6. **Install client side dependencies**
    ```bash
   npm install
   ```
7. **Start the client application:**

   ```bash
   npm run dev
   ```
8. **Open your browser:**

    Visit http://localhost:5000 to view the application.

## Usage

- **Register/Login**: Create an account or login with existing credentials.
- **Create Quiz**: Navigate to the dashboard to create a new quiz.
- **`Note`**: You can not take a quiz if you not have created it.
- **Take Quiz**: Browse available quizzes, select one, and submit your answers.
- **View Results**: See your quiz performance and feedback.
