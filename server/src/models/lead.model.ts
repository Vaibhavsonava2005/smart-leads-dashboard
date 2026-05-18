import mongoose, { Schema } from 'mongoose';
import { ILead, LeadStatus, LeadSource } from '../interfaces/lead.interface';

const leadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true,
    },
  },
  { timestamps: true }
);

// Text index for optimized search
leadSchema.index({ name: 'text', email: 'text' });

export const Lead = mongoose.model<ILead>('Lead', leadSchema);
