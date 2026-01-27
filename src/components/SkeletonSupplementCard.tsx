/**
 * SkeletonSupplementCard Component
 *
 * A loading placeholder that matches the shape of SupplementCard.
 * Shows animated pulsing bars while real data is loading.
 */

function SkeletonSupplementCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200 animate-pulse" />

      {/* Content Placeholders */}
      <div className="p-4">
        {/* Title - wider bar */}
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />

        {/* Brand - narrower bar */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2" />

        {/* Category - small bar */}
        <div className="h-6 bg-gray-200 rounded-full animate-pulse mb-2 w-1/3" />

        {/* Ingredients - two lines */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-full" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      </div>
    </div>
  );
}

export default SkeletonSupplementCard;
