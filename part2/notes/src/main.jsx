import ReactDOM from 'react-dom/client'

import App from './App'

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
=======
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
>>>>>>> 15b7c36e53859d3a3177afc1b2f11b5e28ab6aaf
