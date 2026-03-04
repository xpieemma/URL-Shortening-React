import { motion } from 'framer-motion';
import iconBrandRecognition from '../assets/icon-brand-recognition.svg'
import iconDetailedRecords from '../assets/icon-detailed-records.svg';
import iconFullyCustomizable from '../assets/icon-fully-customizable.svg';

const features = [
  {
    id: 1,
    icon: iconBrandRecognition,
    title: 'Brand Recognition',
    description: "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content."
  },
  {
    id: 2,
    icon: iconDetailedRecords,
    title: 'Detailed Records',
    description: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.'
  },
  {
    id: 3,
    icon: iconFullyCustomizable,
    title: 'Fully Customizable',
    description: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.'
  }
];

const Statistics = () => {
  return (
    <section className="statistics">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Advanced Statistics
        </motion.h2>
        <motion.p 
          className="statistics-description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Track how your links are performing across the web with our advanced statistics dashboard.
        </motion.p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;