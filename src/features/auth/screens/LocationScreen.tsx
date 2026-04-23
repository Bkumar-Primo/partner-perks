import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
  authRoutes,
  locationOptions,
} from "@/features/auth/constants/registration";
import { AuthFormTextField } from "@/features/auth/components/AuthFormTextField";
import { AuthPrimaryButton } from "@/features/auth/components/AuthPrimaryButton";
import { AuthScreen } from "@/features/auth/components/AuthScreen";
import { AuthSelectField } from "@/features/auth/components/AuthSelectField";
import { AuthSelectionSheet } from "@/features/auth/components/AuthSelectionSheet";
import { AuthStepHeading } from "@/features/auth/components/AuthStepHeading";
import { useProtectedAuthRoute } from "@/features/auth/hooks/useProtectedAuthRoute";
import type { RegistrationFormValues } from "@/features/auth/types";
import { colors } from "@/theme";

const REQUIRED_FIELDS: (keyof RegistrationFormValues)[] = ["specialty"];

export function LocationScreenRoute() {
  const router = useRouter();
  const [showSheet, setShowSheet] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { control, trigger, formState: { errors } } =
    useFormContext<RegistrationFormValues>();

  useProtectedAuthRoute(REQUIRED_FIELDS, authRoutes.welcome);

  const goToAccount = async () => {
    const isValid = await trigger("location", { shouldFocus: true });

    if (isValid) {
      router.push(authRoutes.account);
    }
  };

  return (
    <AuthScreen backHref={authRoutes.welcome}>
      <View style={styles.block}>
        <AuthStepHeading title="Registration" subtitle="Select Location" />

        <Controller
          control={control}
          name="location"
          rules={{ required: "Please choose a location." }}
          render={({ field: { onChange, value } }) => (
            <>
              <AuthSelectField
                error={errors.location?.message}
                onPress={() => setShowSheet(true)}
                placeholder="Select your Location"
                rightIcon="search"
                value={value}
              />

              <AuthSelectionSheet
                visible={showSheet}
                title="Select Location"
                placeholder="Search locations"
                searchable
                searchValue={searchValue}
                options={locationOptions}
                onSearchChange={setSearchValue}
                onClose={() => {
                  setSearchValue("");
                  setShowSheet(false);
                }}
                onSelect={(selectedValue) => {
                  onChange(selectedValue);
                  setSearchValue("");
                  setShowSheet(false);
                }}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="posterLocation"
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthFormTextField
              value={value}
              placeholder="Poster Location(Optional)"
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />

        <Text style={styles.helperText}>
          Please describe where your poster is located (e.g. Staff Office,
          Staff Breakroom, or Other).
        </Text>

        <AuthPrimaryButton label="Next" onPress={goToAccount} />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
  },
  helperText: {
    color: colors.helper,
    fontSize: 9.5,
    lineHeight: 14,
    marginTop: -2,
    marginBottom: 18,
    paddingHorizontal: 2,
  },
});
