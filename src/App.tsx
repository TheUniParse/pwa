import { useEffect } from 'react'
import swUrl from '/sw_cached_site.js?url'
import './App.css'

function App() {
  useEffect(() => {
    if (!navigator.serviceWorker) {
      console.log('service worker are not supported!!')
      return
    }

    navigator.serviceWorker
      .register(swUrl)
      .then(() => console.log('service worker: registered'))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h1>progressive web app</h1>
    </div>
  )
}

export default App
