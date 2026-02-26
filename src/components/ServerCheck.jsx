import { useState, useEffect, useCallback } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ServerCheck({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  const check = useCallback(() => {
    setStatus('checking');
    fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(5000) })
      .then((res) => (res.ok ? setStatus('online') : setStatus('offline')))
      .catch(() => setStatus('offline'));
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  if (status === 'checking') {
    return (
      <div className="server-screen">
        <div className="server-screen__card">
          <div className="server-spinner" aria-hidden="true" />
          <h2>Connecting to server...</h2>
          <p>Please wait</p>
        </div>
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className="server-screen">
        <div className="server-screen__card server-screen__card--offline">
          <div className="server-icon" aria-hidden="true">⚡</div>
          <h2>Server Offline</h2>
          <p>Could not connect to the backend server at <code>{BASE_URL}</code>.</p>
          <p>Make sure the server is running, then try again.</p>
          <button className="btn btn--primary" onClick={check}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return children;
}
