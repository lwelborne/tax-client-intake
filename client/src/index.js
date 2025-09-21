// Import the React core library
import React from "react";

// Import ReactDOM for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// Import the main App component (the root component of your entire app)
import App from "./App";

// Create a React root and attach it to the <div id="root"></div> in public/index.html
// This is where the whole React app will be injected.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  <React.StrictMode>
    {/* 
      React.StrictMode is a wrapper that activates extra checks and warnings
      during development (such as detecting deprecated APIs and potential side effects).
      It does not affect the production build, but helps you write safer code. 
    */}
    <App /> 
    {/* The <App /> component is the root of your component tree.
        All other components are imported and rendered inside App.js. */}
  </React.StrictMode>,
);
