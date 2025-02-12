import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
}

function Logo({ variant = 'dark' }: LogoProps) {
  return (
    <Link href="/" className="group hover:opacity-95 transition-all duration-300">
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="relative w-[3.25rem] h-[3.25rem] sm:w-[4rem] sm:h-[4rem] flex-shrink-0">
          <Image
            src="/images/log.png"
            alt="GSK Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className={`text-xs sm:text-sm font-serif font-bold leading-tight tracking-wide ${variant === 'light' ? 'text-white' : 'text-[#c22f61]'} group-hover:tracking-wider transition-all duration-300`}>
            Gastroenterology Society
          </span>
          <span className={`text-xs sm:text-sm font-serif font-bold leading-tight tracking-wide ${variant === 'light' ? 'text-white' : 'text-[#c22f61]'} group-hover:tracking-wider transition-all duration-300`}>
            of Kenya
          </span>
          <span className={`text-[9px] sm:text-[11px] font-serif mt-1 ${variant === 'light' ? 'text-white/90' : 'text-[#c22f61]/90'} tracking-wide group-hover:tracking-wider transition-all duration-300`}>
            Advancing Digestive Health Care
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Logo;