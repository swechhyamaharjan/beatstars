import './Auth.css'
import NavBar from './NavBar.jsx'

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth">
      <NavBar />
      <main className="auth-main">
        <div className="auth-card">
          <header className="auth-header">
            <h1 className="auth-title">{title}</h1>
            {subtitle && <p className="auth-sub">{subtitle}</p>}
          </header>
          {children}
          <footer className="auth-footer">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</footer>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout


