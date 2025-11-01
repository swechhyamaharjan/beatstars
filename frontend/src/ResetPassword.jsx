import { useEffect, useState } from 'react'
import AuthLayout from './AuthLayout.jsx'

export default function ResetPassword() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const hash = window.location.hash // #/reset-password?token=...
    const q = new URLSearchParams(hash.split('?')[1] || '')
    setToken(q.get('token') || '')
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/api/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })
    if (res.ok) {
      setDone(true)
    } else {
      alert(await res.text())
    }
  }

  return (
    <AuthLayout title="Reset password" subtitle="Choose a new password">
      {done ? (
        <p>Password reset. <a href="#/login">Sign in</a></p>
      ) : (
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label className="auth-label">New password</label>
            <input className="auth-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="auth-btn" type="submit">Reset password</button>
        </form>
      )}
    </AuthLayout>
  )
}


