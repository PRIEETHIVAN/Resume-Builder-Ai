import React, { useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { generateResume } from "../services/gemini";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ResumeBuilder: React.FC = () => {
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateResume = async (details: any) => {
    setLoading(true);
    setResume("");
    try {
      const result = await generateResume(details);
      setResume(result);
      toast.success("Resume generated successfully!");
    } catch (err) {
      toast.error("Failed to generate resume. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-10 items-start glass-container p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex-1 futuristic-section md:pr-8">
        <ResumeForm onSubmit={handleGenerateResume} loading={loading} />
      </div>
      <div className="flex-1 md:pl-8">
        <ResumePreview resume={resume} loading={loading} />
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;
