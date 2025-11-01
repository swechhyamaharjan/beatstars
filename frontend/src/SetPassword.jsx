import { useEffect, useState } from "react";
import AuthLayout from './AuthLayout.jsx'

export default function SetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const hash = window.location.hash; // #/set-password?token=...
    const q = new URLSearchParams(hash.split("?")[1] || "");
    const t = q.get("token") || "";
    setToken(t);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/users/set-password", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ token, password })
    });
    if (res.ok) {
      window.location.hash = "#/login";
    } else {
      alert(await res.text());
    }
  };

  return (
    <AuthLayout title="Set your password" subtitle="Complete your signup">
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-field">
          <label className="auth-label">New password</label>
          <input className="auth-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button className="auth-btn" type="submit">Save password</button>
      </form>
    </AuthLayout>
  )
}


