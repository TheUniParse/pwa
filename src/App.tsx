import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    if (!navigator.serviceWorker) {
      console.log('service worker are not supported!!')
      return
    }

    navigator.serviceWorker
      .register('/sw_cached_site.js')
      .then(() => console.log('service worker: registered'))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h1>service worker</h1>
    </div>
  )
}

export default App
