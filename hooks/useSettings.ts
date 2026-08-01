"use client";

import { useEffect, useState } from "react";

import {
  getSetting,
  saveSetting,
  updateSetting,
} from "@/services/settingService";

import { WebsiteSetting } from "@/types/setting";

export function useSettings() {
  const [settings, setSettings] =
    useState<WebsiteSetting | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getSetting();

      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function save(
    data: WebsiteSetting
  ) {
    await saveSetting(data);

    setSettings(data);
  }

  async function update(
    data: Partial<WebsiteSetting>
  ) {
    await updateSetting(data);

    await loadSettings();
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    reload: loadSettings,
    save,
    update,
  };
}