import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../services/firebase';

const Dashboard: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative z-20 container mx-auto px-4 py-8">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/resume-builder">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 rounded-xl cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-white mb-2">Resume Builder</h2>
              <p className="text-gray-300">
                Create and customize your professional resume with our interactive builder
              </p>
            </motion.div>
          </Link>

          <Link to="/preview">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 rounded-xl cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-white mb-2">Resume Preview</h2>
              <p className="text-gray-300">
                Preview and download your created resume in different formats
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
