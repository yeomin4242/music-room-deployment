import { JSX, useState } from "react";
import { RegisterFormProvider } from "@/contexts/registerFormContext"; // Correct import path

import { RegisterUsernameForm } from "@/components/(auth)/register/username/clientComponents";

export default {
  title: "Components/Register/Username/clientComponents", // Updated title for uniqueness
  component: RegisterUsernameForm, // Specify the main component used for this set of stories
  tags: ["autodocs"], // Enable automatic documentation
  decorators: [
    (Story: React.FC) => (
      <RegisterFormProvider>
        <Story />
      </RegisterFormProvider>
    ),
  ],
};

export const DefaultRegisterUsernameForm = {
  render: () => <RegisterUsernameForm />,
};
