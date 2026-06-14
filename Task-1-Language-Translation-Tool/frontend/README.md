# 🌍 TravelTalk - AI Powered Travel Translation Assistant

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Azure AI](https://img.shields.io/badge/Azure-AI%20Translation-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-cyan)
![CodeAlpha](https://img.shields.io/badge/CodeAlpha-Internship-orange)

## 📌 Project Overview

TravelTalk is an AI-powered Travel Translation Assistant developed as part of the **CodeAlpha AI Internship**.

Instead of creating a traditional language translator, this project focuses on solving a real-world challenge faced by travelers: **language barriers**.

Whether users are traveling internationally or exploring different regions within a country, TravelTalk helps them communicate effectively by automatically detecting their language and translating conversations into the language spoken at their selected destination.

---

## 🚀 Problem Statement

Travelers often face communication difficulties when visiting places where they do not speak the local language.

Traditional translators require users to manually select languages and provide little context for travel-related interactions.

TravelTalk aims to provide:

* Automatic language detection
* Destination-based translation
* Pronunciation support
* Personalized travel experience

---

## ✨ Features

### 🌎 Destination-Based Translation

Users can select a destination from multiple countries and regions.

The application automatically sets the target language based on the selected destination.

---

### 🤖 Automatic Language Detection

Users do not need to manually choose the source language.

TravelTalk automatically detects the language being typed using Azure AI Translation Services.

---

### 💬 Translation Cabin

A conversational interface where users can:

* Type messages
* Receive real-time translations
* Interact naturally through a chat-like experience

---

### 🔊 Text-to-Speech Support

Translated text can be spoken aloud to help travelers learn pronunciation and communicate more confidently.

---

### 📋 Copy Translation

Users can instantly copy translated text for use in conversations, messages, or travel situations.

---

### 👤 Traveler Profile

Stores:

* Traveler Name
* Preferred Language
* Favorite Destination
* Translation History

using browser Local Storage.

---

### 📜 Translation History

The application keeps track of previous translations, allowing users to quickly revisit recent conversations.

---

## ⚙️ Workflow

1. User selects a destination.
2. Target language is automatically configured.
3. User enters text.
4. Azure AI detects the source language.
5. Translation request is sent to Azure Translation API.
6. Translated text is displayed.
7. Users can:

   * Listen to pronunciation
   * Copy translated text
   * Access translation history
8. User preferences are saved locally.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React Icons

### Backend

* Node.js
* Express.js

### AI Services

* Microsoft Azure Translator API
* Azure Speech Services

### Storage

* Browser Local Storage

---

## 📂 Project Structure

```bash
TravelTalk/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── src/
│   ├── components/
│   ├── services/
│   ├── data/
│   ├── assets/
│   ├── App.jsx
│
├── public/
├── images/
└── README.md
```

## 🎯 What I Learned

Through this project, I gained hands-on experience with:

* AI API Integration
* React State Management
* Asynchronous API Handling
* Frontend & Backend Communication
* Local Storage Management
* Error Handling & Debugging
* Git & GitHub Workflows
* Deployment & Hosting
* Building User-Centric Applications

---

## 🚧 Challenges Faced

During development, I encountered several challenges:

* Integrating multiple Azure AI services
* Managing API communication between frontend and backend
* Handling language detection and translation workflows
* Debugging API responses
* Managing GitHub repository issues and push protection rules
* Deploying a full-stack application for the first time

These challenges provided valuable real-world development experience.

---

## 🔮 Future Improvements

Planned enhancements include:

* Enhanced traveler profiles
* Improved translation accuracy
* Speech-to-Text support
* Offline translation capabilities
* Travel phrase recommendations
* Better mobile responsiveness
* Personalized travel assistance features

---


## 🔗 Live Demo

https://code-alpha-tasks-2.vercel.app/

---

## 💻 GitHub Repository

https://github.com/KaustubhiDutta/CodeAlpha-tasks

---

## 👩‍💻 Author

**Kaustubhi Dutta**

CodeAlpha AI Intern

Passionate about building AI-powered solutions that solve real-world problems.

---

## 📄 License

This project was developed for educational and internship purposes under the CodeAlpha AI Internship Program.
