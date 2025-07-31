import { ArrowRight } from 'lucide-react'
const LuxeText = () => {
  return (
    <div className="min-h-screen luxe-text-container">
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

     `}</style>
      <h1 className="luxe-serif">LUXE</h1>
      <h2 className="luxe-description">
        An <span className="accent text-amber-300 shimmer-text">exquisite</span> blend of luxury and elegance
      </h2>
     
    </div>
  )
}

export default LuxeText