# 🚀 AI Task Manager

A modern, responsive task management app powered by **React, Vite, Tailwind CSS, and OpenAI**.
Manage tasks efficiently with priority, due dates, AI suggestions, and a beautiful glassmorphism UI.

---

## ✨ Features

* ✅ Add, edit, and delete tasks
* 🎯 Priority system (Low / Medium / High)
* 📅 Due date support
* 🔍 Smart search with debounce
* 🎛 Filter (All / Active / Completed)
* 📊 Live stats dashboard
* ⚡ Keyboard shortcuts
* 🤖 AI task suggestions
* 🌙 Dark / Light theme toggle
* 📱 Fully responsive (mobile-first)
* 🧹 Clear completed & clear all
* ✏️ Inline task editing
* 🚀 Deployed on Vercel

---

## 🧠 Tech Stack

* **Frontend:** React + Vite
* **Styling:** Tailwind CSS
* **State Management:** React Context API
* **AI Integration:** OpenAI API
* **Deployment:** Vercel

---

## 📁 Project Structure

```
src/
 ├── components/
 │   ├── TaskInput.jsx
 │   ├── TaskList.jsx
 │   ├── TaskItem.jsx
 │   ├── SearchBar.jsx
 │   ├── FilterBar.jsx
 │   ├── StatsBar.jsx
 │   └── ThemeToggle.jsx
 │
 ├── context/
 │   └── TaskContext.jsx
 │
 ├── hooks/
 │   ├── useDebounce.js
 │   └── useKeyboardShortcuts.js
 │
 ├── utils/
 │   └── aiSuggest.js
 │
 ├── App.jsx
 └── main.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/thedhruv-07/ai-task-manager.git
cd ai-task-manager
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Add environment variables

Create a `.env` file in the root:



⚠️ **Important:**

* Never commit `.env`
* Make sure `.env` is in `.gitignore`

---

### 4️⃣ Run the development server

bash
npm run dev
```

App will run at:

```
http://localhost:5173
``-

 🏗 Build for production

``bash
npm run build


Preview build:

`bash
npm run preview
``

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable:


4. Deploy 🚀

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action         |
| -------- | -------------- |
| `/`      | Focus search   |
| `Enter`  | Add task       |
| `Esc`    | Cancel editing |

---

## 🔒 Security Note

* API keys are stored in environment variables
* `.env` is ignored via `.gitignore`
* Never expose secrets in frontend code

---

## 🌟 Future Improvements

* 🔔 Notifications
* ☁️ Cloud sync
* 👥 User authentication
* 📈 Advanced analytics
* 🧠 Smarter AI planning

---

## 👨‍💻 Author

**Dhruv kumar**

If you like this project, give it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.
