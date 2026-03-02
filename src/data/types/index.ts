// Re-export all types from schemas for easy import
// Usage: import { Member, Team, Partner } from "@/data/types"

export type { SocialLinks } from "../schemas/social-links.schema";
export type {
  Member,
  Directory,
  ExecutiveBoard,
} from "../schemas/member.schema";
export type {
  Athlete,
  Team,
  AthleteSocialLink,
  AthleteSocialType,
  TeamKey,
  Sport,
  Category,
} from "../schemas/team.schema";
export type { Partner } from "../schemas/partner.schema";
export type { GalleryImage, StackStyle } from "../schemas/gallery.schema";
