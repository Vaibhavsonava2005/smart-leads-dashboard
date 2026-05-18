"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = require("../controllers/lead.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const lead_validator_1 = require("../validators/lead.validator");
const auth_interface_1 = require("../interfaces/auth.interface");
const router = (0, express_1.Router)();
// All lead routes require authentication
router.use(auth_middleware_1.protect);
router.route('/')
    .post((0, role_middleware_1.authorizeRoles)(auth_interface_1.UserRole.ADMIN, auth_interface_1.UserRole.SALES), (0, validate_middleware_1.validate)(lead_validator_1.createLeadValidator), lead_controller_1.createLead)
    .get((0, role_middleware_1.authorizeRoles)(auth_interface_1.UserRole.ADMIN, auth_interface_1.UserRole.SALES), lead_controller_1.getLeads);
router.route('/export')
    .get((0, role_middleware_1.authorizeRoles)(auth_interface_1.UserRole.ADMIN, auth_interface_1.UserRole.SALES), lead_controller_1.exportLeadsCsv);
router.route('/:id')
    // Sales can update leads, Admin can update leads
    .put((0, role_middleware_1.authorizeRoles)(auth_interface_1.UserRole.ADMIN, auth_interface_1.UserRole.SALES), (0, validate_middleware_1.validate)(lead_validator_1.updateLeadValidator), lead_controller_1.updateLead)
    // ONLY Admin can delete leads
    .delete((0, role_middleware_1.authorizeRoles)(auth_interface_1.UserRole.ADMIN), lead_controller_1.deleteLead);
exports.default = router;
