import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
const Welcomepage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b bg-black text-white relative overflow-hidden">
      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #b45309 0%,
            #d97706 25%,
            #f59e0b 50%,
            #fbbf24 75%,
            #b45309 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s infinite linear;
        }
        
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .luxury-bg {
          background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 luxury-bg"></div>
      
      {/* Floating elements for luxury feel */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-amber-300/15 to-yellow-500/15 rounded-full blur-lg animate-pulse delay-1000"></div>

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl lg:text-5xl font-bold mb-6 shimmer-text tracking-wider">
          Welcome to Luxe
        </h1>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-4 leading-relaxed">
          Where Luxury Meets Artistry
        </h2>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover an exquisite collection crafted for those who appreciate the finest things in life
        </p>
        <Link href="/collection">
        <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-lg rounded-full hover:from-amber-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/40">
          <span>Discover Our Collection</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
        </button>
        </Link>
        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-64"></div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
    </div>
  )
}

export default Welcomepage