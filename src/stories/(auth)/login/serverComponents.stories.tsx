import {
  GoogleOauthButton,
  MoveToResetPasswordPage,
} from "@/app/_components/(auth)/login/serverComponents";

export default {
  title: "Components/Login/serverComponents", // Updated title for uniqueness
  tags: ["autodocs"], // Enable automatic documentation
  component: MoveToResetPasswordPage, // Set the `component` key (could be any default component)
};

export const DefaultGoogleOauthButton = {
  render: () => <GoogleOauthButton />,
};

export const DefaultMoveToResetPasswordPage = {
  render: () => <MoveToResetPasswordPage />,
};
