import { useEffect } from "react";

export default function VerifyEmail() {
  useEffect(() => {
    const hash = window.location.hash; // #/verify-email?token=...
    const q = new URLSearchParams(hash.split("?")[1] || "");
    const token = q.get("token") || "";
    if (token) {
      fetch(`http://localhost:3000/api/users/verify-email?token=${encodeURIComponent(token)}`)
        .then(() => { window.location.hash = `#/set-password?token=${encodeURIComponent(token)}` })
        .catch(() => alert("Verification failed"));
    }
  }, []);
  return null;
}


