import { useEffect, useState } from 'react';
import './Notification.css';

export default function Notification({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`notification ${visible ? 'notification--show' : ''}`}>
      <div className="notification__content">
        <span className="notification__icon">✓</span>
        <span className="notification__message">{message}</span>
      </div>
      <button className="notification__close" onClick={() => {
        setVisible(false);
        setTimeout(() => onClose?.(), 300);
      }}>×</button>
    </div>
  );
}

