import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/review.models.js";
import { PropertyListing } from "../models/propertyListing.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get reviews for a landlord's properties
export const getReviewsForLandlordProperties = asyncHandler(async (req, res) => {
  const landlordId = req.user._id;

  // Find all properties owned by the landlord
  const properties = await PropertyListing.find({ landlord: landlordId }).select('_id propertyName');
  if (properties.length === 0) {
    throw new ApiError('No properties found for this landlord', 404);
  }

  // Extract property IDs to find reviews for these properties
  const propertyIds = properties.map(property => property._id);

  // Fetch reviews for the landlord's properties
  const reviews = await Review.find({ property: { $in: propertyIds } })
    .populate('tenant', 'name')
    .populate('property', 'propertyName');

  return res.status(200).json(
    new ApiResponse(200, { properties, reviews }, 'Reviews fetched successfully')
  );
});

// Get average rating for a landlord's property (optional feature)
export const getPropertyAverageRating = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  const landlordId = req.user._id;

  // Verify that the property belongs to the landlord
  const property = await PropertyListing.findOne({ _id: propertyId, landlord: landlordId });
  if (!property) {
    throw new ApiError('Property not found or not owned by this landlord', 404);
  }

  // Calculate average rating for the property
  const averageRating = await Review.aggregate([
    { $match: { property: property._id } },
    { $group: { _id: "$property", avgRating: { $avg: "$rating" } } }
  ]);

  const avg = averageRating.length > 0 ? averageRating[0].avgRating : 0;

  return res.status(200).json(
    new ApiResponse(200, { propertyId: property._id, averageRating: avg }, 'Average rating fetched successfully')
  );
});



export {
  getReviewsForLandlordProperties,
  getPropertyAverageRating
};