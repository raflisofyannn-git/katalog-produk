import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}: Props) {
  return (
    <div
      className={`rounded-2xl border ${bg} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-3 shadow">

          <Icon
            size={34}
            className={color}
          />

        </div>

      </div>
    </div>
  );
}