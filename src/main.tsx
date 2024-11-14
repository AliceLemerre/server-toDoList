
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { ErrorBoundary } from "react-error-boundary";
import React from 'react'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StrictMode>
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <ConvexProvider client={convex}>
          <App />
        </ConvexProvider>
      </ErrorBoundary>
    </StrictMode>
  </React.StrictMode>
)
