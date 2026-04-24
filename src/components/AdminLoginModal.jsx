import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';

export default function AdminLoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = usePortfolioInfo();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');
    
    // In Supabase, the email is needed. For the fallback, Rdv36 works.
    const success = await login(username, password);
    
    if (success) {
      onClose();
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('INVALID CREDENTIALS. ACCESS DENIED.');
    }
    setIsAuthenticating(false);
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
        <motion.div
          className="au-panel"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '400px', width: '100%', padding: '30px' }}
        >
          <h2 className="pixel-heading" style={{ color: '#00CFCF', textAlign: 'center', marginBottom: '20px' }}>
            ADMIN OVERRIDE
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="pixel-text" style={{ color: '#A0AAB2', fontSize: '10px', marginBottom: '8px', display: 'block' }}>CREWMATE ID</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#131920',
                  border: '2px solid #2C3A46',
                  color: '#FFF',
                  borderRadius: '6px',
                  fontFamily: "'Space Mono', monospace"
                }}
              />
            </div>
            
            <div>
              <label className="pixel-text" style={{ color: '#A0AAB2', fontSize: '10px', marginBottom: '8px', display: 'block' }}>PASSCODE</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#131920',
                  border: '2px solid #2C3A46',
                  color: '#FFF',
                  borderRadius: '6px',
                  fontFamily: "'Space Mono', monospace"
                }}
              />
            </div>

            {error && <div className="pixel-text blink" style={{ color: '#FF0000', fontSize: '10px', textAlign: 'center' }}>{error}</div>}

            <motion.button
              whileHover={{ scale: isAuthenticating ? 1 : 1.05, background: isAuthenticating ? 'transparent' : '#00CFCF', color: isAuthenticating ? '#00CFCF' : '#000' }}
              whileTap={{ scale: isAuthenticating ? 1 : 0.95 }}
              type="submit"
              disabled={isAuthenticating}
              className="pixel-heading"
              style={{
                background: 'transparent',
                border: '2px solid #00CFCF',
                padding: '12px',
                color: '#00CFCF',
                cursor: isAuthenticating ? 'not-allowed' : 'pointer',
                borderRadius: '6px',
                marginTop: '10px',
                opacity: isAuthenticating ? 0.5 : 1
              }}
            >
              {isAuthenticating ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
