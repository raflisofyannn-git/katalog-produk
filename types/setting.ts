export interface WebsiteSetting {
  id?: string;

  storeName: string;
  logo: string;

  adminPhone: string;
  email: string;
  address: string;

  instagram: string;
  facebook: string;
  tiktok: string;

  // HERO
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;

  heroButton: string;
  heroWhatsappButton: string;
  heroImage: string;

  // Hero Feature Lama
  heroFeatureTitle: string;
  heroFeature1: string;
  heroFeature2: string;
  heroFeature3: string;

  // Homepage Feature
  feature1Title: string;
  feature1Description: string;

  feature2Title: string;
  feature2Description: string;

  feature3Title: string;
  feature3Description: string;

  feature4Title: string;
  feature4Description: string;

  footerText: string;

  updatedAt: number;
}