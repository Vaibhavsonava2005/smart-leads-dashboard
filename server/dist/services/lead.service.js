"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLeadsForExport = exports.deleteLead = exports.updateLead = exports.getLeads = exports.createLead = void 0;
const lead_model_1 = require("../models/lead.model");
const createLead = async (data) => {
    return await lead_model_1.Lead.create(data);
};
exports.createLead = createLead;
const getLeads = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    // Dynamic Query Building
    const filter = {};
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
    const leads = await lead_model_1.Lead.find(filter)
        .sort({ createdAt: sortDirection })
        .skip(skip)
        .limit(limit);
    const totalLeads = await lead_model_1.Lead.countDocuments(filter);
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
exports.getLeads = getLeads;
const updateLead = async (id, data) => {
    return await lead_model_1.Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};
exports.updateLead = updateLead;
const deleteLead = async (id) => {
    return await lead_model_1.Lead.findByIdAndDelete(id);
};
exports.deleteLead = deleteLead;
const getAllLeadsForExport = async () => {
    return await lead_model_1.Lead.find({}).sort({ createdAt: -1 });
};
exports.getAllLeadsForExport = getAllLeadsForExport;
