"use client";

import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

export default function TestPage() {
  async function testFirebase() {
    try {
      await set(ref(db, "test"), {
        status: "Berhasil Terhubung",
      });

      toast.success("Berhasil menulis ke Firebase");
    } catch (err) {
      console.error(err);
      toast.error("Gagal koneksi");
    }
  }

  return (
    <div className="p-10">
      <button
        onClick={testFirebase}
        className="rounded bg-blue-600 px-5 py-3 text-white"
      >
        Test Firebase
      </button>
    </div>
  );
}