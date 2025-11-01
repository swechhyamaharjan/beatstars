import { useState } from 'react'
import AuthLayout from './AuthLayout.jsx'
import { auth } from './auth.js'
import Notification from './Notification.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        // Clone response before reading to avoid "body already consumed" error
        const clonedRes = res.clone()
        try {
          // Try to parse as JSON first (backend should send JSON)
          const data = await res.json()
          
          // Check if data has User property
          if (data && data.User) {
            // Store user info
            auth.setUser(data.User)
            setShowNotification(true)
            
            // Redirect to home after a short delay
            setTimeout(() => {
              window.location.hash = '/'
            }, 1000)
          } else {
            console.error('Unexpected response format:', data)
            setError('Invalid response format from server')
          }
        } catch (parseErr) {
          console.error('Error parsing JSON response:', parseErr)
          // Try to get text response if JSON parsing fails
          try {
            const text = await clonedRes.text()
            console.error('Response text:', text)
            setError('Server returned invalid response format')
          } catch (textErr) {
            console.error('Error parsing text response:', textErr)
            setError('Error parsing server response')
          }
        }
      } else {
        // Handle error responses
        try {
          const contentType = res.headers.get('content-type')
          const isJson = contentType && contentType.includes('application/json')
          
          if (isJson) {
            const errorData = await res.json()
            setError(errorData.error || errorData.message || 'Login failed')
          } else {
            const errorText = await res.text()
            setError(errorText || `Login failed with status ${res.status}`)
          }
        } catch (parseErr) {
          console.error('Error parsing error response:', parseErr)
          setError(`Login failed with status ${res.status}`)
        }
      }
    } catch (err) {
      console.error('Network error:', err)
      setError(err.message || 'Network error. Please check your connection and try again.')
    }
  }

  return (
    <>
      {showNotification && (
        <Notification
          message="You are logged in successfully"
          onClose={() => setShowNotification(false)}
        />
      )}
      <AuthLayout title="Welcome back" subtitle="Sign in to continue">
        <div className="auth-social">
          <a className="btn" href="#">Continue with Google</a>
          <a className="btn" href="#">Continue with Apple</a>
        </div>
        <div className="auth-divider"><span>or</span></div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error" style={{ color: '#ff4444', marginBottom: '16px' }}>
              {error}
            </div>
          )}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-row">
            <a href="#/forgot-password">Forgot password?</a>
          </div>
          <button className="auth-btn" type="submit">Sign in</button>
        </form>
        <div className="auth-switch">No account? <a href="#/signup">Create one</a></div>
      </AuthLayout>
    </>
  )
}

export default Login


