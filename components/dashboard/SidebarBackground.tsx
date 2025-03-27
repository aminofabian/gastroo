"use client";

export default function SidebarBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004488] to-[#003366] overflow-hidden">
        {/* Animated gradient circles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400  mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-400  mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-400  mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-3xl bg-white/10"></div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px" 
          }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
} 