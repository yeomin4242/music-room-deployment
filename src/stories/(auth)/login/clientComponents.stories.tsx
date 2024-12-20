import {
  LoginForm,
  LoginSubmitButton,
} from "@/app/_components/(auth)/login/clientComponents";

export default {
  title: "Components/Login/clientComponents", // Updated title for uniqueness
  tags: ["autodocs"], // Enable automatic documentation
  component: LoginForm, // Set the `component` key (could be any default component)
};

export const DefaultLoginForm = {
  render: () => <LoginForm />,
};

export const LoginSubmittingButton = {
  render: () => (
    <LoginSubmitButton handleSubmit={() => {}} isSubmitting={true} />
  ),
};

export const DefaultLoginSubmitButton = {
  render: () => (
    <LoginSubmitButton handleSubmit={() => {}} isSubmitting={false} />
  ),
};
