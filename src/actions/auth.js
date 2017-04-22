import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

const API_URL = 'http://localhost:3000';

export function fetchCurrentUser() {
  return Promise.resolve()
    .then(() => fetch(`${API_URL}/users/me`, {
      credentials: 'include'
    }))
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      else {
        throw new Error('Failed to fetch current user');
      }
    });
}

export function login(email, password) {
  return Promise.resolve()
    .then(() => fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { Authorization: `Basic ${btoa(`${email}:${password}`)}` }
    }))
    .then(res => {
      if (res.status === 200) {
        return;
      }
      else if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      else {
        throw new Error('Failed to login');
      }
    });
}

export function logout() {
  return Promise.resolve()
    .then(() => fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }))
    .then(res => {
      if (res.status === 200) {
        return;
      }
      throw new Error('Failed to logout');
    });
}

export function createUser(email, password) {
  return Promise.resolve()
    .then(() => fetch(`${API_URL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }))
    .then(res => {
      if (res.status === 200) {
        return;
      }
      throw new Error('Failed to create user');
    });
}
