import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
}

function Logo({ variant = 'dark' }: LogoProps) {
  return (
    <Link href="/" className="group hover:opacity-95 transition-all duration-300">
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="relative w-[3.25rem] h-[3.25rem] sm:w-[4rem] sm:h-[4rem] flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#003366] via-[#002855] to-[#002244] p-[3px] shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <div className="relative flex items-center justify-center w-full h-full group-hover:scale-105 transition-transform duration-300">
                <div className="absolute w-12 h-12 sm:w-14 sm:h-14 border-[3px] sm:border-[4px] border-[#003366] rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute w-12 h-12 sm:w-14 sm:h-14 border-[3px] sm:border-[4px] border-[#003366] rounded-full transform rotate-45 opacity-80 group-hover:rotate-[60deg] transition-transform duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                </div>
                <div className="absolute w-12 h-12 sm:w-14 sm:h-14 border-[3px] sm:border-[4px] border-[#002244] rounded-full transform -rotate-45 opacity-70 group-hover:-rotate-[60deg] transition-transform duration-500"></div>
                <div className="relative z-10 bg-white rounded-full p-2">
                  <span className="text-base sm:text-lg font-black text-[#003366] tracking-wider group-hover:tracking-widest transition-all duration-300">GSK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`text-xs sm:text-sm font-serif font-bold leading-tight tracking-wide ${variant === 'light' ? 'text-white' : 'text-[#003366]'} group-hover:tracking-wider transition-all duration-300`}>
            Gastroenterology Society
          </span>
          <span className={`text-xs sm:text-sm font-serif font-bold leading-tight tracking-wide ${variant === 'light' ? 'text-white' : 'text-[#003366]'} group-hover:tracking-wider transition-all duration-300`}>
            of Kenya
          </span>
          <span className={`text-[9px] sm:text-[11px] font-serif mt-1 ${variant === 'light' ? 'text-white/90' : 'text-[#003366]/90'} tracking-wide group-hover:tracking-wider transition-all duration-300`}>
            Advancing Digestive Health Care
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Logo;