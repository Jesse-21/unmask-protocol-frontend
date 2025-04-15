
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// More robust initialization with better error handling for production
const renderApp = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Could not find root element");
    return;
  }
  
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    
    // Hide loading screen after rendering
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      console.log("React app rendered, removing loading screen");
      // Remove loading screen immediately after render
      loadingScreen.style.display = 'none';
    }
  } catch (error) {
    console.error("Error rendering the application:", error);
    
    // Show error message in the UI
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px; text-align: center; font-family: sans-serif;">
        <h2>Application Error</h2>
        <p>We encountered a problem loading the application. Please try refreshing the page.</p>
        <p><small>Error details: ${error.message || 'Unknown error'}</small></p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; margin-top: 16px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
    
    // Also hide loading screen on error
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }
};

// Execute renderApp when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
