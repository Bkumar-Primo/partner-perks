import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { authRoutes } from "@/features/auth/constants/registration";
import { AuthFormTextField } from "@/features/auth/components/AuthFormTextField";
import { AuthPrimaryButton } from "@/features/auth/components/AuthPrimaryButton";
import { AuthScreen } from "@/features/auth/components/AuthScreen";
import { AuthStepHeading } from "@/features/auth/components/AuthStepHeading";
import { useProtectedAuthRoute } from "@/features/auth/hooks/useProtectedAuthRoute";
import type { RegistrationFormValues } from "@/features/auth/types";

const REQUIRED_FIELDS: (keyof RegistrationFormValues)[] = [
  "specialty",
  "location",
];

export function AccountScreenRoute() {
  const router = useRouter();
  const { control, trigger, formState: { errors } } =
    useFormContext<RegistrationFormValues>();

  useProtectedAuthRoute(REQUIRED_FIELDS, authRoutes.location);

  const goToPassword = async () => {
    const isValid = await trigger(
      ["firstName", "lastName", "email", "phone"],
      { shouldFocus: true }
    );

    if (isValid) {
      router.push(authRoutes.password);
    }
  };

  return (
    <AuthScreen backHref={authRoutes.location}>
      <View style={styles.block}>
        <AuthStepHeading title="Registration" subtitle="Setup your account" />

        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name is required." }}
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              icon="user"
              error={errors.firstName?.message}
              autoComplete="given-name"
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Last name is required." }}
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              icon="user"
              error={errors.lastName?.message}
              autoComplete="family-name"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              icon="mail"
              error={errors.email?.message}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{
            validate: (value) =>
              !value ||
              /^\+?[0-9 ()-]{7,18}$/.test(value) ||
              "Please enter a valid phone number.",
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="Phone (Optional)"
              onBlur={onBlur}
              onChangeText={onChange}
              icon="phone"
              error={errors.phone?.message}
              autoComplete="tel"
              keyboardType="phone-pad"
            />
          )}
        />

        <AuthPrimaryButton label="Next" onPress={goToPassword} />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
  },
});
