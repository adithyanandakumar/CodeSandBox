import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = ({ isAuthenticated, userId }) => {
  const [savedSandboxes, setSavedSandboxes] = useState([]);

  useEffect(() => {
    const fetchSavedSandboxes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sandbox/${userId}`);
        setSavedSandboxes(response.data);
      } catch (error) {
        console.error('Error fetching saved sandboxes:', error);
      }
    };

    if (isAuthenticated) {
      fetchSavedSandboxes();
    }
  }, [isAuthenticated, userId]);

  return (
    <div className="home-container">
      <h2>Home</h2>
      <p className="home-message">
        {isAuthenticated ? 'You are logged in!' : 'Please login or signup to continue.'}
      </p>
      {!isAuthenticated && (
        <p>
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
        </p>
      )}
      <h3>Saved Sandboxes</h3>
      <ul>
        {savedSandboxes.map(sandbox => (
          <li key={sandbox._id}>
            <div className="code-snippet">
              <div className="code-label">Code:</div>
              <pre className="code">{sandbox.code}</pre>
            </div>
            <div className="output-snippet">
              <div className="output-label">Output:</div>
              <pre className="output">{sandbox.output}</pre>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
