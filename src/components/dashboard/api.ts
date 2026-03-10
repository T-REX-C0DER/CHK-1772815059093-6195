const API_BASE = '';

const fetchWithAuth = async (endpoint: string, options: any = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Include cookies
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export const api = {
  // User dashboard
  getUserDashboard: () => fetchWithAuth('/api/dashboard/user'),

  // Organization dashboard
  getOrgDashboard: () => fetchWithAuth('/api/dashboard/organization'),

  // Organizations
  getOrganizations: (category?: string) => fetchWithAuth(`/api/organizations${category ? `?category=${category}` : ''}`),

  // Donations
  getDonations: () => fetchWithAuth('/api/donations'),
  createDonation: (data: any) => fetchWithAuth('/api/donations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Campaigns
  getCampaigns: (category?: string) => fetchWithAuth(`/api/campaigns${category ? `?category=${category}` : ''}`),
  createCampaign: (data: any) => fetchWithAuth('/api/campaigns', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Volunteers
  getVolunteers: () => fetchWithAuth('/api/volunteers'),
  getVolunteerActivities: () => fetchWithAuth('/api/volunteers'),
  applyVolunteer: (organizationId: string) => fetchWithAuth('/api/volunteers', {
    method: 'POST',
    body: JSON.stringify({ organizationId }),
  }),
  updateVolunteerStatus: (volunteerId: string, status: string) => fetchWithAuth('/api/volunteers', {
    method: 'PUT',
    body: JSON.stringify({ volunteerId, status }),
  }),

  // Shelter Requests
  getShelterRequests: () => fetchWithAuth('/api/shelter-requests'),
  submitShelterRequest: (data: any) => fetchWithAuth('/api/shelter-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Notifications
  getNotifications: () => fetchWithAuth('/api/notifications'),

  // Auth
  login: (credentials: any) => fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  }).then(res => res.json()),

  signup: (userData: any) => fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    credentials: 'include',
  }).then(res => res.json()),

  logout: () => fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  }).then(res => res.json()),
};
