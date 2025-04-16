"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { NeoButton } from "@/components/ui/neo-button";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>
        <p className="mt-2 text-gray-600">
          {isLogin
            ? "Please sign in to continue"
            : "Sign up to start diagnosing plant diseases"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            required
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-100 p-3 text-red-600">{error}</div>
        )}

        <NeoButton type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
        </NeoButton>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-sm text-gray-600 hover:text-gray-800"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
