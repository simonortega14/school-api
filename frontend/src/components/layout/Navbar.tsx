import React from 'react';

interface NavbarProps {
  onNavigate: (section: 'alumnos' | 'materias' | 'notas') => void;
  currentSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentSection }) => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>School API</h1>
      <div style={styles.menu}>
        <button
          style={currentSection === 'alumnos' ? styles.activeButton : styles.button}
          onClick={() => onNavigate('alumnos')}
        >
          Alumnos
        </button>
        <button
          style={currentSection === 'materias' ? styles.activeButton : styles.button}
          onClick={() => onNavigate('materias')}
        >
          Materias
        </button>
        <button
          style={currentSection === 'notas' ? styles.activeButton : styles.button}
          onClick={() => onNavigate('notas')}
        >
          Notas
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
  },
  menu: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid transparent',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s',
  },
  activeButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};