import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Sandbox from './components/Sandbox';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); 

  const handleLoginSuccess = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
            {!isAuthenticated && <li><Link to="/signup">Signup</Link></li>}
            {isAuthenticated && <li><Link to="/sandbox/javascript">Sandbox</Link></li>}
            {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup onSignupSuccess={handleSignupSuccess} />} />
          <Route path="/sandbox/javascript" element={isAuthenticated ? <Sandbox userId={userId} /> : <Login />} />
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
