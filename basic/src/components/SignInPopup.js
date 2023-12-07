// // SignInPopup.js
// import React from 'react';
// import SignIn from './SignIn';

// const SignInPopup = ({ onCLose }) => {
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-30">
//             <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-md rounded-lg shadow-lg">
//                 <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                 <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
//                 Flowbite
//                 </a>
//                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                     Sign in to your account
//                     </h1>
//                     {/* Include the SignIn component here */}
//                     <SignIn />
//                 </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// SignInPopup.js
import React, { useState } from 'react';
import { signInWithGoogle } from '../helpers/Auth';

const SignInPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleSignIn}
            className="w-full bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPopup;
