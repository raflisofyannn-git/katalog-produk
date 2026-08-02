"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-6 p-6">
        {children}
      </div>

    </div>
  );
}