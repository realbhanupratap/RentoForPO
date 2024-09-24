import { asyncHandler } from "../utils/asyncHandler";
import { Complaint } from "../models/complaint.models";

// View complaints
export const viewComplaints = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;
  const complaints = await Complaint.find({ landlord: landlordId });
  // Logic to view complaints...
});

// Resolve a complaint
export const resolveComplaint = asyncHandler(async (req, res) => {
  const { complaintId } = req.params;
  // Logic to resolve complaint...
});
