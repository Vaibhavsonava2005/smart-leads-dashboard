import mongoose from 'mongoose';
import { Lead } from '../models/lead.model';
import { ILead } from '../interfaces/lead.interface';

export const createLead = async (data: any) => {
  return await Lead.create(data);
};

export const getLeads = async (query: any) => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  // Dynamic Query Building
  const filter: any = {};

  if (query.status) {
    filter.status = query.status;
  }
  
  if (query.source) {
    filter.source = query.source;
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  // Sorting: latest (desc) vs oldest (asc)
  const sortDirection = query.sort === 'oldest' ? 1 : -1;

  // Execute query with pagination
  const leads = await Lead.find(filter)
    .sort({ createdAt: sortDirection })
    .skip(skip)
    .limit(limit);

  const totalLeads = await Lead.countDocuments(filter);

  return {
    data: leads,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalLeads / limit),
      totalLeads,
      limit,
    },
  };
};

export const updateLead = async (id: string, data: any) => {
  return await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteLead = async (id: string) => {
  return await Lead.findByIdAndDelete(id);
};

export const getAllLeadsForExport = async () => {
  return await Lead.find({}).sort({ createdAt: -1 });
};
