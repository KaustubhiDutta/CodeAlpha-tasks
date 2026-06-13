import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { UserCircle } from 'lucide-react';

const Navbar = ({
  onProfileClick
}) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                TravelTalk
              </h1>
              <p className="text-xs text-gray-500">SPEAK THE WORLD</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">

<button
onClick={onProfileClick}
className="
p-2
rounded-lg
bg-gray-800
hover:bg-gray-700
transition
"
>
<UserCircle className="w-5 h-5 text-cyan-400" />
</button>



</div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;