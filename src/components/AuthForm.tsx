import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../services/firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ added

interface FormData {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate(); // ✅ initialized

  const onSubmit = async (data: FormData) => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        toast.success('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        toast.success('Signed in successfully!');
      }
      navigate('/'); // ✅ redirect after login/signup
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');
      navigate('/'); // ✅ redirect after Google login
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-white/70">
          {isSignUp ? 'Sign up to build your resume' : 'Sign in to continue'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg glass-input text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('password', { required: 'Password is required', minLength: 6 })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg glass-input text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="border-t border-white/20 flex-1"></div>
        <span className="px-4 text-white/50 text-sm">or</span>
        <div className="border-t border-white/20 flex-1"></div>
      </div>

      <button
        onClick={signInWithGoogle}
        className="w-full py-3 px-4 rounded-lg glass-input hover:glass-card text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        <span>Continue with Google</span>
      </button>

      <div className="mt-8 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-white/70 hover:text-white transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
