import type { Incident } from '../types/incident';

const API_BASE = 'http://localhost:7094/api/incidents';

export const getAllIncidents = async (): Promise<Incident[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch incidents');
  return await res.json() as Incident[];
};

// Create a new incident
export const createIncident = async (incident: Partial<Incident>): Promise<Incident> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incident)
  });
  if (!res.ok) throw new Error('Failed to create incident');
  return await res.json() as Incident;
};

// Update an existing incident
export const updateIncident = async (id: number, incident: Partial<Incident>): Promise<Incident> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incident)
  });
  if (!res.ok) throw new Error('Failed to update incident');
  return await res.json() as Incident;
};
export const deleteIncident = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete incident');
};
