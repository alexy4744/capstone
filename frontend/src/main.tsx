import React from "react";
import ReactDOM from "react-dom/client";

import { initializeApp } from "firebase/app";

import { createApp } from "./App.tsx";

import "./index.css";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAUpRECV3GBh5gMfkwsrMHSWMUwagGeRbA",
  authDomain: "math-study-app.firebaseapp.com",
  projectId: "math-study-app",
  storageBucket: "math-study-app.appspot.com",
  messagingSenderId: "386660766385",
  appId: "1:386660766385:web:760de96be39154adefc890",
  measurementId: "G-SMRD2T6P9Y",
});

const root = document.getElementById("root")!;

const App = createApp(firebaseApp);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
