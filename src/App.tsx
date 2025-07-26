import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebase';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Scene3D from './components/Scene3D';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ResumeBuilder from './components/ResumeBuilder';
import ResumePreview from './components/ResumePreview';
import { ResumeProvider } from './components/ResumeContext';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <Scene3D />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
        <motion.div
          className="relative z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full"></div>
          <div className="absolute inset-2 w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-auto relative">
        <Scene3D />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 pointer-events-none" />
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 32px 0 rgba(0,0,0,0.15)'
            }
          }}
        />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <LandingPage />
                ) : (
                  <Navigate to="/builder" replace />
                )
              }
            />
            <Route
              path="/builder"
              element={
                user ? (
                  <>
                    <Header />
                    <motion.div
                      className="z-20 relative max-w-7xl mx-auto p-4 pt-24"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                        <ResumeBuilder />
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/preview"
              element={
                user ? (
                  <>
                    <Header />
                    <motion.div
                      className="z-20 relative max-w-4xl mx-auto p-4 pt-24"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                        <ResumePreview resume="" loading={false} />
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </ResumeProvider>
  );
}

export default App;
