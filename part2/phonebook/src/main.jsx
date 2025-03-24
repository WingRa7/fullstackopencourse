import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const directory = [
  { name: 'Arto Hellas', number: 66442277 }
]

createRoot(document.getElementById('root')).render(
    <App directory={directory} />
)
