import React from 'react';
import './Dashboard.css'; // Usaremos un css específico si es necesario en el futuro

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

const Dashboard = ({ data, loading, error }) => {
  if (loading) {
    return <div className="loading-state">Cargando dashboard...</div>;
  }

  if (error) {
    return <div className="error-state">Error al cargar los datos: {error}</div>;
  }
  
  // Calculations
  const unMesAtras = new Date();
  unMesAtras.setMonth(unMesAtras.getMonth() - 1);

  const ingresos = data.pagos
    .filter(pago => new Date(pago.fecha_pago) > unMesAtras)
    .reduce((sum, pago) => sum + parseFloat(pago.monto), 0);

  const activos = data.miembros.filter(m => m.estado === 'activo').length;
  const nuevos = data.miembros.filter(m => new Date(m.fecha_registro) > unMesAtras).length;

  const metrics = {
    ingresosMes: ingresos,
    miembrosActivos: activos,
    ocupacionHoy: '85%', // Static as per guide
    nuevosMiembros: nuevos,
    miembrosEnRiesgo: 14, // Static as per guide
  };

  return (
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
  );
};

export default Dashboard;
