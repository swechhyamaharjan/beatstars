import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || process.env.ID; // fallback to ID
  const pass = process.env.SMTP_PASS || process.env.PASS; // fallback to PASS
  const from = process.env.SMTP_FROM || process.env.FROM || `"Beatstars" <no-reply@beatstars.local>`;

  // Remove spaces from app password (Gmail app passwords may have spaces)
  const cleanPass = pass ? pass.replace(/\s/g, '') : '';

  // Validate that we have actual credentials (not empty strings)
  const hasValidAuth = user && cleanPass && user.trim() !== "" && cleanPass.trim() !== "";

  if (!hasValidAuth) {
    // In development, log the email instead of sending it
    console.log("=".repeat(60));
    console.log("EMAIL NOT SENT (No SMTP credentials configured)");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Body:", html);
    console.log("SMTP_USER:", user ? "✓ Set" : "✗ Missing");
    console.log("SMTP_PASS:", pass ? "✓ Set" : "✗ Missing");
    console.log("=".repeat(60));
    return; // Don't throw error, just log in development
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user: user.trim(),
      pass: cleanPass
    },
  });

  try {
    console.log(`Attempting to send email to ${to}...`);
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html
    });
    console.log(`Email sent successfully to ${to}`);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    console.error("Full error:", error);
    throw error;
  }
}


