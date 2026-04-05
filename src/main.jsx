import './style.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('app')
if (rootElement) {
  createRoot(rootElement).render(<App />)
}
