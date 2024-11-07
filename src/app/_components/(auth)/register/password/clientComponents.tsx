"use client";

import React from "react";
import Link from "next/link";
import {
	RegisterPasswordErrorIcon,
	ShowPasswordIcon,
	HidePasswordIcon,
} from "@/public/icons/ErrorIcon";

import { useRegisterPasswordForm } from "@/hooks/useRegisterPasswordForm";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";

export function RegisterPasswordForm() {
	const { password, setPassword, error, submitted, isFormValid, handleSubmit } =
		useRegisterPasswordForm();

	const getErrorIcon = (conditionMet: boolean) => {
		return (
			<span
				className={`inline-flex w-5 h-5 rounded-full items-center justify-center ${
					conditionMet
						? "bg-green-500 text-white"
						: "bg-transparent border border-gray-400"
				}`}
			>
				{conditionMet && <RegisterPasswordErrorIcon />}
			</span>
		);
	};

	return (
		<form
			className="w-full max-w-xs text-left mb-4"
			onSubmit={(e) => e.preventDefault()}
		>
			<PasswordInput
				password={password}
				setPassword={setPassword}
				error={error}
				submitted={submitted}
			/>
			<PasswordValidationErrors
				error={error}
				submitted={submitted}
				getErrorIcon={getErrorIcon}
			/>
			<PasswordSubmitButton
				isFormValid={isFormValid}
				handleSubmit={handleSubmit}
			/>
		</form>
	);
}

interface PasswordInputProps {
	password: string;
	setPassword: (password: string) => void;
	error: { length: boolean; uppercase: boolean; specialChar: boolean };
	submitted: boolean;
}

export function PasswordInput({
	password,
	setPassword,
	error,
	submitted,
}: PasswordInputProps) {
	const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

	return (
		<div className="w-full mb-4">
			<p className="mb-2 font-bold text-sm">비밀번호</p>
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="비밀번호"
					className={`w-full border ${
						submitted && (error.length || error.uppercase || error.specialChar)
							? "border-red-500"
							: "border-gray-300"
					} p-4 rounded`}
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute inset-y-0 right-3 flex items-center"
					style={{ top: "50%", transform: "translateY(-50%)" }}
				>
					{showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
				</button>
			</div>
		</div>
	);
}

interface PasswordValidationErrorsProps {
	error: { length: boolean; uppercase: boolean; specialChar: boolean };
	submitted: boolean;
	getErrorIcon: (conditionMet: boolean) => JSX.Element;
}

export function PasswordValidationErrors({
	error,
	submitted,
	getErrorIcon,
}: PasswordValidationErrorsProps) {
	return (
		<div className="w-full mb-8">
			<p className="text-sm mb-2 font-bold">
				비밀번호에는 다음 문자가 반드시 포함되어야 합니다:
			</p>
			<div className="text-xs">
				<label
					className={`flex items-center mb-2 ${
						submitted && error.length ? "text-red-500" : "text-black"
					}`}
				>
					{getErrorIcon(!error.length)} <span className="ml-2">10자 이상</span>
				</label>
				<label
					className={`flex items-center mb-2 ${
						submitted && error.uppercase ? "text-red-500" : "text-black"
					}`}
				>
					{getErrorIcon(!error.uppercase)}{" "}
					<span className="ml-2">영어 대문자 1개 이상</span>
				</label>
				<label
					className={`flex items-center mb-2 ${
						submitted && error.specialChar ? "text-red-500" : "text-black"
					}`}
				>
					{getErrorIcon(!error.specialChar)}{" "}
					<span className="ml-2">특수문자 1개 이상 (예: !@#$%^&*)</span>
				</label>
			</div>
		</div>
	);
}

interface PasswordSubmitButtonProps {
	isFormValid: boolean;
	handleSubmit: () => void;
}

export function PasswordSubmitButton({
	isFormValid,
	handleSubmit,
}: PasswordSubmitButtonProps) {
	const registerUsernameUrl =
		process.env.NEXT_PUBLIC_REGISTRATION_USERNAME || "/error";

	return isFormValid ? (
		<Link href={registerUsernameUrl}>
			<button className="w-full p-3 mb-4 bg-purple-AC25FF text-white rounded-full hover:bg-[#ac44ff] font-normal">
				다음
			</button>
		</Link>
	) : (
		<button
			onClick={handleSubmit}
			className={`w-full p-3 mb-4 bg-purple-AC25FF text-white rounded-full hover:bg-[#ac44ff] font-normal`}
		>
			다음
		</button>
	);
}
