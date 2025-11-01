import AuthLayout from './AuthLayout.jsx'

function Signup() {
  const startGoogle = async () => {
    const email = prompt("Enter your Google email to simulate Google sign-in:");
    if (!email) return;
    const name = email.split("@")[0];
    await fetch("http://localhost:3000/api/users/google-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name })
    });
    window.location.hash = "#/check-email";
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join the marketplace for creators">
      <div className="auth-social">
        <button className="btn" onClick={startGoogle}>Sign up with Google</button>
        <a className="btn" href="#">Sign up with Apple</a>
      </div>
      <div className="auth-divider"><span>or</span></div>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field">
          <label className="auth-label">Name</label>
          <input className="auth-input" type="text" placeholder="Jane Doe" required />
        </div>
        <div className="auth-field">
          <label className="auth-label">Email</label>
          <input className="auth-input" type="email" placeholder="you@example.com" required />
        </div>
        <div className="auth-field">
          <label className="auth-label">Password</label>
          <input className="auth-input" type="password" placeholder="••••••••" required />
        </div>
        <div className="auth-field">
          <label className="auth-label">Confirm password</label>
          <input className="auth-input" type="password" placeholder="••••••••" required />
        </div>
        <button className="auth-btn" type="submit">Create account</button>
      </form>
      <div className="auth-switch">Already have an account? <a href="#/login">Sign in</a></div>
    </AuthLayout>
  )
}

export default Signup


