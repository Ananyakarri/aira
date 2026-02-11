/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: appfeatures
 * Interface for AppFeatures
 */
export interface AppFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featureImage?: string;
  /** @wixFieldType text */
  benefit?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: healthresources
 * Interface for HealthResources
 */
export interface HealthResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  articleTitle?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType text */
  category?: string;
}
