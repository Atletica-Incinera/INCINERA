/**
 * Cloudinary URL builder utilities.
 *
 * Usage:
 *   import { memberPhotoUrl, partnerLogoUrl } from "@/data/utils/cloudinary";
 *   const url = memberPhotoUrl("maria-oliveira"); // optimized, cropped, WebP
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const DEFAULT_PLACEHOLDER_ID = "placeholders/default";

/** Base transformation presets */
const PRESETS = {
  /** Member/athlete profile photo: square crop with face detection */
  memberPhoto: "w_400,h_400,c_fill,g_face,f_auto,q_auto",
  /** Large member photo for modal: wider, still face-aware */
  memberPhotoLarge: "w_800,h_800,c_fill,g_face,f_auto,q_auto",
  /** Athlete card photo */
  athletePhoto: "f_auto,q_auto",
  /** Partner/sponsor logo: contained, transparent bg preserved */
  partnerLogo: "w_300,h_200,c_pad,f_auto,q_auto",
  /** Directory section image (header/banner style) */
  directoryImage: "f_auto,q_auto",
  /** Gallery image: full size, WebP */
  gallery: "w_1200,f_auto,q_auto",
  /** Thumbnail for gallery */
  galleryThumb: "w_400,h_400,c_fill,f_auto,q_auto",
  /** Brand assets (logos, mascots): auto format and quality, no dimension constraint */
  brand: "f_auto,q_auto",
} as const;

function buildUrl(publicId: string, preset: string): string {
  if (!publicId) return buildUrl(DEFAULT_PLACEHOLDER_ID, preset);

  // If it's already a full URL, return it immediately
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId;
  }

  // Normalize the publicId: remove /images/ prefix and file extension
  const normalizedId = parseLocalPathToCloudinaryId(publicId);

  if (!CLOUD_NAME) {
    // Fallback if Cloudinary is not configured
    // Return as a local path relative to /images/
    return `/images/${normalizedId}`;
  }

  // Build URL avoiding triple slashes if preset is empty
  const transformation = preset ? `${preset}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformation}${normalizedId}`;
}

/**
 * Returns an optimized, face-cropped Cloudinary URL for a member/director photo.
 * @param publicId  Cloudinary public ID, e.g. "directory/maria-oliveira"
 * @param large     Use larger variant (for modals)
 */
export function memberPhotoUrl(publicId: string, large = false): string {
  const preset = large ? PRESETS.memberPhotoLarge : PRESETS.memberPhoto;
  return buildUrl(publicId, preset);
}

/**
 * Returns an optimized Cloudinary URL for an athlete photo.
 * @param publicId Cloudinary public ID, e.g. "teams/athlete-name"
 */
export function athletePhotoUrl(publicId: string): string {
  return buildUrl(publicId, PRESETS.athletePhoto);
}

/**
 * Returns an optimized Cloudinary URL for a partner/sponsor logo.
 * @param publicId Cloudinary public ID, e.g. "partners/logo-name"
 */
export function partnerLogoUrl(publicId: string): string {
  return buildUrl(publicId, PRESETS.partnerLogo);
}

/**
 * Returns an optimized Cloudinary URL for a directory section banner image.
 */
export function directoryImageUrl(publicId: string): string {
  return buildUrl(publicId, PRESETS.directoryImage);
}

/**
 * Returns an optimized Cloudinary URL for an About gallery image.
 */
export function galleryImageUrl(publicId: string, thumb = false): string {
  const preset = thumb ? PRESETS.galleryThumb : PRESETS.gallery;
  return buildUrl(publicId, preset);
}

/**
 * Returns an optimized Cloudinary URL for brand assets (logos, mascots).
 * @param publicId Cloudinary public ID, e.g. "brand/hero-mascot"
 */
export function brandImageUrl(publicId: string): string {
  return buildUrl(publicId, PRESETS.brand);
}

/**
 * Parses local paths like "/images/directory/name.png" into Cloudinary IDs like "directory/name"
 */
export function parseLocalPathToCloudinaryId(path: string): string {
  if (!path) return DEFAULT_PLACEHOLDER_ID;
  if (path.toLowerCase().includes("placeholder")) return DEFAULT_PLACEHOLDER_ID;

  // Remove starting / and images/ prefix (slash is optional)
  return path.replace(/^(\/?images\/)/, "").replace(/\.[^/.]+$/, "");
}

/**
 * Normalizes a person's name to a Cloudinary-safe public ID component.
 */
export function nameToPublicId(fullName: string): string {
  return fullName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove special chars
}
