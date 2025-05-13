
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo?.componentStack);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 bg-red-950/30 border border-red-500/30 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4 text-red-400">Something went wrong</h2>
          {this.state.error && (
            <div className="mb-4 p-3 bg-red-950/50 border border-red-500/20 rounded text-left overflow-auto">
              <p className="text-red-300 mb-2">Error: {this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <details className="text-xs text-red-300/70">
                  <summary className="cursor-pointer mb-1">Component Stack</summary>
                  <pre className="whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
            <button
              className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              Try to Continue
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
