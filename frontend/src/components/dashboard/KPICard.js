import React from 'react';
import { Card } from '../ui/Card';
import './KPICard.css';

export const KPICard = ({ title, value, icon, trend, status }) => (
  <Card>
    <div className="kpi-header">
      <div className="kpi-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
    <p className="kpi-value">{value}</p>
    {trend && <span className={`kpi-trend ${status}`}>{trend}</span>}
  </Card>
);
