"use client";

import {
  ShipWheel,
  BadgeCheck,
  ShieldCheck,
  Headset,
  ArrowRight,
} from "lucide-react";

import { useSettings } from "@/hooks/useSettings";

const features = [
  {
    icon: ShipWheel,
    titleKey: "feature1Title",
    descKey: "feature1Description",
  },
  {
    icon: BadgeCheck,
    titleKey: "feature2Title",
    descKey: "feature2Description",
  },
  {
    icon: ShieldCheck,
    titleKey: "feature3Title",
    descKey: "feature3Description",
  },
  {
    icon: Headset,
    titleKey: "feature4Title",
    descKey: "feature4Description",
  },
] as const;

export default function FeatureSection() {
  const { settings } = useSettings();

console.log(settings);

  if (!settings) return null;

return (
 <section className="relative z-30 -mt-16 py-8 hidden lg:block">

    <div className="mx-auto max-w-7xl px-6">

      <div
          className="
          overflow-hidden
          rounded-[40px]
          border
          border-white/60
          bg-white/95
          backdrop-blur-2xl
          shadow-[0_35px_80px_rgba(15,23,42,.10)]
          ring-1
          ring-slate-100
          grid
          md:grid-cols-2
          lg:grid-cols-4
          "
        >

        {features.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
  key={index}
  className="
group
relative
flex
min-h-[280px]
flex-col
border-r
border-slate-100
bg-white
px-10
py-8
transition-all
duration-500
hover:-translate-y-2
hover:shadow-xl
last:border-r-0
"
>

  {/* Accent */}

  <div
    className="
    absolute
    left-0
    top-0
    h-1
    w-0
    bg-blue-600
    transition-all
    duration-500
    group-hover:w-full
    "
  />

  {/* Icon */}

  <div className="flex h-20 items-start">
  <div
    className="
    flex
    h-16
    w-16
    items-center
    justify-center
    rounded-2xl
    border
    border-slate-100
    bg-white
    shadow-md
    "
  >
    <Icon size={30} className="text-blue-600" />
  </div>
</div>

  {/* Title */}

  <h3 className="text-2xl font-extrabold text-slate-900">

    {settings[item.titleKey as keyof typeof settings]}

  </h3>

  {/* Description */}

  <p className="mt-5 leading-8 text-slate-500">

    {settings[item.descKey as keyof typeof settings]}

  </p>


</div>

          );

        })}

      </div>

    </div>

  </section>
);
}