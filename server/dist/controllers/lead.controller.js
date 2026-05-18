"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLeadsCsv = exports.deleteLead = exports.updateLead = exports.getLeads = exports.createLead = void 0;
const leadService = __importStar(require("../services/lead.service"));
const ApiError_1 = require("../utils/ApiError");
const json2csv_1 = require("json2csv");
const createLead = async (req, res, next) => {
    try {
        const lead = await leadService.createLead(req.body);
        res.status(201).json({ success: true, data: lead });
    }
    catch (error) {
        next(error);
    }
};
exports.createLead = createLead;
const getLeads = async (req, res, next) => {
    try {
        const result = await leadService.getLeads(req.query);
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        next(error);
    }
};
exports.getLeads = getLeads;
const updateLead = async (req, res, next) => {
    try {
        const lead = await leadService.updateLead(req.params.id, req.body);
        if (!lead)
            return next(new ApiError_1.ApiError(404, 'Lead not found'));
        res.status(200).json({ success: true, data: lead });
    }
    catch (error) {
        next(error);
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res, next) => {
    try {
        const lead = await leadService.deleteLead(req.params.id);
        if (!lead)
            return next(new ApiError_1.ApiError(404, 'Lead not found'));
        res.status(200).json({ success: true, message: 'Lead removed' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteLead = deleteLead;
const exportLeadsCsv = async (req, res, next) => {
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
        const json2csvParser = new json2csv_1.Parser();
        const csv = json2csvParser.parse(leadsData);
        res.header('Content-Type', 'text/csv');
        res.attachment('leads-export.csv');
        res.send(csv);
    }
    catch (error) {
        next(error);
    }
};
exports.exportLeadsCsv = exportLeadsCsv;
