import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Complaint } from "../models/complaint.models.js";

// View complaints
export const viewComplaints = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;

  // Fetch complaints related to properties owned by the landlord
  const complaints = await Complaint.find({ landlord: landlordId })
    .populate('tenant', 'fullName email')  // Populating tenant details
    .populate('property', 'address');      // Populating property details

  if (!complaints || complaints.length === 0) {
    throw new ApiError("No complaints found", 404);
  }

  return res.status(200).json({
    status: "success",
    data: complaints,
  });
});

// Resolve a complaint
export const resolveComplaint = asyncHandler(async (req, res) => {
  const { complaintId } = req.params;
  const landlordId = req.user._id;

  // Find complaint related to the landlord
  const complaint = await Complaint.findOne({ _id: complaintId, landlord: landlordId });

  if (!complaint) {
    throw new ApiError("Complaint not found", 404);
  }

  if (complaint.status === 'closed') {
    throw new ApiError("Complaint already resolved", 400);
  }

  // Update complaint status to 'closed'
  complaint.status = 'closed';
  await complaint.save();

  return res.status(200).json({
    status: "success",
    message: "Complaint resolved successfully",
    data: complaint,
  });
});

export { viewComplaints, resolveComplaint };