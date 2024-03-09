import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreatePost from './pages/createpost';
import Authenticate from './pages/authenticate';

const App = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/" element={<Authenticate />} />
    </Routes>
  </Router>
);

export default App;
