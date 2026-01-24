import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSlides from './components/InfoSlides';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <WelcomeModal />
              <Navbar />
              <main>
                <Hero />
                <InfoSlides />
                <Schedule />
                <Prizes />
              </main>
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <Navbar />
              <RegistrationForm />
              <Footer />
            </>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
