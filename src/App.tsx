import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Greetings from './pages/Greetings';
import Network from './pages/Network';
import Activities from './pages/Activities';
import Projects from './pages/Projects';
import Photo from './pages/Photo';
import Organization from './pages/Organization';
import Members from './pages/Members';
import Join from './pages/Join';
import Contact from './pages/Contact';
import { AuthProvider, AuthModal } from './components/Auth';
import ErrorBoundary from './components/ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/greetings" element={<Greetings />} />
                <Route path="/network" element={<Network />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/photo" element={<Photo />} />
                <Route path="/members" element={<Members />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/join" element={<Join />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <AuthModal />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
