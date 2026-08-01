"use client";

export default function Hero() {
  return (
    <section className="mx-auto mt-8 max-w-7xl px-4">

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500">

        <div className="grid items-center gap-8 px-8 py-16 md:grid-cols-2">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white">
              IMPORT PRODUK CHINA
            </span>

            <h1 className="mt-6 text-4xl font-extrabold text-white md:text-6xl">
              100% ORIGINAL
            </h1>

            <p className="mt-5 text-lg text-white/90">
              Semua produk menggunakan sistem
              <span className="font-bold">
                {" "}PREORDER
              </span>.
              Barang langsung dikirim dari supplier terpercaya di China.
            </p>

            <button
              className="mt-8 rounded-xl bg-white px-8 py-3 font-bold text-blue-700 transition hover:scale-105"
            >
              Belanja Sekarang
            </button>

          </div>

          <div className="hidden justify-center md:flex">

            <div className="rounded-3xl bg-white/10 p-10 backdrop-blur">

              <h2 className="text-3xl font-bold text-white">
                PREORDER
              </h2>

              <p className="mt-4 text-white">
                ✔ Original
              </p>

              <p className="text-white">
                ✔ Harga Kompetitif
              </p>

              <p className="text-white">
                ✔ Aman
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}