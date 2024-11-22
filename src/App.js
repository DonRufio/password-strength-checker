import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const checkStrength = (password) => {
    const analysis = zxcvbn(password);
    setResult(analysis);
  };

  const getScoreClass = (score) => {
    const classes = ['very-weak', 'weak', 'fair', 'strong', 'very-strong'];
    return classes[score] || 'very-weak';
  };

  const getScoreText = (score) => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    return texts[score] || texts[0];
  };

  return (
    <div className="App" style={{ width: '300px', padding: '20px' }}>
      <h1>Password Strength Checker</h1>
      
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          checkStrength(e.target.value);
        }}
        placeholder="Enter password to check"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      {result && (
        <div>
          <div className={`feedback-box ${getScoreClass(result.score)}`}
>
              Strength: {getScoreText(result.score)}
          </div>


          {result.feedback.warning && (
            <div style={{ color: '#ff4444', marginBottom: '10px' }}>
              Warning: {result.feedback.warning}
            </div>
          )}

          {result.feedback.suggestions?.map((suggestion, index) => (
            <div key={index} style={{ fontSize: '0.9em', marginBottom: '5px' }}>
              • {suggestion}
            </div>
          ))}

          <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
            Time to crack: {result.crack_times_display.offline_slow_hashing_1e4_per_second}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;