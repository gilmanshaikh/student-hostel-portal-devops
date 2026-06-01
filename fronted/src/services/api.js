export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

const NETWORK_ERROR =
  'Connection failed — run start.bat and keep the terminal open. Backend must show "MongoDB connected".';

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

const request = async (path, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${path}`, options);
    const data = await parseJson(response);
    return { ok: response.ok, data, status: response.status };
  } catch {
    return { ok: false, data: { message: NETWORK_ERROR }, status: 0 };
  }
};

const uploadRequest = async (path, formData, method = 'POST') => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });
    return parseJson(response);
  } catch {
    return { message: NETWORK_ERROR };
  }
};

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

export const getAllHostels = async () => {
  const { ok, data } = await request('/hostels');
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getHostelById = async (id) => {
  const { ok, data } = await request(`/hostels/${id}`);
  if (!ok || !data?._id) return { error: data?.message || 'Hostel not found' };
  return { hostel: data };
};

export const createHostel = async (formData) => uploadRequest('/hostels', formData, 'POST');

export const getAdminHostels = async () => {
  const { ok, data } = await request('/hostels/admin/my-hostels', { headers: getAuthHeaders() });
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const deleteHostel = async (id) => {
  const { ok, data } = await request(`/hostels/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
  return { ok, data };
};

export const updateHostel = async (id, formData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/hostels/${id}`, {
      method: 'PUT',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });
    const data = await parseJson(response);
    return { ok: response.ok, data };
  } catch {
    return { ok: false, data: { message: NETWORK_ERROR } };
  }
};

export const deleteHostelImage = async (id, publicId) => {
  const { ok, data } = await request(`/hostels/${id}/image`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    body: JSON.stringify({ publicId }),
  });
  return { ok, data };
};

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
  const { ok, data } = await request(`/applications/${id}`, { headers: getAuthHeaders() });
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
  const { data } = await request(`/applications/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
  return data;
};

export const getStudentProfile = async () => {
  const { data } = await request('/auth/student/profile', { headers: getAuthHeaders() });
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
  const { data } = await request('/auth/admin/profile', { headers: getAuthHeaders() });
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
