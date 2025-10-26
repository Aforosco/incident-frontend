// src/services/incidentService.ts
import type { Incident, PaginatedIncidents } from '../types/incident';

const API_BASE = 'https://localhost:7094/api/incidents';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const getAllIncidents = async (page: number = 1): Promise<PaginatedIncidents> => {
  try {
    const res = await fetch(`${API_BASE}?page=${page}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to fetch incidents: ${res.status}`);
    }
    
    return await res.json() as PaginatedIncidents;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// ... rest of your service methods
// ✅ Create a new incident (requires auth)
export const createIncident = async (incident: Partial<Incident>): Promise<Incident> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(incident),
  });
  if (!res.ok) throw new Error('Failed to create incident');
  return await res.json() as Incident;
};


// In incidentService.ts

export const updateIncident = async (id: number, incident: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(incident),
  });

  if (!response.ok) {
    throw new Error("Failed to update incident");
  }

  // Backend returns 204 No Content, so don't try to parse JSON
  // Just return a success indicator or the incident data passed in
  return { success: true };
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
