"use client";

import {
  Globe,
  Package,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import { useSettings } from "@/hooks/useSettings";

const features = [
  {
    icon: Globe,
    titleKey: "feature1Title",
    descKey: "feature1Description",
  },
  {
    icon: Package,
    titleKey: "feature2Title",
    descKey: "feature2Description",
  },
  {
    icon: ShieldCheck,
    titleKey: "feature3Title",
    descKey: "feature3Description",
  },
  {
    icon: Headphones,
    titleKey: "feature4Title",
    descKey: "feature4Description",
  },
] as const;

export default function FeatureSection() {
  const { settings } = useSettings();

  if (!settings) return null;

  return (
    <section className="relative z-20 -mt-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] grid md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group lg:border-r last:lg:border-r-0 border-gray-200 p-10 text-center transition duration-300 hover:-translate-y-2 hover:bg-slate-50"
              >

                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 transition group-hover:scale-110">

                  <Icon
                    size={44}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-3xl font-bold">

                  {settings[item.titleKey]}

                </h3>

                <p className="mt-5 text-lg leading-8 text-gray-500">

                  {settings[item.descKey]}

                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}