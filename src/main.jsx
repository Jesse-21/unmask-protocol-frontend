
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Simple initialization with better error handling
const rootElement = document.getElementById("root");

// Add detailed console logging to track initialization
console.log("Initializing React application...");

if (rootElement) {
  try {
    console.log("Root element found, attempting to render React app");
    
    ReactDOM.createRoot(rootElement).render(
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    );
    
    console.log("React successfully rendered");
    
    // Remove loading screen when React is ready
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // Use a short timeout to ensure the app has had time to initialize properly
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        console.log("Loading screen hidden");
      }, 1000); // Increased timeout for more reliability
    } else {
      console.warn("Loading screen element not found");
    }
  } catch (error) {
    console.error("Fatal error rendering React application:", error);
    // Display a more visible error message for users
    const loadingError = document.getElementById('loading-error');
    if (loadingError) {
      loadingError.style.display = 'block';
      loadingError.textContent = `Error: ${error.message}. Please refresh the page.`;
    }
    
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; background-color: #111; color: #f0f0f0; font-family: sans-serif;">
        <h1 style="color: #e74c3c;">Application Error</h1>
        <p>The application failed to load properly. Please refresh the page or check your connection.</p>
        <p style="background: #222; padding: 10px; border-radius: 4px; margin-top: 20px; font-family: monospace; text-align: left;">Error details: ${error.message}</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
} else {
  console.error("Critical error: Could not find root element with ID 'root'");
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; background-color: #111; color: #f0f0f0; font-family: sans-serif;">
      <h1 style="color: #e74c3c;">Application Error</h1>
      <p>The application could not find the root element. This might be due to a configuration issue.</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
}
