// /src/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // Your Express server

export const getProfiles = () => axios.get(`${API_BASE}/profiles`);

export const getProfileById = (id) => axios.get(`${API_BASE}/profiles/${id}`);

export const createProfile = (profile) => axios.post(`${API_BASE}/profiles`, profile);

export const updateProfile = (id, profile) => axios.post(`${API_BASE}/profiles/${id}`, profile);

export const deleteProfile = (id) => axios.delete(`${API_BASE}/profiles/${id}`);
