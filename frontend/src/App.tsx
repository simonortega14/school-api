import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { AlumnosPage } from './components/alumnos/AlumnosPage';
import { MateriasPage } from './components/materias/MateriasPage';
import { NotasPage } from './components/notas/NotasPage';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState<'alumnos' | 'materias' | 'notas'>('alumnos');

  const handleNavigate = (section: 'alumnos' | 'materias' | 'notas') => {
    setCurrentSection(section);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} currentSection={currentSection} />
      
      <main style={{ padding: '2rem' }}>
        {currentSection === 'alumnos' && <AlumnosPage />}
        {currentSection === 'materias' && <MateriasPage />}
        {currentSection === 'notas' && <NotasPage />}
      </main>
    </div>
  );
}

export default App;