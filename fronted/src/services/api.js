export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const NETWORK_ERROR =
  'Cannot reach the server. Run start.bat or: cd backend → npm run dev (port 5000).';

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

const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await parseJson(response);
    return { ok: response.ok, data, status: response.status };
  } catch {
    return { ok: false, data: { message: NETWORK_ERROR }, status: 0 };
  }
};

// Auth APIs
export const studentRegister = async (body) => {
  const { ok, data } = await request(`${API_URL}/auth/student/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Registration failed';
  return data;
};

export const studentLogin = async (body) => {
  const { ok, data } = await request(`${API_URL}/auth/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Login failed';
  return data;
};

export const adminRegister = async (body) => {
  const { ok, data } = await request(`${API_URL}/auth/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Registration failed';
  return data;
};

export const adminLogin = async (body) => {
  const { ok, data } = await request(`${API_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!ok && !data.message) data.message = 'Login failed';
  return data;
};

// Hostel APIs
export const getAllHostels = async () => {
  const { ok, data } = await request(`${API_URL}/hostels`);
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getHostelById = async (id) => {
  const { ok, data } = await request(`${API_URL}/hostels/${id}`);
  if (!ok || !data?._id) {
    return { error: data?.message || 'Hostel not found' };
  }
  return { hostel: data };
};

export const createHostel = async (formData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/hostels`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });
    return parseJson(response);
  } catch {
    return { message: NETWORK_ERROR };
  }
};

// Application APIs
export const createApplication = async (applicationData) => {
  const { data } = await request(`${API_URL}/applications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(applicationData),
  });
  return data;
};

export const getStudentApplications = async () => {
  const { ok, data } = await request(`${API_URL}/applications/student/my-applications`, {
    headers: getAuthHeaders(),
  });
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getAdminApplications = async () => {
  const { ok, data } = await request(`${API_URL}/applications/admin/applications`, {
    headers: getAuthHeaders(),
  });
  if (!ok || !Array.isArray(data)) return [];
  return data;
};

export const getApplicationById = async (id) => {
  const { data } = await request(`${API_URL}/applications/${id}`, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateApplicationStatus = async (id, status) => {
  const { data } = await request(`${API_URL}/applications/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  return data;
};

export const deleteApplication = async (id) => {
  const { data } = await request(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return data;
};

// Profile APIs
export const getStudentProfile = async () => {
  const { data } = await request(`${API_URL}/auth/student/profile`, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateStudentProfile = async (body) => {
  const { data } = await request(`${API_URL}/auth/student/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return data;
};

export const getAdminProfile = async () => {
  const { data } = await request(`${API_URL}/auth/admin/profile`, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateAdminProfile = async (body) => {
  const { data } = await request(`${API_URL}/auth/admin/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  return data;
};
