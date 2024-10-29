"use client";

import React, { useState } from "react";
// Assuming ShowPasswordIcon and HidePasswordIcon are available components
import { ShowPasswordIcon, HidePasswordIcon } from "@/public/icons/ErrorIcon";

import { LoginByEmailAndPassword } from "@/auth/login/api/router";
import { useLoginForm } from "@/hooks/useLoginForm";

// LoginForm component to submit API request and handle responses
//TODO: 이메일, 비밀번호 REGEX 검사 추가

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    isSubmitting,
    handleLogin,
  } = useLoginForm();

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Email Input Field */}
      <EmailInputField email={email} setEmail={setEmail} />

      {/* Password Input Field */}
      <PasswordInputField password={password} setPassword={setPassword} />

      {/* Error message display */}
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      {/* Submit button */}
      <LoginSubmitButton
        handleSubmit={handleLogin}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

// Email Input Field
export function EmailInputField({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
}) {
  return (
    <div className="w-80 mb-4 text-left">
      <label className="block text-sm font-bold mb-2" htmlFor="email">
        이메일
      </label>
      <input
        type="email"
        id="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded"
      />
    </div>
  );
}

// Password Input Field
export function PasswordInputField({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (password: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-80 mb-4">
      <p className="mb-2 font-bold text-sm">비밀번호</p>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full border border-gray-300 p-3 rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </button>
      </div>
    </div>
  );
}

interface LoginSubmitButtonProps {
  handleSubmit: () => void;
  isSubmitting: boolean; // To indicate loading state
}

export function LoginSubmitButton({
  handleSubmit,
  isSubmitting,
}: LoginSubmitButtonProps) {
  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting} // Disable the button while submitting
      className={`w-80 p-3 text-white rounded-full font-bold mb-4 ${
        isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-purple-AC25FF hover:bg-[#ac44ff]"
      }`}
    >
      {isSubmitting ? "로그인 중..." : "로그인하기"}
    </button>
  );
}
