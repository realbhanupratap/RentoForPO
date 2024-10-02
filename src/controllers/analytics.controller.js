import { asyncHandler } from "../utils/asyncHandler.js";
import { PaymentHistory } from "../models/paymentHistory.models.js";
import { Complaint } from "../models/complaint.models.js";
import { TenantManagement } from "../models/tenantManagement.models.js";
import { Inventory } from "../models/inventory.models.js";

// Get total rent collected
export const getTotalRentCollected = asyncHandler(async (req, res) => {
  const totalRent = await PaymentHistory.aggregate([
    { $match: { status: 'Paid' } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ]);
  
  return res.status(200).json({ totalRent: totalRent[0]?.totalAmount || 0 });
});

// Get total rent due (unpaid)
export const getTotalRentDue = asyncHandler(async (req, res) => {
  const totalDueRent = await PaymentHistory.aggregate([
    { $match: { status: 'Due' } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ]);

  return res.status(200).json({ totalDueRent: totalDueRent[0]?.totalAmount || 0 });
});

// Get total number of tenants
export const getTotalTenants = asyncHandler(async (req, res) => {
  const totalTenants = await TenantManagement.countDocuments();
  return res.status(200).json({ totalTenants });
});

// Get total tenant capacity (total available rooms or beds)
export const getTotalCapacity = asyncHandler(async (req, res) => {
  const totalCapacity = await Inventory.aggregate([
    { $match: { category: 'Bed' } },  // or "Room" depending on the unit of measure
    { $group: { _id: null, totalBeds: { $sum: "$quantity" } } }
  ]);

  return res.status(200).json({ totalCapacity: totalCapacity[0]?.totalBeds || 0 });
});

// Get complaint resolution rate
export const getComplaintResolutionRate = asyncHandler(async (req, res) => {
  const totalComplaints = await Complaint.countDocuments();
  const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });

  const resolutionRate = (totalComplaints > 0) ? (resolvedComplaints / totalComplaints) * 100 : 0;
  
  return res.status(200).json({ resolutionRate });
});

// Get detailed complaint status
export const getComplaintStatusBreakdown = asyncHandler(async (req, res) => {
  const totalComplaints = await Complaint.countDocuments();
  const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
  const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });

  return res.status(200).json({
    totalComplaints,
    resolvedComplaints,
    pendingComplaints,
  });
});

// Get vacancy rate (number of empty rooms/beds)
export const getVacancyRate = asyncHandler(async (req, res) => {
  const totalInventory = await Inventory.aggregate([
    { $match: { category: 'Bed' } },  // Replace with "Room" if needed
    { $group: { _id: null, totalBeds: { $sum: "$quantity" } } }
  ]);

  const occupiedBeds = await TenantManagement.countDocuments();  // Tenants occupying rooms/beds

  const vacancyRate = (totalInventory[0]?.totalBeds > 0)
    ? ((totalInventory[0].totalBeds - occupiedBeds) / totalInventory[0].totalBeds) * 100
    : 0;

  return res.status(200).json({
    vacancyRate,
    totalCapacity: totalInventory[0]?.totalBeds || 0,
    occupiedBeds,
    availableBeds: totalInventory[0]?.totalBeds - occupiedBeds || 0,
  });
});

export { getTotalRentCollected, getTotalRentDue, getTotalTenants, getTotalCapacity, getComplaintResolutionRate, getComplaintStatusBreakdown, getVacancyRate };
