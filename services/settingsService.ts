import {
  ref,
  get,
  set,
  update,
} from "firebase/database";

import { db } from "@/lib/firebase";

import { WebsiteSetting } from "@/types/setting";

const settingRef = ref(db, "settings");


// =======================================
// Ambil Setting Website
// =======================================

export async function getSetting(): Promise<WebsiteSetting> {
  const snapshot = await get(settingRef);

  if (snapshot.exists()) {
    return snapshot.val();
  }

  const defaultSetting: WebsiteSetting = {
  storeName: "VINA FINDS",
  logo: "",

  adminPhone: "",
  email: "",
  address: "",

  instagram: "",
  facebook: "",
  tiktok: "",

  heroBadge: "IMPORT SPORT EQUIPMENT",

  heroTitle: "Import Produk Sport",

  heroSubtitle: "Berkualitas dari China",

  heroDescription:
    "Menyediakan perlengkapan Diving, Swimming, Outdoor dan Fitness berkualitas langsung dari supplier terpercaya di China.",

  heroButton: "Lihat Produk",

  heroWhatsappButton: "Hubungi WhatsApp",

  heroImage: "",

  heroFeatureTitle: "PREORDER",
  heroFeature1: "Original",
  heroFeature2: "Harga Kompetitif",
  heroFeature3: "Aman",

  feature1Title: "Import Langsung",
  feature1Description:
    "Produk langsung dari supplier terpercaya China.",

  feature2Title: "Produk Sesuai Kebutuhan",
  feature2Description:
    "Melayani request berbagai jenis produk sesuai kebutuhan Anda.",

  feature3Title: "Pengiriman Terjamin",
  feature3Description:
    "Packing aman dengan ekspedisi terpercaya.",

  feature4Title: "Layanan After Sales",
  feature4Description:
    "Siap membantu setelah pembelian.",

  footerText: "",

  updatedAt: Date.now(),
};

  await set(settingRef, defaultSetting);

  return defaultSetting;
}

// =======================================
// Simpan Semua Setting
// =======================================

export async function saveSetting(
  data: WebsiteSetting
) {
  await set(settingRef, {
    ...data,
    updatedAt: Date.now(),
  });
}

// =======================================
// Update Sebagian Setting
// =======================================

export async function updateSetting(
  data: Partial<WebsiteSetting>
) {
  await update(settingRef, {
    ...data,
    updatedAt: Date.now(),
  });
}