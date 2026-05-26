'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = '/50points/api';

  const fetchUser = useCallback(async (authToken) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return data.user;
      }
      localStorage.removeItem('50points_token');
      setToken(null);
      setUser(null);
      return null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('50points_token');
    if (stored) {
      setToken(stored);
      fetchUser(stored).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const login = async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem('50points_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (username, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem('50points_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const playAsGuest = async () => {
    const res = await fetch(`${API_BASE}/auth/guest`, {
      method: 'POST',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem('50points_token', data.token);
    localStorage.setItem('50points_guest_token', data.guestToken);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('50points_token');
    localStorage.removeItem('50points_guest_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      playAsGuest,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
