import React from "react";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>Something went wrong! 😢</h2>
    <p style={{ color: "red" }}>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
