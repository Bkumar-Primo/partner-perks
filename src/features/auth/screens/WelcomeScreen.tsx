import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import {
  authRoutes,
  specialtyOptions,
} from "@/features/auth/constants/registration";
import { AuthPrimaryButton } from "@/features/auth/components/AuthPrimaryButton";
import { AuthScreen } from "@/features/auth/components/AuthScreen";
import { AuthSelectField } from "@/features/auth/components/AuthSelectField";
import { AuthSelectionSheet } from "@/features/auth/components/AuthSelectionSheet";
import { AuthStepHeading } from "@/features/auth/components/AuthStepHeading";
import type { RegistrationFormValues } from "@/features/auth/types";

export function WelcomeScreenRoute() {
  const router = useRouter();
  const [showSheet, setShowSheet] = useState(false);
  const { control, trigger, formState: { errors } } =
    useFormContext<RegistrationFormValues>();

  const goToLocation = async () => {
    const isValid = await trigger("specialty", { shouldFocus: true });

    if (isValid) {
      router.push(authRoutes.location);
    }
  };

  return (
    <AuthScreen backHref={authRoutes.splash}>
      <View style={styles.block}>
        <AuthStepHeading
          title="Welcome"
          subtitle="Select Your Specialty Edition"
        />

        <Controller
          control={control}
          name="specialty"
          rules={{ required: "Please select a specialty edition." }}
          render={({ field: { onChange, value } }) => (
            <>
              <AuthSelectField
                error={errors.specialty?.message}
                onPress={() => setShowSheet(true)}
                placeholder="Select Specialty"
                rightIcon="chevron-down"
                value={value}
              />

              <AuthSelectionSheet
                visible={showSheet}
                title="Select Specialty"
                placeholder="Browse specialties"
                searchable={false}
                searchValue=""
                options={specialtyOptions}
                onSearchChange={() => undefined}
                onClose={() => setShowSheet(false)}
                onSelect={(selectedValue) => {
                  onChange(selectedValue);
                  setShowSheet(false);
                }}
              />
            </>
          )}
        />

        <AuthPrimaryButton label="Next" onPress={goToLocation} />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
  },
});
