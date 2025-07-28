import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Manage from './pages/Manage'; // Importar la nueva página

const API_BASE_URL = 'http://localhost:8000/api/';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [data, setData] = useState({
    pagos: [],
    miembros: [],
    clasesProgramadas: [],
    asistencia: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoints = [
      'pagos/',
      'miembros/',
      'clases-programadas/',
      'asistencia/'
    ];

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`${API_BASE_URL}${endpoint}`).then(res => {
              if (!res.ok) {
                throw new Error(`Failed to fetch ${endpoint}`);
              }
              return res.json();
            })
          )
        );
        const [pagos, miembros, clasesProgramadas, asistencia] = responses;
        setData({ pagos, miembros, clasesProgramadas, asistencia });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'miembros':
        return <Members data={data} loading={loading} error={error} />;
      case 'gestión':
        return <Manage />;
      case 'dashboard':
      default:
        return <Dashboard data={data} loading={loading} error={error} />;
    }
  };

  return (
    <div className="App">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="app-content">
        {renderActiveView()}
      </div>
    </div>
  );
}

export default App;
