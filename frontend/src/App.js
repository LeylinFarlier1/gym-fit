import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api/';

function App() {
  const [activeView, setActiveView] = useState('miembros');
  const [data, setData] = useState({
    miembros: [],
    planesMembresia: [],
    suscripciones: [],
    rolesPersonal: [],
    personal: [],
    horariosPersonal: [],
    clases: [],
    clasesProgramadas: [],
    asistencia: [],
    pagos: [],
    categoriasGasto: [],
    gastos: [],
    metasMiembro: [],
    logsEntrenamiento: [],
    feedbackMiembro: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoints = {
      miembros: 'miembros/',
      planesMembresia: 'planes-membresia/',
      suscripciones: 'suscripciones-miembro/',
      rolesPersonal: 'roles-personal/',
      personal: 'personal/',
      horariosPersonal: 'horarios-personal/',
      clases: 'clases/',
      clasesProgramadas: 'clases-programadas/',
      asistencia: 'asistencia/',
      pagos: 'pagos/',
      categoriasGasto: 'categorias-gasto/',
      gastos: 'gastos/',
      metasMiembro: 'metas-miembro/',
      logsEntrenamiento: 'logs-entrenamiento/',
      feedbackMiembro: 'feedback-miembro/',
    };

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          Object.entries(endpoints).map(([key, endpoint]) =>
            fetch(`${API_BASE_URL}${endpoint}`).then(res => res.json())
          )
        );
        const newData = Object.keys(endpoints).reduce((acc, key, index) => {
          acc[key] = responses[index];
          return acc;
        }, {});
        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const currentData = data[activeView];

    if (!currentData || currentData.length === 0) {
      return <p>No hay datos para mostrar.</p>;
    }

    const headers = Object.keys(currentData[0] || {});

    return (
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <nav>
        {Object.keys(data).map(view => (
          <button key={view} onClick={() => setActiveView(view)}>
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </nav>
      <header className="App-header">
        <h1>Gestión del Gimnasio</h1>
        <h2>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
        {renderContent()}
      </header>
    </div>
  );
}

export default App;
