"use client";
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  FlameKindling, 
  BookOpen,
  Send,
  Globe,
  MessageCircle,
  DropletsIcon
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "WhatsApp",
      description: "Chat with us instantly",
      value: "+92 333 4123456",
      color: "from-amber-500 to-yellow-600"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us a detailed message",
      value: "contact@luxe.com",
      color: "from-amber-600 to-orange-600"
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram" },
    { icon: Youtube, name: "YouTube" },
    { icon: Facebook, name: "Facebook" },
  ];

  return (
    <div className="contact-page">
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
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
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .bounce-icon {
          animation: bounce 2s infinite;
        }
        
        .glow-effect {
          animation: glow 2s infinite alternate;
        }
        
        .float-effect {
          animation: float 3s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #b45309, #d97706, #f59e0b, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gold-shadow {
          text-shadow: 0 2px 4px rgba(180, 83, 9, 0.3);
        }
        
        .luxury-border {
          border-image: linear-gradient(45deg, #d97706, #f59e0b, #fbbf24, #d97706) 1;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden relative">
        {/* Luxurious Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/67/ec/a1/67eca13d434e8c5717066ed70cd244a3.jpg')] bg-cover bg-center bg-no-repeat bg-fixed opacity-80"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-amber-500/10 rounded-full blur-xl float-effect"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-xl float-effect" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl float-effect" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16 space-y-6 fade-in-up">
            <div className="mt-10 inline-flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-amber-400/60 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm hover:from-amber-500/30 hover:to-yellow-500/30 transition-all duration-300 glow-effect">
              <DropletsIcon className="w-8 h-8 text-amber-400 bounce-icon" />
              <span className="text-amber-300 font-bold text-lg tracking-wide">CONTACT US</span>
            </div>
            
            <h1 className="text-7xl md:text-6xl font-black shimmer-text gold-shadow mb-6">
              GET IN TOUCH
            </h1>
            
            <p className="text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium">
              <i>Experience luxury in every interaction. Connect with our team for an exquisite journey.</i>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Methods */}
            <div className="space-y-8 fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="space-y-8">
                <h2 className="text-4xl font-bold gradient-text mb-12 flex items-center gap-3 gold-shadow">
                  <MessageCircle className="w-10 h-10 text-amber-400 bounce-icon" />
                  Connect With Us
                </h2>
                
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    style={{animationDelay: `${0.3 + index * 0.1}s`}}
                  >
                    <div className="relative p-8 rounded-2xl bg-gradient-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-md border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:transform hover:scale-105 shadow-2xl hover:shadow-amber-400/30 glow-effect">
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${method.color} shadow-2xl group-hover:shadow-amber-300/60 transition-shadow duration-300 bounce-icon`}>
                          <method.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-amber-200 group-hover:text-amber-100 transition-colors mb-2 gold-shadow">
                            {method.title}
                          </h3>
                          <p className="text-amber-300/80 text-lg mb-2 font-medium">{method.description}</p>
                          <p className="text-amber-400 font-bold text-lg shimmer-text">{method.value}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Send className="w-7 h-7 text-amber-400 bounce-icon" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-6 fade-in-up" style={{animationDelay: '0.6s'}}>
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-3 gold-shadow">
                  <Globe className="w-7 h-7 text-amber-400 bounce-icon" />
                  Follow Us
                </h3>
                <div className="flex gap-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl bg-gradient-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-md border-2 border-amber-400/30 hover:border-amber-400/70 transition-all duration-500 hover:transform hover:scale-110 shadow-2xl hover:shadow-amber-400/30 glow-effect"
                      style={{animationDelay: `${0.7 + index * 0.1}s`}}
                    >
                      <social.icon className="w-8 h-8 text-amber-300 group-hover:text-amber-100 transition-colors bounce-icon" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-8 fade-in-up" style={{animationDelay: '0.4s'}}>
              <h2 className="text-4xl font-bold gradient-text mb-12 flex items-center gap-3 gold-shadow">
                <Send className="w-10 h-10 text-amber-400 bounce-icon" />
                Send Message
              </h2>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="text-lg font-bold text-amber-200 gold-shadow">Name</div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-xl bg-slate-800/80 backdrop-blur-md border-2 border-amber-400/30 focus:border-amber-400/70 focus:outline-none focus:ring-4 focus:ring-amber-400/20 text-amber-100 placeholder-amber-300/50 transition-all duration-300 text-lg font-medium"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-lg font-bold text-amber-200 gold-shadow">Email</div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-xl bg-slate-800/80 backdrop-blur-md border-2 border-amber-400/30 focus:border-amber-400/70 focus:outline-none focus:ring-4 focus:ring-amber-400/20 text-amber-100 placeholder-amber-300/50 transition-all duration-300 text-lg font-medium"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-lg font-bold text-amber-200 gold-shadow">Subject</div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-xl bg-slate-800/80 backdrop-blur-md border-2 border-amber-400/30 focus:border-amber-400/70 focus:outline-none focus:ring-4 focus:ring-amber-400/20 text-amber-100 placeholder-amber-300/50 transition-all duration-300 text-lg font-medium"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="text-lg font-bold text-amber-200 gold-shadow">Message</div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl bg-slate-800/80 backdrop-blur-md border-2 border-amber-400/30 focus:border-amber-400/70 focus:outline-none focus:ring-4 focus:ring-amber-400/20 text-amber-100 placeholder-amber-300/50 transition-all duration-300 resize-none text-lg font-medium"
                    placeholder="We'd love to hear from you!"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-6 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:transform hover:scale-105 shadow-2xl hover:shadow-amber-400/50 glow-effect"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-white">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 bounce-icon gold-shadow" />
                        <span className="text-white">Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;