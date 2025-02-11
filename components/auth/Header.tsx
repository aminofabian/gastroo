import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight">
        {label}
      </h1>
      <p className="text-gray-500 text-sm font-display mt-2">
        Please sign in to access your account
      </p>
    </div>
  );
};

export default Header;
