const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Auth APIs
export const studentRegister = async (data) => {
  const response = await fetch(`${API_URL}/auth/student/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const studentLogin = async (data) => {
  const response = await fetch(`${API_URL}/auth/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const adminRegister = async (data) => {
  const response = await fetch(`${API_URL}/auth/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const adminLogin = async (data) => {
  const response = await fetch(`${API_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

// Hostel APIs
export const getAllHostels = async () => {
  const response = await fetch(`${API_URL}/hostels`);
  return response.json();
};

export const getHostelById = async (id) => {
  const response = await fetch(`${API_URL}/hostels/${id}`);
  return response.json();
};

export const createHostel = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/hostels`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: formData
  });
  return response.json();
};

// Application APIs
export const createApplication = async (applicationData) => {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(applicationData)
  });
  return response.json();
};

export const getStudentApplications = async () => {
  const response = await fetch(`${API_URL}/applications/student/my-applications`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const getAdminApplications = async () => {
  const response = await fetch(`${API_URL}/applications/admin/applications`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const getApplicationById = async (id) => {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const updateApplicationStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/applications/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return response.json();
};

export const deleteApplication = async (id) => {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// Profile APIs
export const getStudentProfile = async () => {
  const response = await fetch(`${API_URL}/auth/student/profile`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const updateStudentProfile = async (data) => {
  const response = await fetch(`${API_URL}/auth/student/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getAdminProfile = async () => {
  const response = await fetch(`${API_URL}/auth/admin/profile`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

export const updateAdminProfile = async (data) => {
  const response = await fetch(`${API_URL}/auth/admin/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
};
