import { Router } from 'express';
import { createLead, getLeads, updateLead, deleteLead, exportLeadsCsv } from '../controllers/lead.controller';
import { validate } from '../middleware/validate.middleware';
import { protect } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { createLeadValidator, updateLeadValidator } from '../validators/lead.validator';
import { UserRole } from '../interfaces/auth.interface';

const router = Router();

// All lead routes require authentication
router.use(protect);

router.route('/')
  .post(authorizeRoles(UserRole.ADMIN, UserRole.SALES), validate(createLeadValidator), createLead)
  .get(authorizeRoles(UserRole.ADMIN, UserRole.SALES), getLeads);

router.route('/export')
  .get(authorizeRoles(UserRole.ADMIN, UserRole.SALES), exportLeadsCsv);

router.route('/:id')
  // Sales can update leads, Admin can update leads
  .put(authorizeRoles(UserRole.ADMIN, UserRole.SALES), validate(updateLeadValidator), updateLead)
  // ONLY Admin can delete leads
  .delete(authorizeRoles(UserRole.ADMIN), deleteLead);

export default router;
