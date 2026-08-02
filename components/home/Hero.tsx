"use client";

import Image from "next/image";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function Hero() {
  const { settings } = useSettings();

if (!settings) {
  return null;
}

  return (
    <section
      className="
      relative
      isolate
      overflow-hidden
      bg-[#021B3A]
      "
    >
            {/* Background */}

      <div className="absolute inset-0">

        {/* Ocean */}

        <Image
          src="/hero/ocean.jpg"
          alt="Ocean"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#031632]/90
          via-[#0A3D78]/55
          to-[#0A5DB3]/25
          "
        />

        {/* Light */}

        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(255,255,255,.20),transparent_55%)]
          "
        />

        {/* Bottom Shadow */}

        <div
          className="
          absolute
          inset-x-0
          bottom-0
          h-48
          bg-gradient-to-t
          from-black/40
          to-transparent
          "
        />

      </div>
            <div
        className="
        relative
        mx-auto
        flex
        min-h-[690px]
        max-w-7xl
        items-center
        px-6
        "
      >

              <div
          className="
          z-20
          max-w-[560px]
          "
        >

          <span
            className="
            inline-flex
            rounded-full
            bg-blue-600
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            shadow-lg
            "
          >
            {settings?.heroBadge}
          </span>

          <h1
            className="
            mt-8
            text-6xl
            font-black
            leading-[1.05]
            tracking-tight
            text-white
            "
          >

            {settings?.heroTitle}

          </h1>

          <h2
            className="
            mt-5
            max-w-xl
            text-[34px]
            font-extrabold
            leading-tight
            text-cyan-400
            "
          >

            {settings?.heroSubtitle}

          </h2>

          <p
            className="
            mt-8
            max-w-xl
            text-lg
            leading-9
            text-white/90
            "
          >

            {settings?.heroDescription}

          </p>
                    <div
            className="
            mt-10
            flex
            flex-wrap
            gap-5
            "
          >

            <a
              href="#produk"
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-blue-600
              px-8
              py-5
              font-bold
              text-white
              shadow-xl
              transition
              hover:bg-blue-700
              "
            >

              <ShoppingBag size={22} />

              {settings?.heroButton}

            </a>

            <a
              href={`https://wa.me/${settings?.adminPhone}`}
              target="_blank"
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-8
              py-5
              font-bold
              text-green-600
              shadow-xl
              transition
              hover:scale-105
              "
            >

              <MessageCircle size={22} />

              {settings?.heroWhatsappButton}

            </a>

          </div>

        </div>
                {/* RIGHT */}

        <div
          className="
          relative
          ml-auto
          hidden
          h-[690px]
          w-[760px]
          lg:block
          "
        >

          {/* Shadow Batu */}

          <div
            className="
            absolute
            bottom-8
            left-44
            z-0
            h-14
            w-[500px]
            rounded-full
            bg-black/30
            blur-3xl
            "
          />

          {/* Batu */}

          <Image
            src="/hero/rock.png"
            alt="Rock"
            width={620}
            height={300}
            className="
            absolute
            bottom-0
            left-24
            z-10
            "
          />

          {/* Long Fins */}

          <Image
            src="/hero/longfins.png"
            alt="Long Fins"
            width={420}
            height={420}
            className="
            absolute
            right-0
            top-12
            z-30
            "
          />

          {/* Drybag */}

          <Image
            src="/hero/mask3.png"
            alt="Drybag"
            width={210}
            height={210}
            className="
            absolute
            left-28
            bottom-24
            z-40
            "
          />

          {/* Wetsuit */}

          <Image
            src="/hero/wetsuit.png"
            alt="Wetsuit"
            width={210}
            height={210}
            className="
            absolute
            right-[90px]
            bottom-6
            z-40
            "
          />

        </div>
              </div>

    </section>
    );
}