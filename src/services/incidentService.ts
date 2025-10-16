// src/services/incidentService.ts
import type { Incident } from '../types/incident';

const API_BASE = 'https://localhost:7094/api/incidents';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// src/services/incidentService.ts
export const getAllIncidents = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch incidents: ${response.status}`);
  }

  const data = await response.json();
  // Ensure data is always an array
  return Array.isArray(data) ? data : [];
};


export const getIncident = async (id: number): Promise<Incident> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch incident');
  return await res.json() as Incident;
};

export const createIncident = async (incident: Partial<Incident>): Promise<Incident> => {
  try {
    console.log('Creating incident with data:', incident);
    console.log('Headers:', getAuthHeaders());
    
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(incident)
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response:', errorText);
      console.error('Status Code:', res.status);
      throw new Error(`Failed to create incident: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    console.log('Incident created successfully:', data);
    return data as Incident;
  } catch (error) {
    console.error('Create incident error:', error);
    throw error;
  }
};

export const updateIncident = async (id: number, incident: Partial<Incident>): Promise<Incident> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(incident)
  });
  if (!res.ok) throw new Error('Failed to update incident');
  return await res.json() as Incident;
};

export const deleteIncident = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`, { 
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete incident');
};

export const getStats = async () => {
  const res = await fetch(`${API_BASE}/stats`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return await res.json();
};