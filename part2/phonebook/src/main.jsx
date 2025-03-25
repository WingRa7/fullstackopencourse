import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const directory = [
  { name: 'Carlos Whispers', number: 66442277, id: 1 },
  { name: 'Gary Chapati', number: 83864949, id: 2 },
  { name: 'Gerhardt Nightcreeper', number: 77720402, id: 3 },
  { name: 'Chad Salad', number: 80848084, id: 4 },
]

createRoot(document.getElementById('root')).render(
    <App directory={directory} />
)
