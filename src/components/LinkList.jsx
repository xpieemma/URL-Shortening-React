
import { AnimatePresence } from 'framer-motion';
import LinkItem from './LinkItem';

const LinkList = ({ links, onCopy }) => {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="links-list">
      <AnimatePresence>
        {links.map((link) => (
          <LinkItem 
            key={link.id} 
            link={link} 
            onCopy={onCopy}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LinkList;