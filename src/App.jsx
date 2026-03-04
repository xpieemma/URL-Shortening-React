
import { Toaster } from 'react-hot-toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Hero from './components/Hero';
import Shortener from './components/Shortener';
import LinkList from './components/LinkList';
import Statistics from './components/Statistics';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [links, setLinks] = useLocalStorage('shortenedLinks', []);

  const handleLinkShortened = (newLink) => {
    setLinks([newLink, ...links]);
  };

  const handleCopy = (linkId) => {
    setLinks(links.map(link => ({
      ...link,
      copied: link.id === linkId
    })));

    
    setTimeout(() => {
      setLinks(prevLinks => prevLinks.map(link => ({
        ...link,
        copied: false
      })));
    }, 3000);
  };

  return (
    <ErrorBoundary>
    <div className="app">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <section className="shortener-section">
          <div className="container">
            <div className="shortener-wrapper">
              <Shortener onLinkShortened={handleLinkShortened} />
              <LinkList links={links} onCopy={handleCopy} />
            </div>
          </div>
        </section>
        <Statistics />
        <CTA />
      </main>
      <Footer />
    </div>
    </ErrorBoundary>
  );
}

export default App;