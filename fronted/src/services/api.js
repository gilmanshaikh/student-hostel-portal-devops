// Direct backend URL (works when backend runs on 5000; backend has CORS enabled)
const BACKEND_API = 'http://localhost:5000/api';
const PROXY_API = '/api';

const configured = import.meta.env.VITE_API_URL?.trim();
export const API_URL =
  configured && configured !== '/api' ? configured : BACKEND_API;

const NETWORK_ERROR =
  'Connection failed. Start both servers with start.bat (backend port 5000 + frontend port 5173).';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return { message: 'Invalid response from server.' };
  }
};

const request = async (path, options = {}, bases = [API_URL, PROXY_API, BACKEND_API]) => {
  const uniqueBases = [...new Set(bases)];
  let lastError = NETWORK_ERROR;

  for (const base of uniqueBases) {
    const url = `${base.replace(/\/$/, '')}${path}`;
    try {
      const response = await fetch(url, options);
      const data = await parseJson(response);
      return { ok: response.ok, data, status: response.status };
    } catch {
      lastError = NETWORK_ERROR;
    }
  }

  return { ok: false, data: { message: lastError }, status: 0 };
};

const uploadRequest = async (path, formData, method = 'POST') => {
  const token = localStorage.getItem('token');
  const headers = { ...(token && { Authorization: `Bearer ${token}` }) };
  const uniqueBases = [...new Set([API_URL, PROXY_API, BACKEND_API])];

  for (const base of uniqueBases) {
    const url = `${base.replace(/\/$/, '')}${path}`;
    try {
      const response = await fetch(url, { method, headers, body: formData });
      return parseJson(response);
    } catch {
      /* try next base */
    }
  }
  return { message: NETWORK_ERROR };
};

// Auth APIs
export const studentRegister = async (body) => {
  const { ok, data } = await request('/auth/student/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Registration failed';
  return data;
};

export const studentLogin = async (body) => {
  const { ok, data } = await request('/auth/student/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Login failed';
  return data;
};

export const adminRegister = async (body) => {
  const { ok, data } = await request('/auth/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Registration failed';
  return data;
};

export const adminLogin = async (body) => {
  const { ok, data } = await request('/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Login failed';
  return data;
};

// Hostel APIs
export const getAllHostels = async () => {
  const { ok, data } = await request('/hostels');
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getHostelById = async (id) => {
  const { ok, data } = await request(`/hostels/${id}`);
  if (!ok || !data?._id) {
    return { error: data?.message || 'Hostel not found' };
  }
  return { hostel: data };
};

export const createHostel = async (formData) => {
  return uploadRequest('/hostels', formData, 'POST');
};

export const getAdminHostels = async () => {
  const { ok, data } = await request('/hostels/admin/my-hostels', {
    headers: getAuthHeaders(),
  });
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const deleteHostel = async (id) => {
  const { ok, data } = await request(`/hostels/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return { ok, data };
};

export const updateHostel = async (id, formData) => {
  const token = localStorage.getItem('token');
  const headers = { ...(token && { Authorization: `Bearer ${token}` }) };
  const uniqueBases = [...new Set([API_URL, PROXY_API, BACKEND_API])];

  for (const base of uniqueBases) {
    try {
      const response = await fetch(`${base.replace(/\/$/, '')}/hostels/${id}`, {
        method: 'PUT',
        headers,
        body: formData,
      });
      const data = await parseJson(response);
      return { ok: response.ok, data };
    } catch {
      /* try next */
    }
  }
  return { ok: false, data: { message: NETWORK_ERROR } };
};

export const deleteHostelImage = async (id, publicId) => {
  const { ok, data } = await request(`/hostels/${id}/image`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    body: JSON.stringify({ publicId }),
  });
  return { ok, data };
};

// Application APIs
export const createApplication = async (applicationData) => {
  const { data } = await request('/applications', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(applicationData),
  });
  return data;
};

export const getStudentApplications = async () => {
  const { ok, data } = await request('/applications/student/my-applications', {
    headers: getAuthHeaders(),
  });
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getAdminApplications = async () => {
  const { ok, data } = await request('/applications/admin/applications', {
    headers: getAuthHeaders(),
  });
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getApplicationById = async (id) => {
  const { ok, data } = await request(`/applications/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!ok || !data?._id) return null;
  return data;
};

export const updateApplicationStatus = async (id, status) => {
  const { data } = await request(`/applications/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  return data;
};

export const deleteApplication = async (id) => {
  const { data } = await request(`/applications/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return data;
};

// Profile APIs
export const getStudentProfile = async () => {
  const { data } = await request('/auth/student/profile', {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateStudentProfile = async (body) => {
  const { data } = await request('/auth/student/profile', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return data;
};

export const getAdminProfile = async () => {
  const { data } = await request('/auth/admin/profile', {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateAdminProfile = async (body) => {
  const { data } = await request('/auth/admin/profile', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return data;
};
