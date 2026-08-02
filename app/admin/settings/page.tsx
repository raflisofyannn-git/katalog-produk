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

          {/* Hero Badge */}

          <div>

          <label className="mb-2 block font-semibold">
            Label Banner
          </label>

          <input
          value={form.heroBadge || ""}
          onChange={(e)=>
          setForm({
            ...form,
            heroBadge:e.target.value,
          })
          }
          placeholder="IMPORT PRODUK CHINA"
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

            {/* Hero Button */}

            <div>

            <label className="mb-2 block font-semibold">
              Tombol Banner
            </label>

            <input
            value={form.heroButton || ""}
            onChange={(e)=>
            setForm({
              ...form,
              heroButton:e.target.value,
            })
            }
            placeholder="Belanja Sekarang"
            className="w-full rounded-xl border p-3"
            />

            </div>

  
{/* ================= FEATURE SECTION ================= */}

<div className="border-t pt-8">

  <h2 className="mb-6 text-2xl font-bold">
    Feature Section
  </h2>

  {/* Feature 1 */}

  <div className="space-y-4">

    <label className="font-semibold">
      Feature 1 Title
    </label>

    <input
      value={form.feature1Title || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature1Title: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
      placeholder="Import Langsung"
    />

    <textarea
      rows={3}
      value={form.feature1Description || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature1Description: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
      placeholder="Produk langsung dari supplier terpercaya."
    />

  </div>

  {/* Feature 2 */}

  <div className="mt-8 space-y-4">

    <label className="font-semibold">
      Feature 2 Title
    </label>

    <input
      value={form.feature2Title || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature2Title: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
    />

    <textarea
      rows={3}
      value={form.feature2Description || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature2Description: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
    />

  </div>

  {/* Feature 3 */}

  <div className="mt-8 space-y-4">

    <label className="font-semibold">
      Feature 3 Title
    </label>

    <input
      value={form.feature3Title || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature3Title: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
    />

    <textarea
      rows={3}
      value={form.feature3Description || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature3Description: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
    />

  </div>

  {/* Feature 4 */}

  <div className="mt-8 space-y-4">

    <label className="font-semibold">
      Feature 4 Title
    </label>

    <input
      value={form.feature4Title || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature4Title: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
    />

    <textarea
      rows={3}
      value={form.feature4Description || ""}
      onChange={(e) =>
        setForm({
          ...form,
          feature4Description: e.target.value,
        })
      }
      className="w-full rounded-xl border p-3"
    />

  </div>

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