import { useState } from 'react';
import { motion } from 'framer-motion';

import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';

const LinkItem = ({ link, onCopy }) => {
  const [_, setIsHovered] = useState(false);

  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(link.shortened);
  //     onCopy(link.id);
  //     toast.success('Copied to clipboard!', {
  //       className: 'toast-success'
  //     });
  //   } catch {
  //     toast.error('Failed to copy');
  //   }
  // };

  const handleCopy = () => {
  copy(link.shortened);
  onCopy(link.id);
  toast.success('Copied to clipboard!');
};

  return (
    <motion.div 
      className="link-item"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a 
        href={link.original} 
        className="original-link" 
        target="_blank" 
        rel="noopener noreferrer"
        title={link.original}
      >
        {link.original}
      </a>

      <a 
        href={link.shortened} 
        className="shortened-link" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {link.shortened}
      </a>

      <button 
        className={`copy-btn ${link.copied ? 'copied' : ''}`}
        onClick={handleCopy}
      >
        {link.copied ? 'Copied!' : 'Copy'}
      </button>
    </motion.div>
  );
};

export default LinkItem;
