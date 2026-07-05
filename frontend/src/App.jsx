import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import MyFarms from './pages/myFarm';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/farms" element={<MyFarms />} />
    </Routes>
  );
}

export default App;

