import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { authRoutes } from "@/features/auth/constants/registration";
import { AuthCheckboxField } from "@/features/auth/components/AuthCheckboxField";
import { AuthFormTextField } from "@/features/auth/components/AuthFormTextField";
import { AuthPrimaryButton } from "@/features/auth/components/AuthPrimaryButton";
import { AuthScreen } from "@/features/auth/components/AuthScreen";
import { AuthStepHeading } from "@/features/auth/components/AuthStepHeading";
import { useProtectedAuthRoute } from "@/features/auth/hooks/useProtectedAuthRoute";
import { useRegistrationFlowContext } from "@/features/auth/providers/RegistrationFlowProvider";
import type { RegistrationFormValues } from "@/features/auth/types";

const REQUIRED_FIELDS: (keyof RegistrationFormValues)[] = [
  "specialty",
  "location",
  "firstName",
  "lastName",
  "email",
];

export function PasswordScreenRoute() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isSubmitting, submitRegistration } = useRegistrationFlowContext();
  const {
    control,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>();

  useProtectedAuthRoute(REQUIRED_FIELDS, authRoutes.account);

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  useEffect(() => {
    if (!confirmPasswordValue) {
      return;
    }

    void trigger("confirmPassword");
  }, [confirmPasswordValue, passwordValue, trigger]);

  return (
    <AuthScreen backHref={authRoutes.account}>
      <View style={styles.block}>
        <AuthStepHeading
          title="Registration"
          subtitle="Create your Password"
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              icon="lock"
              error={errors.password?.message}
              autoCapitalize="none"
              autoComplete="password-new"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? "eye-off" : "eye"}
              onRightIconPress={() =>
                setShowPassword((previousState) => !previousState)
              }
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password.",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match.",
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              icon="lock"
              error={errors.confirmPassword?.message}
              autoCapitalize="none"
              autoComplete="password-new"
              secureTextEntry={!showConfirmPassword}
              rightIcon={showConfirmPassword ? "eye-off" : "eye"}
              onRightIconPress={() =>
                setShowConfirmPassword((previousState) => !previousState)
              }
            />
          )}
        />

        <Controller
          control={control}
          name="acceptedTerms"
          rules={{
            validate: (value) => value || "Please accept the terms to continue.",
          }}
          render={({ field: { onChange, value } }) => (
            <AuthCheckboxField
              checked={value}
              onPress={() => onChange(!value)}
              error={errors.acceptedTerms?.message}
            />
          )}
        />

        <AuthPrimaryButton
          label={isSubmitting ? "Submitting..." : "Submit"}
          onPress={submitRegistration}
          disabled={isSubmitting}
        />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
  },
});
