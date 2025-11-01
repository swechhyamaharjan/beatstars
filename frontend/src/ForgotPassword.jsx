import { useState } from 'react'
import AuthLayout from './AuthLayout.jsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3000/api/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    setSent(true)
  }

  return (
    <AuthLayout title="Forgot password" subtitle="We'll email you a reset link">
      {sent ? (
        <p>Check your email for the reset link.</p>
      ) : (
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <button className="auth-btn" type="submit">Send reset link</button>
        </form>
      )}
    </AuthLayout>
  )
}


