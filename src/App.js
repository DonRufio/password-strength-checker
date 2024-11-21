import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

function App() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);

    const feedback = zxcvbn(password);
    setResult(feedback);
  };

  return (
    <div className="password-checker">
      <input type="password" value={password} onChange={handlePasswordChange} />
      {result && (
        <div>
          <p>Strength: {result.score}</p>
          <p>Estimated Cracking Time:</p>
          <ul>
            <li>Offline, slow hashing: {result.crack_times_display.offline_slow_hashing_1e4_per_second}</li>
            <li>Offline, fast hashing: {result.crack_times_display.offline_fast_hashing_1e10_per_second}</li>
            <li>Online cracking: {result.crack_times_display.online_no_throttling_100_per_second}</li>
          </ul>
          {/* Other feedback and suggestions */}
        </div>
      )}
    </div>
  );
}

export default App;