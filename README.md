# Gfgu - Growing from the ground up

A multivendor app. This is the frontend repo

## Installation

### Requirement
* Node
* Virtual studio code

### Run on local

```javascript
npm run dev
```

## Project structure
Project is feature-base structured. Here is an example 

```javascript
project-root/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   └── index.js
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── SignupPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   ├── authSlice.js     # Redux slice (if using Redux Toolkit)
│   │   │   └── index.js         # Central export
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DashboardCard.jsx
│   │   │   │   └── index.js
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   ├── components/             # Shared/reusable components (e.g., Navbar, Button)
│   │   ├── Navbar.jsx
│   │   ├── Button.jsx
│   │   └── index.js
│   ├── styles/                 # Global Tailwind styles or additional CSS files
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── utils/                  # Utility functions/helpers
│   │   └── formatDate.js
│   ├── app/
│   │   ├── App.jsx             # Main app entry
│   │   ├── store.js            # Redux store (if using Redux Toolkit)
│   │   └── routes.jsx          # Centralized routes
│   ├── index.jsx               # React DOM entry point
│   └── main.jsx                # Main JS file (e.g., if using Vite)
├── public/                     # Public assets
│   ├── index.html
│   └── favicon.ico
├── .env                        # Environment variables
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration for Tailwind
├── package.json                # Project metadata and dependencies
├── .gitignore                  # Git ignore file
└── README.md                   # Documentation

```

### Foolder Breakdown

Each feature gets its own folder, containing everything it needs to function:

* components: Shared/reusable components like buttons, modals, and the navbar that are used across multiple features.
* styles: Global Tailwind CSS styles and configuration.
* utils: Utility functions and helpers (e.g., date formatting, API calls).
* app: The main application setup, including routing, Redux store, and the app’s root component.