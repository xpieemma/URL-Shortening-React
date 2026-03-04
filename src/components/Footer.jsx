

import iconFacebook from '../assets/icon-facebook.svg';
import iconTwitter from '../assets/icon-twitter.svg';
import iconPinterest from '../assets/icon-pinterest.svg';
import iconInstagram from '../assets/icon-instagram.svg';
import { motion } from 'framer-motion';

const footerLinks = {
  features: ['Link Shortening', 'Branded Links', 'Analytics'],
  resources: ['Blog', 'Developers', 'Support'],
  company: ['About', 'Our Team', 'Careers', 'Contact']
};

const socialIcons = [
  { icon: iconFacebook, alt: 'Facebook', url: '#' },
  { icon: iconTwitter, alt: 'Twitter', url: '#' },
  { icon: iconPinterest, alt: 'Pinterest', url: '#' },
  { icon: iconInstagram, alt: 'Instagram', url: '#' }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo">Shortly</div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div 
              key={category} 
              className="footer-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              {links.map(link => (
                <a key={link} href="#">{link}</a>
              ))}
            </motion.div>
          ))}

          <motion.div 
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {socialIcons.map((social) => (
              <motion.a
                key={social.alt}
                href={social.url}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={social.icon} alt={social.alt} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;