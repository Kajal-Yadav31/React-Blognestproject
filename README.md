# BlogNest - Your Blogging Companion

## Overview

**BlogNest** is a dynamic full-stack blogging platform built using **Django REST Framework** (backend) and **React.js** (frontend). It empowers users to create, explore, and interact with blog content seamlessly through an intuitive UI and robust API. BlogNest features modern authentication via JWT, user profile management, real-time interaction through comments and replies, and a personalized dashboard to track engagement — offering a social blogging experience similar to Medium.

---
## Screenshot of the project:

### Home Page :
<img width="1920" height="2831" alt="Home" src="https://github.com/user-attachments/assets/3bb8780d-0a18-46a3-bd44-ca999107802f" />

### views the dashboard page
<img width="1920" height="2655" alt="DashboardPage" src="https://github.com/user-attachments/assets/3ffd6daa-57f1-4265-a0c1-ae30e3fb9aa9" />

### Registration Page:
<img width="1920" height="1122" alt="registerPAge" src="https://github.com/user-attachments/assets/d2a0b220-e835-4f4e-bbfd-2bf93a915606" />

### Login Page:
<img width="1920" height="872" alt="LoginPage" src="https://github.com/user-attachments/assets/c23ed9e4-c2d8-4e75-92e1-ca8b8ec7f7e6" />

### Profile Creation and update Page:
<img width="1920" height="1737" alt="ProfileUpdatePage" src="https://github.com/user-attachments/assets/ff395ff2-435a-4984-9831-ed9285a7bf0f" />

### Profile View Page:
<img width="1920" height="2132" alt="Profile Posts" src="https://github.com/user-attachments/assets/d063aef3-9ec3-494e-b5cc-63181cfaae43" />

### Post creation page:
<img width="1920" height="2367" alt="CreateBlogPost" src="https://github.com/user-attachments/assets/81624a3c-5221-47d5-8734-29565acbd47d" />

### Post Edit page:
<img width="1920" height="2367" alt="EditPostPage" src="https://github.com/user-attachments/assets/e1792c51-4729-4fe9-99e8-6d4a8a094bc6" />

### Post details and comment page :
<img width="1920" height="3167" alt="PostDetailPage" src="https://github.com/user-attachments/assets/e4854796-84d9-43a4-bed5-82b60de84af5" />

### All posts page :
<img width="1920" height="1612" alt="AllPostPage" src="https://github.com/user-attachments/assets/a74b2c70-466d-4ee7-a910-bacc17b919cd" />

### View all bookmarks 
<img width="1920" height="1101" alt="BookmarksPAge" src="https://github.com/user-attachments/assets/cf4b799e-c528-483e-9040-0e122b0b8940" />

### view all the comments
<img width="1920" height="2451" alt="CommentPage" src="https://github.com/user-attachments/assets/14df4518-042a-4a4c-8cea-4007a81352a4" />

### Search page : 
<img width="1920" height="2125" alt="searchpage" src="https://github.com/user-attachments/assets/cd408831-1d82-4cb0-87a7-54b2b48144f5" />


## Features

### 🔐 User Authentication
- **JWT-based authentication** with access and refresh tokens.
- Authentication built using React’s **Axios**, **Interceptors**, and **Context API (AuthProvider)**.
- Supports user **registration**, **login**, and protected routes via `react-router-dom`.

### 🏠 Home Page
- Displays **Trending Posts**, **Popular Posts**, and **Post Categories**.
- Pagination:
  - Trending section shows **4 posts at a time**.
  - Popular section shows **8 posts at a time**.
- Each post preview includes:
  - Post **image**, **title**, **tags**, and **author info**.
  - Clicking the author image redirects to that user's **profile page**.

---

## 📄 Post Details Page
- Displays full **post image**, **description**, **tags**, and **author details**.
- Includes:
  - 📝 Commenting section.
  - 💬 View and reply to comments.
  - ❤️ Like functionality.
  - 🔖 Bookmark functionality.

---

## ⚙️ Settings Menu (Nested Links in Navbar)
- **➕ Add Post**: Create new blog posts with rich formatting and image support.
- **📋 My Posts**: View all posts created by the current user.
- **💬 My Comments**: Displays all comments made by the user.
- **📌 Bookmarks**: View posts bookmarked by the current user.
- **🧑 Profile Page**:
  - Create and update personal details like bio, avatar, and location.
- **📊 Dashboard**:
  - Displays key engagement metrics:
    - Total post views.
    - Total posts created.
    - Total likes received.
    - Total bookmarks.
  - Tables displaying:
    - All posts by the user.
    - All comments by the user.
    - All bookmarks by the user.

---

## 🔍 Search Functionality
- Search for posts by:
  - **Title**
  - **Description**
  - **Tags**
  - **Username**
- Fully integrated with `react-router-dom` and DRF `SearchFilter`.

---
## 📝Postman Link for api testing: 

### Account API Endpoints
https://.postman.co/workspace/BlogAPI~19912888-618c-4e4c-8f86-03d4b914f97b/collection/29592036-dcf2e1b9-29e5-47d0-b495-29d839c48da5?action=share&creator=29592036

### Blog Dashboard API Endpoints
https://.postman.co/workspace/BlogAPI~19912888-618c-4e4c-8f86-03d4b914f97b/collection/29592036-d3e9faf6-b724-4741-80c2-bbcd51a851f6?action=share&creator=29592036

### Blog Post API Endpoints
https://.postman.co/workspace/BlogAPI~19912888-618c-4e4c-8f86-03d4b914f97b/collection/29592036-2fe4fe85-abb2-488d-97d9-f9bf447f44c3?action=share&creator=29592036

## 🛠️ Technologies Used

### Frontend:
- **React.js basic concepts and hooks**
- **Axios** (with request/response interceptors)
- **React Router DOM**
- **Bootstrap** for styling

### Backend:
- **Django**
- **Django REST Framework**
- **JWT Authentication** (`SimpleJWT`)
- **Custom Permissions & Serializers**
- Pagination:
  - Trending section shows **4 posts at a time**.
  - Popular section shows **8 posts at a time**.
---

## Getting Started

### Clone the Repository
git clone https://github.com/Kajal-Yadav31/React-Blognestproject.git
cd React-Blognestproject

### Usage
- Access the application at `http://localhost:8000/` in your web browser and http://localhost:5173/ for frontend.
- Register an account, login to you account, and start creating your posts.
- Explore the features such as post like, create, comment, reply and delete.

## License
This project is licensed under the [MIT License]


## Contact
For inquiries or issues, contact [kajalyadav070496@gmail.com].









   

