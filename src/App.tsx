import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    if (!navigator.serviceWorker) {
      console.log('service worker are not supported!!')
      return
    }

    const swUrl = 'serviceWorker/sw_cached_pages.js'
    navigator.serviceWorker.register(swUrl)
  }, [])

  return (
    <div>
      <h1>service worker</h1>
    </div>
  )
}

export default App
