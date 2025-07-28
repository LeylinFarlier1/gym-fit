import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KPICard } from '../components/dashboard/KPICard';
import { QuickAction } from '../components/dashboard/QuickAction';
import { Card } from '../components/ui/Card';
import { Activity, Users, DollarSign, UserPlus, Calendar, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const revenueData = [
    { month: 'Ene', ingresos: 12000, gastos: 8000 },
    { month: 'Feb', ingresos: 15000, gastos: 9000 },
    { month: 'Mar', ingresos: 14000, gastos: 8500 },
    { month: 'Abr', ingresos: 17000, gastos: 10000 },
    { month: 'May', ingresos: 18000, gastos: 11000 },
    { month: 'Jun', ingresos: 21000, gastos: 12000 },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="kpi-grid">
        <KPICard 
          title="Miembros Activos" 
          value="142" 
          icon={<Users size={22} />}
          trend="+5 desde el mes pasado"
          status="success"
        />
        <KPICard 
          title="Ingresos (Este Mes)" 
          value="$21,000" 
          icon={<DollarSign size={22} />}
          trend="+15% vs mes anterior"
          status="success"
        />
        <KPICard 
          title="Pagos Pendientes" 
          value="12" 
          icon={<CreditCard size={22} />}
          trend="Revisar urgentemente"
          status="warning"
        />
        <KPICard 
          title="Clases Hoy" 
          value="8" 
          icon={<Activity size={22} />}
        />
      </div>

      <div className="page-section">
        <h2>Acciones Rápidas</h2>
        <div className="quick-actions-grid">
          <QuickAction 
            icon={<UserPlus size={28} />} 
            label="Registrar Miembro" 
            onClick={() => navigate('/members/new')} 
          />
          <QuickAction 
            icon={<Calendar size={28} />} 
            label="Programar Clase" 
            onClick={() => navigate('/schedule')} 
          />
          <QuickAction 
            icon={<CreditCard size={28} />} 
            label="Registrar Pago" 
            onClick={() => navigate('/finances')} 
          />
        </div>
      </div>

      <div className="page-section">
        <h2>Rendimiento Financiero</h2>
        <Card>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="var(--action-primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="gastos" stroke="var(--brand-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
export default DashboardPage;
