import Link from "next/link";
import { UserPlus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLink?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  actionLink,
  actionLabel = "Add User",
  actionIcon = <UserPlus className="h-4 w-4 mr-2" />,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      
      {actionLink && (
        <Link
          href={actionLink}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
        >
          {actionIcon}
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
