import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactCard = ({ icon, label, value, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      textDecoration: 'none',
      width: '100%',
      marginBottom: '16px'
    }}
  >
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'rgba(255, 87, 51, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FF5733'
    }}>
      {icon}
    </div>
    <div>
      <div style={{ color: '#888', fontSize: '10px', marginBottom: '8px', fontFamily: "'Press Start 2P', cursive" }}>{label}</div>
      <div className="mono-text" style={{ color: '#FFF', fontSize: '16px', fontWeight: 'bold' }}>{value}</div>
    </div>
  </motion.a>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:rdvprasad36@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '120px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
         <h2 className="pixel-heading" style={{ color: '#FF2070', fontSize: '28px', textShadow: '4px 4px 0 #000' }}>EMERGENCY MEETING</h2>
         <p className="pixel-text" style={{ color: '#A0AAB2', marginTop: '20px', fontSize: '10px' }}>TRANSMIT INCIDENT DETAILS TO COMM RELAY</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
      }}>
        {/* Left Column: Form */}
        <div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label className="pixel-text" style={{ color: '#FFF', fontSize: '10px' }}>NAME / ID TAG</label>
              <input
                type="text"
                required
                placeholder="Crewmate Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mono-text"
                style={{
                  background: 'rgba(21, 21, 21, 0.8)',
                  border: '2px solid #2C3A46',
                  padding: '16px',
                  borderRadius: '8px',
                  color: '#FFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label className="pixel-text" style={{ color: '#FFF', fontSize: '10px' }}>COMM RELAY (EMAIL)</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mono-text"
                style={{
                  background: 'rgba(21, 21, 21, 0.8)',
                  border: '2px solid #2C3A46',
                  padding: '16px',
                  borderRadius: '8px',
                  color: '#FFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label className="pixel-text" style={{ color: '#FFF', fontSize: '10px' }}>INCIDENT LOG (MESSAGE)</label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your task..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mono-text"
                style={{
                  background: 'rgba(21, 21, 21, 0.8)',
                  border: '2px solid #2C3A46',
                  padding: '16px',
                  borderRadius: '8px',
                  color: '#FFF',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="report-btn"
              style={{
                alignSelf: 'flex-start',
                padding: '16px 32px',
                fontSize: '14px'
              }}
            >
              SEND REPORT
            </motion.button>
          </form>
        </div>

        {/* Right Column: Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ContactCard
            label="COMMS"
            value="rdvprasad36@gmail.com"
            href="mailto:rdvprasad36@gmail.com"
            icon={<span style={{ fontSize: '24px' }}>📧</span>}
          />
          <ContactCard
            label="SATELLITE"
            value="@rdv-prasad"
            href="https://github.com/Rdvprasad36"
            icon={<span style={{ fontSize: '24px' }}>🐙</span>}
          />
          <ContactCard
            label="IDENTITY"
value="Durga Venkata Prasad Rapeti"
href="https://www.linkedin.com/in/durga-venkata-prasad-rapeti"
            icon={<span style={{ fontSize: '24px' }}>🔗</span>}
          />
        </div>
      </div>
    </motion.div>
  );
}
