"use client";
import React, { useState, useEffect } from 'react';
import { Droplets, Sparkles, Heart, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link'
export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passionate Craftsmanship",
      description: "Every piece is lovingly handcrafted with meticulous attention to detail"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Timeless Elegance",
      description: "Designs that transcend trends and celebrate enduring beauty"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Modern Sophistication",
      description: "Contemporary artistry merged with traditional techniques"
    }
  ];

  return (
    <div className="about-page">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: "url('https://i.pinimg.com/736x/67/ec/a1/67eca13d434e8c5717066ed70cd244a3.jpg')"}}>
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-80"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-20 space-y-8">
            <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 rounded-full border border-amber-400/40 bg-amber-500/20 backdrop-blur-sm hover:bg-amber-500/30 transition-all duration-300">
              <Droplets className="w-8 h-8 text-amber-400 animate-pulse" />
              <span className="text-amber-200 font-semibold text-lg">Crafted with Love</span>
            </div>
            
            <h1 className="text-6xl md:text-6xl shimmer-text font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              About Us
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-2xl text-white leading-relaxed font-light drop-shadow-lg">
                <i>At <span className="text-amber-400 shimmer-text font-bold">LUXE</span>, we believe that jewelry is more than just adornment — it's an intimate expression of identity, emotion, and legacy.</i>
              </p>
              <p className="text-2xl text-gray-200 leading-relaxed drop-shadow-lg">
                Our collections are crafted for those who seek timeless beauty, modern sophistication, and uncompromising quality.
              </p>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                  hoveredCard === index
                    ? 'border-amber-400/60 bg-amber-500/20 transform scale-105 shadow-2xl shadow-amber-500/20'
                    : 'border-gray-400/30 bg-gray-900/40 hover:border-amber-400/40'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-4 rounded-full transition-all duration-300 ${
                    hoveredCard === index 
                      ? 'bg-amber-500/30 text-amber-300' 
                      : 'bg-gray-700/50 text-gray-300 group-hover:bg-amber-500/20 group-hover:text-amber-400'
                  }`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white drop-shadow-lg">{value.title}</h3>
                  <p className="text-gray-200 leading-relaxed drop-shadow-lg">{value.description}</p>
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  hoveredCard === index ? 'opacity-100' : ''
                }`}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-yellow-500/20 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Story Content */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-amber-500 shimmer-text mb-6 drop-shadow-lg">
                  Merging Heritage with Innovation
                </h2>
                <p className="text-lg text-gray-100 leading-relaxed drop-shadow-lg">
                  Each piece is thoughtfully designed, merging traditional craftsmanship with contemporary artistry. From delicate everyday elegance to bold statement pieces, LUXE embodies refined luxury for every occasion.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed drop-shadow-lg">
                  Our artisans bring decades of experience, ensuring every detail reflects our commitment to excellence and your unique story.
                </p>
              </div>
              
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-amber-400/30 to-purple-500/30 rounded-2xl backdrop-blur-sm border border-amber-400/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Sparkles className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
                    <p className="text-xl text-white font-semibold drop-shadow-lg">Premium Craftsmanship</p>
                    <p className="text-gray-200 drop-shadow-lg">Since 1985</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Link href="/collection">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold rounded-full hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/30">
                <span>Discover Our Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}