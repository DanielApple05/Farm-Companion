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
// import News from './pages/News';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/farms" element={<MyFarms />} />
      <Route path="/crops" element={<Crops />} />
      <Route path="/livestock" element={<Livestock />} />
      <Route path="/diagnose" element={<Diagnose />} />
      <Route path="/advisory" element={<Advisory />} />
      <Route path="/askAIAssistant" element={<Chat />} />
      <Route path="/comingSoon" element={<ComingSoon />} />
      <Route path="/auth" element={<Auth />} />
       {/*  <Route path="/news" element={<News />} /> */}
    </Routes>
  );
}

export default App;

