import type { ComponentProps } from "react";
import type { Feather } from "@expo/vector-icons";

export type FeatherIconName = ComponentProps<typeof Feather>["name"];

export type RegistrationFormValues = {
  specialty: string;
  location: string;
  posterLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};
