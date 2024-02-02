import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Sandbox from './components/Sandbox';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Add userId state

  const handleLoginSuccess = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
    console.log(userId)
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/sandbox/javascript">Sandbox</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup onSignupSuccess={handleSignupSuccess} />} />
          {/* Pass userId as a prop to Sandbox component */}
          <Route path="/sandbox/javascript" element={<Sandbox userId={userId} />} />
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
