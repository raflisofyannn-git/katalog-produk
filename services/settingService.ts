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
    storeName: "IMPORT STORE",
    logo: "",

    adminPhone: "6281234567890",
    email: "",
    address: "",

    instagram: "",
    facebook: "",
    tiktok: "",

    heroTitle: "Selamat Datang",
    heroSubtitle: "Temukan Produk Terbaik Kami",
    heroImage: "",

    footerText: "© Import Store",

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