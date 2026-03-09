const API_URL = 'http://localhost:5000/api';

const fetchWithAuth = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': token || '',
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export const api = {
  getProfile: () => fetchWithAuth('/dashboard/me'),
  getOrganizations: (category?: string) => fetchWithAuth(`/dashboard/organizations${category ? `?category=${category}` : ''}`),
  getDonations: () => fetchWithAuth('/dashboard/donations'),
  getVolunteerActivities: () => fetchWithAuth('/dashboard/volunteer'),
  getShelterRequests: () => fetchWithAuth('/dashboard/shelter-requests'),
  submitShelterRequest: (data: any) => fetchWithAuth('/dashboard/shelter-request', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getNotifications: () => fetchWithAuth('/dashboard/notifications'),
  login: (credentials: any) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then(res => res.json()),
  signup: (userData: any) => fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(res => res.json()),
};
