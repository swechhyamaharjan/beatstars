import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Collections from './Collections.jsx'
import CheckEmail from './CheckEmail.jsx'
import VerifyEmail from './VerifyEmail.jsx'
import SetPassword from './SetPassword.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import ResetPassword from './ResetPassword.jsx'

function Placeholder({ title }) {
  return (
    <div style={{ minHeight: '100vh', background:'#0c0c0d', color:'#eaeaf0' }}>
      <App />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'2rem 1rem' }}>
        <h1>{title}</h1>
        <p>This page is coming soon.</p>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'

function Router() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    function onHashChange() {
      setHash(window.location.hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (hash.startsWith('#/login')) return <Login />
  if (hash.startsWith('#/signup')) return <Signup />
  if (hash.startsWith('#/check-email')) return <CheckEmail />
  if (hash.startsWith('#/verify-email')) return <VerifyEmail />
  if (hash.startsWith('#/set-password')) return <SetPassword />
  if (hash.startsWith('#/forgot-password')) return <ForgotPassword />
  if (hash.startsWith('#/reset-password')) return <ResetPassword />
  if (hash.startsWith('#/collections')) return <Collections />
  if (hash.startsWith('#/tracks')) return <Placeholder title="Tracks" />
  if (hash.startsWith('#/soundkits')) return <Placeholder title="Sound Kits" />
  if (hash.startsWith('#/musicians')) return <Placeholder title="Musicians" />
  if (hash.startsWith('#/aimodels')) return <Placeholder title="AI Models" />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
