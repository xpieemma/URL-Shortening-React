
import { motion } from 'framer-motion';
import illustrationWorking from '../assets/illustration-working.svg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>More than just shorter links</h1>
            <p>
              Build your brand's recognition and get detailed insights on how your links are performing.
            </p>
            <a href="#get-started" className="btn btn-primary btn-large">
              Get Started
            </a>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={illustrationWorking} alt="Person working at desk" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;