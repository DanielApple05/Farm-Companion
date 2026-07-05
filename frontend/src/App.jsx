import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import MyFarms from './pages/myFarm';
import Crops from './pages/crops';
import Livestock from './pages/livestock'; 
import Diagnose from './pages/diagnose';
// import Advisory from './pages/Advisory';
// import Chat from './pages/Chat';
// import News from './pages/News';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/farms" element={<MyFarms />} />
      <Route path="/crops" element={<Crops />} />
      <Route path="/livestock" element={<Livestock />} />
       <Route path="/diagnose" element={<Diagnose />} />
     {/* <Route path="/advisory" element={<Advisory />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/news" element={<News />} /> */}
    </Routes>
  );
}

export default App;

