import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// Note: StrictMode removed — Framer Motion AnimatePresence + StrictMode causes
// duplicate hook calls in React 18 dev mode
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
