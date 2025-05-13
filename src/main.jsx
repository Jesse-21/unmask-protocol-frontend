
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Simple initialization with better error handling
const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log("React successfully rendered");
    
    // Remove loading screen when React is ready
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
      console.log("Loading screen hidden");
    }
  } catch (error) {
    console.error("Error rendering React application:", error);
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application failed to load. Please try refreshing the page.</p>
        <p>Error details: ${error.message}</p>
      </div>
    `;
  }
} else {
  console.error("Could not find root element with ID 'root'");
}
