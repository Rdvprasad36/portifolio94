import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactModal({ onClose }) {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Incoming Report from ${sender}`);
    const body = encodeURIComponent(`From: ${sender}\n\nMessage:\n${message}`);
    window.location.href = `mailto:rdvprasad36@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel"
        initial={{ scale: 0.5, opacity: 0, rotate: 5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '600px', width: '100%', border: '4px solid #C51111', background: '#1A0D0D' }}
      >
        {/* Header Ribbon */}
        <div style={{ background: '#C51111', padding: '16px', textAlign: 'center' }}>
          <span className="pixel-heading" style={{ fontSize: '20px', color: 'white', textShadow: '3px 3px 0 #000' }}>
            REPORT BODY
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          
          {/* Left Side: Form */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="pixel-text" style={{ color: '#ffaaaa', fontSize: '10px' }}>
                TRANSMIT INCIDENT DETAILS TO COMM RELAY
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="pixel-text" style={{ color: '#fff', fontSize: '10px' }}>YOUR ID TAG</label>
                <input
                  type="text"
                  required
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="mono-text"
                  placeholder="Crewmate Name / Email"
                  style={{
                    background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(197, 17, 17, 0.5)',
                    padding: '12px 16px', color: '#fff', fontSize: '16px',
                    outline: 'none', borderRadius: '4px'
                  }}
                  onFocus={e => e.target.style.borderColor = '#C51111'}
                  onBlur={e => e.target.style.borderColor = 'rgba(197, 17, 17, 0.5)'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="pixel-text" style={{ color: '#fff', fontSize: '10px' }}>INCIDENT LOG</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mono-text"
                  placeholder="Where was it? Message..."
                  style={{
                    background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(197, 17, 17, 0.5)',
                    padding: '12px 16px', color: '#fff', fontSize: '16px',
                    outline: 'none', borderRadius: '4px', resize: 'vertical'
                  }}
                  onFocus={e => e.target.style.borderColor = '#C51111'}
                  onBlur={e => e.target.style.borderColor = 'rgba(197, 17, 17, 0.5)'}
                />
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                <button
                  type="submit"
                  className="report-btn"
                  style={{ flex: 1, fontSize: '14px' }}
                >
                  SEND REPORT
                </button>
              </div>

            </form>
          </div>

          {/* Right Side: Contact Details */}
          <div style={{ borderLeft: '2px dashed rgba(197, 17, 17, 0.3)', paddingLeft: '32px' }}>
            <div className="pixel-text" style={{ color: '#00CFCF', fontSize: '12px', marginBottom: '24px', letterSpacing: '2px' }}>
              COMMUNICATIONS DATA
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="au-panel-light" style={{ padding: '16px', border: '1px solid #00CFCF33' }}>
                <div className="pixel-text" style={{ color: '#6B31BC', fontSize: '8px', marginBottom: '8px' }}>[COMMS]</div>
                <div className="mono-text" style={{ color: '#FFF', fontSize: '14px' }}>rdvprasad36@gmail.com</div>
              </div>

              <div className="au-panel-light" style={{ padding: '16px', border: '1px solid #00CFCF33' }}>
                <div className="pixel-text" style={{ color: '#6B31BC', fontSize: '8px', marginBottom: '8px' }}>[SATELLITE]</div>
                <div className="mono-text" style={{ color: '#FFF', fontSize: '14px' }}>+91 7382612327</div>
              </div>

              <div className="au-panel-light" style={{ padding: '16px', border: '1px solid #00CFCF33' }}>
                <div className="pixel-text" style={{ color: '#6B31BC', fontSize: '8px', marginBottom: '8px' }}>[IDENTITY]</div>
Durga Venkata Prasad Rapeti (LinkedIn)
              </div>
            </div>

            <button
               onClick={onClose}
               style={{
                 marginTop: '32px', width: '100%', background: 'transparent', 
                 border: '1px solid #C51111', color: '#C51111',
                 fontFamily: "'Press Start 2P', monospace", fontSize: '10px', 
                 padding: '12px', cursor: 'pointer', borderRadius: '4px'
               }}
            >
              DISMISS
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
