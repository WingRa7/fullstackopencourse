import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const directory = [
  { name: 'Arto Hellas' },
  { name: 'John Bishop' },
]

createRoot(document.getElementById('root')).render(
    <App directory={directory} />
)
