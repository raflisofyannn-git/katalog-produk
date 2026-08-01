"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import { WebsiteSetting } from "@/types/setting";
import { useSettings } from "@/hooks/useSettings";
import SingleImageUpload from "@/components/ui/SingleImageUpload";

import LoadingButton from "@/components/ui/LoadingButton";

import { toast } from "sonner";

export default function AdminSettingPage() {
  const {
    settings,
    loading,
    save,
  } = useSettings();

  const [form, setForm] =
    useState<WebsiteSetting | null>(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  if (loading || !form) {
    return (
      <main className="p-8">
        Memuat Setting...
      </main>
    );
  }

  async function handleSave() {

  if (!form) return;


  if (!form.storeName.trim()) {

    toast.error(
      "Nama toko wajib diisi."
    );

    return;

  }


  try {
    setSaving(true);

    await save(form);

    toast.success("Setting berhasil disimpan.");
  } catch (err) {
    console.error(err);

    toast.error("Gagal menyimpan setting.");
  } finally {
    setSaving(false);
  }
}

  return (
    <main className="mx-auto max-w-5xl p-8">

      <h1 className="mb-2 text-4xl font-bold">
        Setting Website
      </h1>

      <p className="mb-8 text-gray-500">
        Semua konfigurasi website berada di halaman ini.
      </p>

      <div className="space-y-8 rounded-2xl border bg-white p-8 shadow">

        {/* Nama Toko */}

        <div>

          <label className="mb-2 block font-semibold">
            Nama Toko
          </label>

          <input
            value={form.storeName}
            onChange={(e) =>
              setForm({
                ...form,
                storeName: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* WhatsApp */}

        <div>

          <label className="mb-2 block font-semibold">
            WhatsApp Admin
          </label>

          <input
            value={form.adminPhone}
            onChange={(e) =>
              setForm({
                ...form,
                adminPhone: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block font-semibold">
            Email
          </label>

          <input
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Alamat */}

        <div>

          <label className="mb-2 block font-semibold">
            Alamat
          </label>

          <textarea
            rows={4}
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Hero Title */}

        <div>

          <label className="mb-2 block font-semibold">
            Judul Homepage
          </label>

          <input
            value={form.heroTitle}
            onChange={(e) =>
              setForm({
                ...form,
                heroTitle: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Hero Subtitle */}

        <div>

          <label className="mb-2 block font-semibold">
            Sub Judul Homepage
          </label>

          <textarea
            rows={3}
            value={form.heroSubtitle}
            onChange={(e) =>
              setForm({
                ...form,
                heroSubtitle: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>
               {/* Logo */}

          <div>

            <label className="mb-3 block font-semibold">
              Logo Website
            </label>
            <SingleImageUpload
            value={form.logo || ""}
            onChange={(url) =>
              setForm({
                ...form,
                logo: url,
              })
            }
          />

          </div>

        {/* Banner */}

        <div>

          <label className="mb-3 block font-semibold">
            Banner Homepage
          </label>

          <SingleImageUpload
            value={form.heroImage || ""}
            onChange={(url) =>
              setForm({
                ...form,
                heroImage: url,
              })
            }
          />

        </div>

        {/* Instagram */}

        <div>

          <label className="mb-2 block font-semibold">
            Instagram
          </label>

          <input
            value={form.instagram}
            onChange={(e) =>
              setForm({
                ...form,
                instagram: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Facebook */}

        <div>

          <label className="mb-2 block font-semibold">
            Facebook
          </label>

          <input
            value={form.facebook}
            onChange={(e) =>
              setForm({
                ...form,
                facebook: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* TikTok */}

        <div>

          <label className="mb-2 block font-semibold">
            TikTok
          </label>

          <input
            value={form.tiktok}
            onChange={(e) =>
              setForm({
                ...form,
                tiktok: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Footer */}

        <div>

          <label className="mb-2 block font-semibold">
            Footer Website
          </label>

          <textarea
            rows={3}
            value={form.footerText}
            onChange={(e) =>
              setForm({
                ...form,
                footerText: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div className="pt-4">

        <LoadingButton
          loading={saving}
          onClick={handleSave}
          className="w-full"
        >
          Simpan Setting
        </LoadingButton>

       </div>

      </div>

    </main>

  );

}