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

    heroFeatureTitle: "PREORDER",
    heroFeature1: "Original",
    heroFeature2: "Harga Kompetitif",
    heroFeature3: "Aman",
    
  storeName: "IMPORT STORE",
  logo: "",
  adminPhone: "",
  email: "",
  address: "",

  heroBadge: "IMPORT PRODUK CHINA",
  heroTitle: "100% ORIGINAL",
  heroSubtitle: "Semua produk menggunakan sistem PREORDER. Barang langsung dikirim dari supplier terpercaya di China.",
  heroButton: "Belanja Sekarang",
  heroImage: "",

  instagram: "",
  facebook: "",
  tiktok: "",

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