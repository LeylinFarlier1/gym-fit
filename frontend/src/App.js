import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api/';

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, changeType }) => (
  <div className="metric-card">
    <h3 className="title">{title}</h3>
    <p className="value">{value}</p>
    {change && (
      <p className={`change ${changeType === 'positive' ? 'positive' : 'negative'}`}>
        {change}
      </p>
    )}
  </div>
);

function App() {
  const [data, setData] = useState({
    pagos: [],
    miembros: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    ingresosMes: 0,
    miembrosActivos: 0,
    ocupacionHoy: '85%', // Static as per guide
    nuevosMiembros: 0,
    miembrosEnRiesgo: 14, // Static as per guide
  });

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

  useEffect(() => {
    if (!loading && !error) {
      // Calculate Ingresos del Mes
      const unMesAtras = new Date();
      unMesAtras.setMonth(unMesAtras.getMonth() - 1);
      const ingresos = data.pagos
        .filter(pago => new Date(pago.fecha_pago) > unMesAtras)
        .reduce((sum, pago) => sum + parseFloat(pago.monto), 0);

      // Calculate Miembros Activos
      const activos = data.miembros.filter(m => m.estado === 'activo').length;
      
      // Calculate Nuevos Miembros este mes
       const nuevos = data.miembros.filter(m => new Date(m.fecha_registro) > unMesAtras).length;


      setMetrics(prevMetrics => ({
        ...prevMetrics,
        ingresosMes: ingresos,
        miembrosActivos: activos,
        nuevosMiembros: nuevos,
      }));
    }
  }, [data, loading, error]);

  if (loading) {
    return <div className="loading-state">Cargando dashboard...</div>;
  }

  if (error) {
    return <div className="error-state">Error al cargar los datos: {error}</div>;
  }

  return (
    <div className="App">
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <h2 className="page-subtitle">Una vista general de la salud de tu gimnasio.</h2>
        </header>
        <div className="dashboard-grid">
          <MetricCard 
            title="Ingresos (Últimos 30 días)" 
            value={`$${metrics.ingresosMes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <MetricCard 
            title="Miembros Activos" 
            value={metrics.miembrosActivos}
          />
          <MetricCard 
            title="Ocupación de Clases (Hoy)" 
            value={metrics.ocupacionHoy} 
          />
           <MetricCard 
            title="Nuevos Miembros (Últimos 30 días)" 
            value={metrics.nuevosMiembros}
          />
          <MetricCard 
            title="Miembros en Riesgo" 
            value={metrics.miembrosEnRiesgo} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
