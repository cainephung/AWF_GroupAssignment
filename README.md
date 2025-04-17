# 📸 AWF Group Assignment - PhotoHub

This is a full-stack web application developed for the AWF group assignment. The app allows users to upload, manage, and organize their images into albums and view them in a grid format.

## 🌐 Live Demo

> 🔗 _Demo link coming soon_

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (via Neon serverless)
- **Other Tools**: Firebase, Multer, REST API, Docker (for deployment)

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/cainephung/AWF_GroupAssignment.git
cd AWF_GroupAssignment
```

### 2. Install dependencies

### Frontend
```bash
cd client
npm install
```

### Backend 
```bash
cd ../server
npm install
```

### Start the Frontend
```bash
cd client
npm run dev
```

## Project Structure 
``` bash
AWF_GroupAssignment/
├── client/         # React frontend
├── server/         # Express backend
├── uploads/        # Temporarily stores uploaded images
├── scripts/        # Database interaction scripts
├── .env            # Environment variables
└── README.md       # This file
```

## Features
 - Upload image files using drag-and-drop or file selection
 - Organize images into albums
 - View images in grid format
 - Filter/search photos by tags (WIP)
 - RESTful API for backend communication

## Environment Variables
Create a .env file in the server/ directory:
``` bash
DB_CONNECTION_STRING=
```

## Known Issues / To Do
- Album filtering is not yet fully implemented
- Tag system is in progress
- Firebase integration for auth not yet implemented

##  Contributors

- Brian Nguyen
- Caine Phung
- Evan Pogue
- Caleb Cullen
