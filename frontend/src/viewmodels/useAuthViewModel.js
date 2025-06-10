import { useState } from 'react';
import * as authService from '../services/authService';

export default function useAuthViewModel() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const register = async (nickname, password) => {
    try {
      const res = await authService.register(nickname, password);
      setUser(res);
      setSuccess('Account created successfully! You can now log in.');
      setError('');
    } catch (e) {
      if (e.message.includes('409')) {
        setError('Nickname already exists. Please choose another.');
      } else {
        setError(e.message);
      }
      setSuccess('');
    }
  };

  const login = async (nickname, password) => {
    try {
      const res = await authService.login(nickname, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('token', res.token);
      setError('');
      setSuccess('');
    } catch (e) {
      setError('Invalid nickname or password.');
      setSuccess('');
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    setError('');
    setSuccess('');
  };

  return { user, token, error, success, register, login, logout };
} 