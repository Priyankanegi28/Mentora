import React, { useEffect, useState } from 'react';

const categoryIcons = {
  'Grounding': '🌳',
  'Distraction': '🎲',
  'Self-Soothing': '🧸',
  'Movement': '🏃‍♂️',
  'Breathing': '🌬️',
};

const initialSkills = [
  // Grounding
  { id: 1, category: 'Grounding', name: '5-4-3-2-1 Senses', description: 'Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.', isDefault: true },
  { id: 2, category: 'Grounding', name: 'Name Objects', description: 'Look around and name 10 objects you see out loud.', isDefault: true },
  { id: 3, category: 'Grounding', name: 'Feel Your Feet', description: 'Press your feet into the ground and notice the sensation.', isDefault: true },
  { id: 4, category: 'Grounding', name: 'Describe Your Surroundings', description: 'Describe your environment in detail, either out loud or in your mind.', isDefault: true },
  { id: 5, category: 'Grounding', name: 'Cold Water Splash', description: 'Splash cold water on your face or hold an ice cube.', isDefault: true },

  // Distraction
  { id: 6, category: 'Distraction', name: 'Doodle or Draw', description: 'Take a few minutes to doodle, sketch, or color something.', isDefault: true },
  { id: 7, category: 'Distraction', name: 'Count Backwards', description: 'Count backwards from 100 by 3s or 7s.', isDefault: true },
  { id: 8, category: 'Distraction', name: 'Play a Game', description: 'Play a quick game on your phone or with a friend.', isDefault: true },
  { id: 9, category: 'Distraction', name: 'Watch a Funny Video', description: 'Watch a short, funny video or meme.', isDefault: true },
  { id: 10, category: 'Distraction', name: 'Read a Book or Article', description: 'Read a few pages of a book or an interesting article.', isDefault: true },

  // Self-Soothing
  { id: 11, category: 'Self-Soothing', name: 'Listen to Music', description: 'Play a favorite song or calming music.', isDefault: true },
  { id: 12, category: 'Self-Soothing', name: 'Hold a Comfort Object', description: 'Hold something soft or comforting, like a pillow or stuffed animal.', isDefault: true },
  { id: 13, category: 'Self-Soothing', name: 'Light a Scented Candle', description: 'Light a candle or use essential oils with a scent you enjoy.', isDefault: true },
  { id: 14, category: 'Self-Soothing', name: 'Take a Warm Shower', description: 'Take a warm shower or bath to relax your body.', isDefault: true },
  { id: 15, category: 'Self-Soothing', name: 'Wrap Yourself in a Blanket', description: 'Wrap up in a soft blanket and focus on the warmth.', isDefault: true },

  // Movement
  { id: 16, category: 'Movement', name: 'Stretch or Walk', description: 'Stand up, stretch, or take a short walk.', isDefault: true },
  { id: 17, category: 'Movement', name: 'Dance to Music', description: 'Put on a song and dance, even if just for a minute.', isDefault: true },
  { id: 18, category: 'Movement', name: 'Jumping Jacks', description: 'Do 10-20 jumping jacks to get your blood flowing.', isDefault: true },
  { id: 19, category: 'Movement', name: 'Yoga Pose', description: "Try a simple yoga pose like child's pose or downward dog.", isDefault: true },
  { id: 20, category: 'Movement', name: 'Shake It Out', description: 'Shake your hands, arms, and legs to release tension.', isDefault: true },

  // Breathing
  { id: 21, category: 'Breathing', name: 'Box Breathing', description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat.', isDefault: true },
  { id: 22, category: 'Breathing', name: '4-7-8 Breathing', description: 'Inhale for 4, hold for 7, exhale for 8. Repeat 4 times.', isDefault: true },
  { id: 23, category: 'Breathing', name: 'Belly Breathing', description: 'Place a hand on your belly and breathe deeply, feeling it rise and fall.', isDefault: true },
  { id: 24, category: 'Breathing', name: 'Sighing Exhale', description: 'Take a deep breath and let it out with a sigh. Repeat a few times.', isDefault: true },
  { id: 25, category: 'Breathing', name: 'Alternate Nostril Breathing', description: 'Close one nostril, inhale, switch, exhale. Repeat on both sides.', isDefault: true },
];

const categories = [
  'Grounding',
  'Distraction',
  'Self-Soothing',
  'Movement',
  'Breathing',
];

const encouragements = [
  "You're doing great!",
  "Every step counts!",
  "Proud of you for taking care of yourself!",
  "Keep going, you got this!",
  "Small actions make a big difference!",
];

const CopingSkillsToolbox = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [favorites, setFavorites] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', description: '', category: categories[0] });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('copingSkillsFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem('copingSkillsFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    const isFav = favorites.includes(id);
    setFavorites((prev) =>
      isFav ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
    if (isFav) {
      showSnackbar('Skill unfavorited.');
    } else {
      showSnackbar('Skill favorited! ' + encouragements[Math.floor(Math.random() * encouragements.length)]);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim() || !newSkill.description.trim()) return;
    setSkills([
      ...skills,
      {
        id: skills.length + 1,
        ...newSkill,
        isDefault: false,
      },
    ]);
    setNewSkill({ name: '', description: '', category: categories[0] });
    setShowAdd(false);
    showSnackbar('Custom skill added!');
  };

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
    setFavorites(favorites.filter((fid) => fid !== id));
    showSnackbar('Custom skill removed.');
  };

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: '' }), 2200);
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '24px', fontFamily: 'inherit' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 18, fontSize: '2.2rem', letterSpacing: 1, background: 'linear-gradient(45deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Coping Skills Toolbox</h1>
      <p style={{ color: '#bbb', textAlign: 'center', marginBottom: 28 }}>
        Explore and favorite coping skills for stress, anxiety, and tough moments. Add your own to personalize your toolbox!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <button
          style={{
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
            marginRight: 8,
            boxShadow: '0 2px 8px rgba(76,175,80,0.15)',
            transition: 'background 0.2s',
          }}
          onClick={() => setShowAdd((s) => !s)}
        >
          {showAdd ? 'Cancel' : 'Add Custom Skill'}
        </button>
      </div>
      {showAdd && (
        <div style={{ background: '#222', borderRadius: 10, padding: 20, margin: '0 auto 32px', maxWidth: 400, boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
          <input
            type="text"
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff' }}
          />
          <textarea
            placeholder="Description"
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff', minHeight: 60 }}
          />
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginRight: 8 }}
            onClick={handleAddSkill}
          >
            Add Skill
          </button>
        </div>
      )}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 32 }}>
            <h2 style={{ color: '#f093fb', fontSize: '1.3rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.6rem' }}>{categoryIcons[cat]}</span> {cat}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {skills.filter((s) => s.category === cat).length === 0 && (
                <span style={{ color: '#888' }}>No skills yet in this category.</span>
              )}
              {skills.filter((s) => s.category === cat).map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    background: favorites.includes(skill.id) ? 'linear-gradient(135deg, #4caf50 0%, #232526 100%)' : '#1c1c1e',
                    borderRadius: 12,
                    padding: 20,
                    minWidth: 220,
                    maxWidth: 320,
                    flex: '1 1 220px',
                    position: 'relative',
                    boxShadow: hovered === skill.id ? '0 4px 18px rgba(76,175,80,0.18)' : '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.2s, background 0.2s',
                    transform: hovered === skill.id ? 'translateY(-4px) scale(1.03)' : 'none',
                  }}
                  onMouseEnter={() => setHovered(skill.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem', marginBottom: 6 }}>{skill.name}</div>
                  <div style={{ color: '#bbb', fontSize: '0.98rem', marginBottom: 10 }}>{skill.description}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => toggleFavorite(skill.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        color: favorites.includes(skill.id) ? '#FFD700' : '#fff',
                        transition: 'transform 0.2s',
                        transform: hovered === skill.id ? 'scale(1.2)' : 'scale(1)',
                        marginRight: 4,
                      }}
                      title={favorites.includes(skill.id) ? 'Unfavorite' : 'Favorite'}
                    >
                      {favorites.includes(skill.id) ? '★' : '☆'}
                    </button>
                    {!skill.isDefault && (
                      <button
                        onClick={() => handleRemoveSkill(skill.id)}
                        style={{
                          background: '#f44336',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '2px 10px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                        title="Remove custom skill"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {favorites.length > 0 && (
        <div style={{ marginTop: 40, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ color: '#4caf50', fontSize: '1.2rem', marginBottom: 12 }}>Your Favorites</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
            {skills.filter((s) => favorites.includes(s.id)).map((skill) => (
              <div key={skill.id} style={{ background: '#232323', borderRadius: 12, padding: 20, minWidth: 220, maxWidth: 320, flex: '1 1 220px', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem', marginBottom: 6 }}>{skill.name}</div>
                <div style={{ color: '#bbb', fontSize: '0.98rem', marginBottom: 10 }}>{skill.description}</div>
                <button
                  onClick={() => toggleFavorite(skill.id)}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.3rem',
                    color: '#FFD700',
                  }}
                  title={favorites.includes(skill.id) ? 'Unfavorite' : 'Favorite'}
                >
                  {favorites.includes(skill.id) ? '★' : '☆'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Snackbar */}
      {snackbar.open && (
        <div style={{
          position: 'fixed',
          bottom: 30,
          left: 0,
          right: 0,
          margin: '0 auto',
          background: '#323232',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          fontSize: '1.1rem',
          zIndex: 9999,
          animation: 'fadeInUp 0.4s',
          width: 320,
          maxWidth: '90vw',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}>
          {snackbar.message}
        </div>
      )}
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 700px) {
          h1 { font-size: 1.3rem !important; }
          h2 { font-size: 1.05rem !important; }
          div[style*='minWidth: 220px'] { min-width: 90vw !important; max-width: 98vw !important; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CopingSkillsToolbox;