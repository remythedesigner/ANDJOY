import { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import AuthEmailScreen from './pages/AuthEmailScreen';
import AuthProviderScreen from './pages/AuthProviderScreen';
import OnboardingSlides from './pages/OnboardingSlides';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home';
import MapPage from './pages/Map';
import EventDetail from './pages/EventDetail';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import BilletsPage from './pages/Billets';
import ProfilePage from './pages/Profile';

type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';
type OnboardingStep = 'splash' | 'welcome' | 'auth-email' | 'auth-apple' | 'auth-google' | 'slides' | 'profile' | 'done';

export default function App() {
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('Accueil');
  const [geoGranted, setGeoGranted] = useState(false);
  const [userName, setUserName] = useState('Jane');
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingPlaces, setBookingPlaces] = useState(1);
  const [bookingMaxPlaces, setBookingMaxPlaces] = useState<number | undefined>(undefined);
  const [bookingFirstName, setBookingFirstName] = useState('');
  const [bookingLastName, setBookingLastName] = useState('');
  const [paymentAmounts, setPaymentAmounts] = useState({ subtotal: 0, serviceFee: 0 });

  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
        setShowConfirmation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing]);

  if (onboardingStep === 'splash') {
    return <SplashScreen onComplete={() => setOnboardingStep('welcome')} />;
  }

  if (onboardingStep === 'welcome') {
    return (
      <WelcomeScreen
        onApple={() => setOnboardingStep('auth-apple')}
        onGoogle={() => setOnboardingStep('auth-google')}
        onEmail={() => setOnboardingStep('auth-email')}
        onLogoTap={() => setOnboardingStep('done')}
      />
    );
  }
  if (onboardingStep === 'auth-email') {
    return <AuthEmailScreen onCompleteSignup={() => setOnboardingStep('slides')} onCompleteSignin={() => setOnboardingStep('done')} onBack={() => setOnboardingStep('welcome')} />;
  }
  if (onboardingStep === 'auth-apple') {
    return <AuthProviderScreen provider="apple" onComplete={() => setOnboardingStep('slides')} onBack={() => setOnboardingStep('welcome')} />;
  }
  if (onboardingStep === 'auth-google') {
    return <AuthProviderScreen provider="google" onComplete={() => setOnboardingStep('slides')} onBack={() => setOnboardingStep('welcome')} />;
  }
  if (onboardingStep === 'slides') {
    return <OnboardingSlides onComplete={() => setOnboardingStep('profile')} />;
  }
  if (onboardingStep === 'profile') {
    return (
      <ProfileSetup
        onComplete={(name) => { setUserName(name); setOnboardingStep('done'); }}
        geoGranted={geoGranted}
        onGeoGranted={() => setGeoGranted(true)}
      />
    );
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col min-h-svh bg-cream items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-black/10 border-t-primary animate-spin" />
          </div>
          <p className="font-sans text-[14px] text-muted">Traitement du paiement...</p>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <ConfirmationPage
        onDone={() => { setShowConfirmation(false); setShowPayment(false); setShowBooking(false); setShowEventDetail(false); setActiveTab('Billets'); }}
        persons={bookingPlaces}
        subtotal={paymentAmounts.subtotal}
        serviceFee={paymentAmounts.serviceFee}
        firstName={bookingFirstName}
        lastName={bookingLastName}
      />
    );
  }

  if (showPayment) {
    return (
      <PaymentPage
        onBack={() => setShowPayment(false)}
        subtotal={paymentAmounts.subtotal}
        serviceFee={paymentAmounts.serviceFee}
        onConfirm={() => setIsProcessing(true)}
      />
    );
  }

  if (showBooking) {
    return (
      <BookingPage
        onBack={() => setShowBooking(false)}
        initialPersons={bookingPlaces}
        maxPersons={bookingMaxPlaces}
        onPay={(subtotal, serviceFee, firstName, lastName, persons) => { setPaymentAmounts({ subtotal, serviceFee }); setBookingPlaces(persons); setBookingFirstName(firstName); setBookingLastName(lastName); setShowPayment(true); }}
      />
    );
  }

  if (showEventDetail) {
    return (
      <EventDetail
        onBack={() => setShowEventDetail(false)}
        onBook={(places, remainingSeats) => { setBookingPlaces(places); setBookingMaxPlaces(remainingSeats); setShowBooking(true); }}
      />
    );
  }

  if (activeTab === 'Carte') {
    return <MapPage onTabChange={setActiveTab} onOpenEvent={() => setShowEventDetail(true)} geoGranted={geoGranted} onGeoGranted={() => setGeoGranted(true)} />;
  }

  if (activeTab === 'Billets') {
    return <BilletsPage onTabChange={setActiveTab} />;
  }

  if (activeTab === 'Profil') {
    return <ProfilePage onTabChange={setActiveTab} onSignOut={() => setOnboardingStep('splash')} geoGranted={geoGranted} onGeoGranted={() => setGeoGranted(true)} userName={userName} />;
  }

  return <Home onTabChange={setActiveTab} onOpenEvent={() => setShowEventDetail(true)} onOpenProfile={() => setActiveTab('Profil')} geoGranted={geoGranted} onGeoGranted={() => setGeoGranted(true)} userName={userName} />;
}
