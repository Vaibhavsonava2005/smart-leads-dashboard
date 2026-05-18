import { Request, Response, NextFunction } from 'express';
import * as leadService from '../services/lead.service';
import { ApiError } from '../utils/ApiError';
import { Parser } from 'json2csv';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await leadService.getLeads(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await leadService.updateLead(req.params.id as string, req.body);
    if (!lead) return next(new ApiError(404, 'Lead not found'));
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await leadService.deleteLead(req.params.id as string);
    if (!lead) return next(new ApiError(404, 'Lead not found'));
    res.status(200).json({ success: true, message: 'Lead removed' });
  } catch (error) {
    next(error);
  }
};

export const exportLeadsCsv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await leadService.getAllLeadsForExport();
    
    // Convert documents to plain objects
    const leadsData = leads.map(lead => ({
      ID: lead._id.toString(),
      Name: lead.name,
      Email: lead.email,
      Status: lead.status,
      Source: lead.source,
      CreatedAt: lead.createdAt.toISOString()
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(leadsData);

    res.header('Content-Type', 'text/csv');
    res.attachment('leads-export.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
