import React from "react";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";

const ResumePreview = ({ resume, loading }: { resume: string; loading: boolean }) => {
  const handleDownload = () => {
    if (!resume) return;
    html2pdf().from(document.getElementById("resume-preview")).save("resume.pdf");
  };

  return (
    <motion.div
      className="glass-container flex-1 min-h-[400px] max-w-xl relative border border-white/30"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h2 className="futuristic-header mb-6">Preview</h2>
      <div id="resume-preview" className="whitespace-pre-wrap font-mono text-gray-800 bg-white/40 rounded-xl p-4 min-h-[200px]">
        {loading ? (
          <div className="text-center text-lg text-gray-400 animate-pulse">Generating your resume...</div>
        ) : resume ? (
          <div>{resume}</div>
        ) : (
          <div className="text-gray-400">Your generated resume will appear here.</div>
        )}
      </div>
      {resume && !loading && (
        <button
          onClick={handleDownload}
          className="futuristic-btn absolute bottom-6 right-6 px-6 py-2"
        >
          Download PDF
        </button>
      )}
    </motion.div>
  );
};

export default ResumePreview;
