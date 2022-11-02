import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageForMentors from './HomePageForMentors';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/LobbyPage" element={<HomePageForMentors />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
