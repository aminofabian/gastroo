"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <Link
        href={href}
        className="text-gray-500 hover:text-[#003366] text-sm font-display underline-offset-4 hover:underline transition-colors"
      >
        {label}
      </Link>
    </div>
  );
};

export default BackButton;
