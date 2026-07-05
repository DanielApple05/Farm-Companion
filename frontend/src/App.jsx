import React from 'react';
import Dashboard from './pages/dashboard';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

