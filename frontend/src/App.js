
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import MemberListPage from './pages/members/MemberListPage';
import MemberFormPage from './pages/members/MemberFormPage';
import MemberDetailPage from './pages/members/MemberDetailPage';
import SchedulePage from './pages/SchedulePage';
import FinancesPage from './pages/FinancesPage';
// Se eliminaron las importaciones de StaffPage y StyleGuidePage que no se usaban

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Default route redirects to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Nested routes for members module */}
        <Route path="members" element={<MembersPage />}>
          <Route index element={<MemberListPage />} />
          <Route path="new" element={<MemberFormPage />} />
          <Route path=":id" element={<MemberDetailPage />} />
          <Route path=":id/edit" element={<MemberFormPage />} />
        </Route>

        <Route path="schedule" element={<SchedulePage />} />
        <Route path="finances" element={<FinancesPage />} />
        
        {/* Las rutas para Staff y StyleGuide se pueden añadir aquí cuando se implementen */}
        {/* <Route path="staff" element={<StaffPage />} /> */}
        {/* <Route path="style-guide" element={<StyleGuidePage />} /> */}

        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Route>
    </Routes>
  );
}
export default App;
