import React, { useState } from 'react';

export default function AuthForm({ auth }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      auth.login(nickname, password);
    } else {
      auth.register(nickname, password);
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    auth.error && auth.setError && auth.setError('');
    auth.success && auth.setSuccess && auth.setSuccess('');
  };

  return (
    <div className="card p-4">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nickname</label>
          <input className="form-control" value={nickname} onChange={e => setNickname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {auth.error && <div className="alert alert-danger">{auth.error}</div>}
        {auth.success && <div className="alert alert-success">{auth.success}</div>}
        <button className="btn btn-primary" type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
        <button type="button" className="btn btn-link" onClick={handleModeSwitch}>
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
} 