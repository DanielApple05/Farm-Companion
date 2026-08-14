import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import MyFarms from './pages/myFarm';
import Crops from './pages/crops';
import Livestock from './pages/livestock';
import Diagnose from './pages/diagnose';
import Advisory from './pages/advisory';
import Chat from './pages/askAIAssistant';
import ComingSoon from './pages/comingSoon';
import Auth from './pages/auth';
import FarmDetail from './pages/farmDetails';
import News from './pages/news';
import CropDetail from './pages/cropDetail';
import LivestockDetail from './pages/livestockDetail';
import ProtectedRoute from './components/protectRoutes';
import FarmHistory from './pages/farmHistory';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/farms" element={<MyFarms />} />
        <Route path="/farms/:id" element={<FarmDetail />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/crops/:id" element={<CropDetail />} />
        <Route path="/livestock" element={<Livestock />} />
        <Route path="/livestock/:id" element={<LivestockDetail />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/askAIAssistant" element={<Chat />} />
        <Route path="/news" element={<News />} />
        <Route path="/comingSoon" element={<ComingSoon />} />
        <Route path="/history" element={<FarmHistory />} />
      </Route>
    </Routes>
  );
};

export default App;

