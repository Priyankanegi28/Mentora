import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div style={{ background: '#232323', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', minWidth: 320, maxWidth: 400, width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24, fontSize: '2.2rem', letterSpacing: 1, background: 'linear-gradient(45deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Settings</h1>
        <div style={{ color: '#fff', marginBottom: 24, fontWeight: 600, fontSize: '1.1rem' }}>Account Settings</div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ color: '#bbb', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Enable Notifications
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(n => !n)} />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ color: '#bbb', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Dark Mode
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(d => !d)} />
          </label>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ color: '#bbb', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Private Account
            <input type="checkbox" checked={privacy} onChange={() => setPrivacy(p => !p)} />
          </label>
        </div>
        <div style={{ color: '#aaa', fontSize: '0.98rem', marginTop: 24 }}>
          <div>More settings coming soon...</div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 