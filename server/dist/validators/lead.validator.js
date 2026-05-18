"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadValidator = exports.createLeadValidator = void 0;
const zod_1 = require("zod");
const lead_interface_1 = require("../interfaces/lead.interface");
exports.createLeadValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string().email('Invalid email format'),
        status: zod_1.z.nativeEnum(lead_interface_1.LeadStatus).optional(),
        source: zod_1.z.nativeEnum(lead_interface_1.LeadSource),
    }),
});
exports.updateLeadValidator = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        email: zod_1.z.string().email().optional(),
        status: zod_1.z.nativeEnum(lead_interface_1.LeadStatus).optional(),
        source: zod_1.z.nativeEnum(lead_interface_1.LeadSource).optional(),
    }),
});
