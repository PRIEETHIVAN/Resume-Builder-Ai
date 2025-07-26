import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevantCoursework?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  responsibilities: string;
  achievements?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
  duration?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: string;
  expirationDate?: string;
  credentialId?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string;
}

export interface ResumeData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  
  // Professional Summary
  professionalSummary: string;
  
  // Sections
  education: Education[];
  experience: Experience[];
  technicalSkills: string;
  softSkills: string;
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  
  // Additional Sections
  achievements?: string;
  volunteering?: string;
  publications?: string;
  hobbies?: string;
  
  // AI Enhancement
  isAIEnhanced: boolean;
  aiSuggestions?: string[];
  targetJobTitle?: string;
  targetIndustry?: string;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData> }
  | { type: 'UPDATE_EDUCATION'; payload: Education[] }
  | { type: 'UPDATE_EXPERIENCE'; payload: Experience[] }
  | { type: 'UPDATE_PROJECTS'; payload: Project[] }
  | { type: 'UPDATE_CERTIFICATIONS'; payload: Certification[] }
  | { type: 'UPDATE_LANGUAGES'; payload: Language[] }
  | { type: 'UPDATE_SKILLS'; payload: { technicalSkills: string; softSkills: string } }
  | { type: 'UPDATE_ADDITIONAL_INFO'; payload: Partial<ResumeData> }
  | { type: 'SET_AI_ENHANCED'; payload: boolean }
  | { type: 'SET_AI_SUGGESTIONS'; payload: string[] }
  | { type: 'SET_TARGET_JOB'; payload: { jobTitle: string; industry: string } }
  | { type: 'RESET_RESUME' };

const initialState: ResumeData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  linkedIn: '',
  github: '',
  portfolio: '',
  professionalSummary: '',
  education: [],
  experience: [],
  technicalSkills: '',
  softSkills: '',
  projects: [],
  certifications: [],
  languages: [],
  achievements: '',
  volunteering: '',
  publications: '',
  hobbies: '',
  isAIEnhanced: false,
  aiSuggestions: [],
  targetJobTitle: '',
  targetIndustry: ''
};

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, ...action.payload };
    case 'UPDATE_EDUCATION':
      return { ...state, education: action.payload };
    case 'UPDATE_EXPERIENCE':
      return { ...state, experience: action.payload };
    case 'UPDATE_PROJECTS':
      return { ...state, projects: action.payload };
    case 'UPDATE_CERTIFICATIONS':
      return { ...state, certifications: action.payload };
    case 'UPDATE_LANGUAGES':
      return { ...state, languages: action.payload };
    case 'UPDATE_SKILLS':
      return { ...state, ...action.payload };
    case 'UPDATE_ADDITIONAL_INFO':
      return { ...state, ...action.payload };
    case 'SET_AI_ENHANCED':
      return { ...state, isAIEnhanced: action.payload };
    case 'SET_AI_SUGGESTIONS':
      return { ...state, aiSuggestions: action.payload };
    case 'SET_TARGET_JOB':
      return { 
        ...state, 
        targetJobTitle: action.payload.jobTitle,
        targetIndustry: action.payload.industry
      };
    case 'RESET_RESUME':
      return initialState;
    default:
      return state;
  }
}

interface ResumeContextType {
  resumeData: ResumeData;
  dispatch: React.Dispatch<ResumeAction>;
  updatePersonalInfo: (data: Partial<ResumeData>) => void;
  updateEducation: (education: Education[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateLanguages: (languages: Language[]) => void;
  updateSkills: (technicalSkills: string, softSkills: string) => void;
  updateAdditionalInfo: (data: Partial<ResumeData>) => void;
  setAIEnhanced: (enhanced: boolean) => void;
  setAISuggestions: (suggestions: string[]) => void;
  setTargetJob: (jobTitle: string, industry: string) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialState);

  const updatePersonalInfo = (data: Partial<ResumeData>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
  };

  const updateEducation = (education: Education[]) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: education });
  };

  const updateExperience = (experience: Experience[]) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: experience });
  };

  const updateProjects = (projects: Project[]) => {
    dispatch({ type: 'UPDATE_PROJECTS', payload: projects });
  };

  const updateCertifications = (certifications: Certification[]) => {
    dispatch({ type: 'UPDATE_CERTIFICATIONS', payload: certifications });
  };

  const updateLanguages = (languages: Language[]) => {
    dispatch({ type: 'UPDATE_LANGUAGES', payload: languages });
  };

  const updateSkills = (technicalSkills: string, softSkills: string) => {
    dispatch({ type: 'UPDATE_SKILLS', payload: { technicalSkills, softSkills } });
  };

  const updateAdditionalInfo = (data: Partial<ResumeData>) => {
    dispatch({ type: 'UPDATE_ADDITIONAL_INFO', payload: data });
  };

  const setAIEnhanced = (enhanced: boolean) => {
    dispatch({ type: 'SET_AI_ENHANCED', payload: enhanced });
  };

  const setAISuggestions = (suggestions: string[]) => {
    dispatch({ type: 'SET_AI_SUGGESTIONS', payload: suggestions });
  };

  const setTargetJob = (jobTitle: string, industry: string) => {
    dispatch({ type: 'SET_TARGET_JOB', payload: { jobTitle, industry } });
  };

  const resetResume = () => {
    dispatch({ type: 'RESET_RESUME' });
  };

  const value: ResumeContextType = {
    resumeData,
    dispatch,
    updatePersonalInfo,
    updateEducation,
    updateExperience,
    updateProjects,
    updateCertifications,
    updateLanguages,
    updateSkills,
    updateAdditionalInfo,
    setAIEnhanced,
    setAISuggestions,
    setTargetJob,
    resetResume
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};