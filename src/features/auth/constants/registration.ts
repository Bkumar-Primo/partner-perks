import type { Href } from "expo-router";

import type { RegistrationFormValues } from "@/features/auth/types";

export const specialtyOptions = [
  "Cardiology",
  "Dermatology",
  "General Medicine",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];

export const locationOptions = [
  "Ahmedabad Central Clinic",
  "Bangalore North Hub",
  "Delhi South Center",
  "Hyderabad Jubilee Hills",
  "Kolkata Riverside Office",
  "Mumbai Andheri Branch",
];

export const authRoutes = {
  splash: "/(auth)" as Href,
  welcome: "/(auth)/welcome" as Href,
  location: "/(auth)/location" as Href,
  account: "/(auth)/account" as Href,
  password: "/(auth)/password" as Href,
} as const;

export const registrationDefaultValues: RegistrationFormValues = {
  specialty: "",
  location: "",
  posterLocation: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};
