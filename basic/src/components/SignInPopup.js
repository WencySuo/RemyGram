// SignInPopup.js
import React, { useState } from 'react';
import { signInWithGoogle } from '../helpers/Auth';

const SignInPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password] = useState('');

  const handleSignIn = async () => {
    try {
      // Replace this with your actual sign-in logic
      await signInWithGoogle(email, password);

      // Close the popup after successful sign-in
      onClose();
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in error
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleSignIn}
            className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPopup;
