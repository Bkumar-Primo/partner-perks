import { router } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";

import {
  authRoutes,
  registrationDefaultValues,
} from "@/features/auth/constants/registration";
import type { RegistrationFormValues } from "@/features/auth/types";

type RegistrationFlowContextValue = {
  form: UseFormReturn<RegistrationFormValues>;
  isSubmitting: boolean;
  resetFlow: () => void;
  showLoginPlaceholder: () => void;
  submitRegistration: () => void;
};

const RegistrationFlowContext =
  createContext<RegistrationFlowContextValue | null>(null);

export function RegistrationFlowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<RegistrationFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: registrationDefaultValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFlow = () => {
    form.reset(registrationDefaultValues);
  };

  const showLoginPlaceholder = () => {
    Alert.alert(
      "Login Coming Soon",
      "The login screen is not part of this registration flow yet."
    );
  };

  const submitRegistration = form.handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      Alert.alert(
        "Registration Submitted",
        `Welcome to Partner Perks, ${values.firstName}. Your registration details have been captured successfully.`
      );

      resetFlow();
      router.replace(authRoutes.welcome);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <RegistrationFlowContext.Provider
      value={{
        form,
        isSubmitting,
        resetFlow,
        showLoginPlaceholder,
        submitRegistration,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </RegistrationFlowContext.Provider>
  );
}

export function useRegistrationFlowContext() {
  const context = useContext(RegistrationFlowContext);

  if (!context) {
    throw new Error(
      "useRegistrationFlowContext must be used inside RegistrationFlowProvider."
    );
  }

  return context;
}
