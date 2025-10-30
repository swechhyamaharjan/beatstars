import AuthLayout from './AuthLayout.jsx'

function Login() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue">
      <div className="auth-social">
        <a className="btn" href="#">Continue with Google</a>
        <a className="btn" href="#">Continue with Apple</a>
      </div>
      <div className="auth-divider"><span>or</span></div>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field">
          <label className="auth-label">Email</label>
          <input className="auth-input" type="email" placeholder="you@example.com" required />
        </div>
        <div className="auth-field">
          <label className="auth-label">Password</label>
          <input className="auth-input" type="password" placeholder="••••••••" required />
        </div>
        <div className="auth-row">
          <a href="#">Forgot password?</a>
        </div>
        <button className="auth-btn" type="submit">Sign in</button>
      </form>
      <div className="auth-switch">No account? <a href="#/signup">Create one</a></div>
    </AuthLayout>
  )
}

export default Login


