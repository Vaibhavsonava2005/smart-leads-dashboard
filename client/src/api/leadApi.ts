import api from './axios';
import type { LeadsResponse, Lead } from '../types/lead.types';

export const fetchLeads = async (params: any): Promise<LeadsResponse> => {
  const response = await api.get('/leads', { params });
  return response.data;
};

export const createLead = async (data: Partial<Lead>) => {
  const response = await api.post('/leads', data);
  return response.data;
};

export const updateLead = async (id: string, data: Partial<Lead>) => {
  const response = await api.put(`/leads/${id}`, data);
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

export const exportCsv = async () => {
  const response = await api.get('/leads/export', { responseType: 'blob' });
  
  // Trigger download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'leads-export.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};
