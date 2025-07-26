import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";

interface Education {
  institution: string;
  degree: string;
  marks: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  domain: string;
  duration: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  linkedin: string;
  github: string;
  education: Education[];
  experience: Experience[];
  skills: string;
  projects: string;
}

const ResumeForm = ({ onSubmit, loading }: { onSubmit: (data: any) => void; loading: boolean }) => {
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      education: [{ institution: "", degree: "", marks: "", year: "" }],
      experience: [{ company: "", position: "", domain: "", duration: "" }],
    },
  });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });

  return (
    <motion.form
      className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex-1 min-w-[320px] max-w-md border border-white/30"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h2 className="futuristic-header mb-6">Enter Your Details</h2>
      {/* Personal Info */}
      <div className="mb-5 grid grid-cols-1 gap-4">
        <div className="flex gap-2">
          <input {...register("firstName", { required: true })} placeholder="First Name" className="futuristic-input flex-1" disabled={loading} />
          <input {...register("lastName", { required: true })} placeholder="Last Name" className="futuristic-input flex-1" disabled={loading} />
        </div>
        <input {...register("contact", { required: true })} placeholder="Contact Number" className="futuristic-input" disabled={loading} />
        <input {...register("email", { required: true })} type="email" placeholder="Email" className="futuristic-input" disabled={loading} />
        <input {...register("linkedin")} placeholder="LinkedIn Link" className="futuristic-input" disabled={loading} />
        <input {...register("github")} placeholder="GitHub Link" className="futuristic-input" disabled={loading} />
      </div>

      {/* Education */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="futuristic-label">Education</label>
          <button type="button" className="futuristic-btn px-3 py-1 text-sm" onClick={() => appendEdu({ institution: "", degree: "", marks: "", year: "" })} disabled={loading}>Add</button>
        </div>
        {eduFields.map((field, idx) => (
          <div key={field.id} className="mb-3 p-3 rounded-xl bg-white/20 flex flex-col gap-2 relative">
            <input {...register(`education.${idx}.institution` as const, { required: true })} placeholder="Institution Name" className="futuristic-input" disabled={loading} />
            <input {...register(`education.${idx}.degree` as const, { required: true })} placeholder="Degree / What you did" className="futuristic-input" disabled={loading} />
            <input {...register(`education.${idx}.marks` as const, { required: true })} placeholder="Marks (CGPA or %%)" className="futuristic-input" disabled={loading} />
            <input {...register(`education.${idx}.year` as const, { required: true })} placeholder="Year" className="futuristic-input" disabled={loading} />
            {eduFields.length > 1 && (
              <button type="button" className="absolute top-2 right-2 text-xs text-red-500 hover:underline" onClick={() => removeEdu(idx)} disabled={loading}>Remove</button>
            )}
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="futuristic-label">Experience</label>
          <button type="button" className="futuristic-btn px-3 py-1 text-sm" onClick={() => appendExp({ company: "", position: "", domain: "", duration: "" })} disabled={loading}>Add</button>
        </div>
        {expFields.map((field, idx) => (
          <div key={field.id} className="mb-3 p-3 rounded-xl bg-white/20 flex flex-col gap-2 relative">
            <input {...register(`experience.${idx}.company` as const, { required: true })} placeholder="Company Name" className="futuristic-input" disabled={loading} />
            <input {...register(`experience.${idx}.position` as const, { required: true })} placeholder="Position / Post" className="futuristic-input" disabled={loading} />
            <input {...register(`experience.${idx}.domain` as const, { required: true })} placeholder="Domain" className="futuristic-input" disabled={loading} />
            <input {...register(`experience.${idx}.duration` as const, { required: true })} placeholder="Duration (e.g. 2020-2022)" className="futuristic-input" disabled={loading} />
            {expFields.length > 1 && (
              <button type="button" className="absolute top-2 right-2 text-xs text-red-500 hover:underline" onClick={() => removeExp(idx)} disabled={loading}>Remove</button>
            )}
          </div>
        ))}
      </div>

      {/* Skills & Projects */}
      <div className="mb-5">
        <label className="futuristic-label">Skills</label>
        <textarea {...register("skills", { required: true })} placeholder="Skills (comma separated)" className="futuristic-textarea" rows={2} disabled={loading} />
      </div>
      <div className="mb-5">
        <label className="futuristic-label">Projects</label>
        <textarea {...register("projects", { required: true })} placeholder="Projects (comma separated or describe)" className="futuristic-textarea" rows={2} disabled={loading} />
      </div>

      <button
        type="submit"
        className={`futuristic-btn w-full mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Resume"}
      </button>
    </motion.form>
  );
};

export default ResumeForm;
