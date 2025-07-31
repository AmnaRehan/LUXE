'use client'; 

import { SignUp } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React from 'react';

const SignUppage = () => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-10 relative -mt-16">
       <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/67/ec/a1/67eca13d434e8c5717066ed70cd244a3.jpg')] bg-cover bg-center bg-no-repeat opacity-100 -mt-16"></div>
        
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <SignUp/>
      </motion.div>
    </div>
  );
};

export default SignUppage;