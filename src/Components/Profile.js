import React from 'react';

const Profile = ({ user }) => {
  // Fallback for demo if no user prop is passed
  const demoUser = {
    displayName: 'Guest User',
    email: 'guest@example.com',
    photoURL: '',
  };
  const currentUser = user || demoUser;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <div style={{ background: '#232323', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', minWidth: 320, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: 24 }}>
          <img
            src={currentUser.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.displayName || currentUser.email || 'User') + '&background=667eea&color=fff&size=128'}
            alt="Profile"
            style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '3px solid #667eea' }}
          />
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#fff', fontWeight: 700 }}>{currentUser.displayName || 'No Name'}</h2>
          <p style={{ color: '#bbb', margin: '8px 0 0 0', fontSize: '1rem' }}>{currentUser.email}</p>
        </div>
        {/* Add more user details here if available */}
        <div style={{ color: '#aaa', fontSize: '0.98rem', marginTop: 16 }}>
          <div><strong>User ID:</strong> {currentUser.uid || 'N/A'}</div>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
