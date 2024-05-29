"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  const handleSignIn = async () => {
    await signIn("github", { redirectTo: "/dashboard" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center justify-center bg-custom-blue text-white w-full max-w-xs mt-4 rounded-3xl px-4 py-2 gap-2"
    >
      <img
        src="/github-icon.png"
        alt="GitHub"
        className="w-8 h-8 rounded-full"
      />
      <span>Log In with GitHub</span>
    </button>
  );
}


