import React from "react";
import type { Href } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AuthBackground } from "@/features/auth/components/AuthBackground";
import { AuthFooter } from "@/features/auth/components/AuthFooter";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { useRegistrationFlowContext } from "@/features/auth/providers/RegistrationFlowProvider";
import { spacing } from "@/theme";

export function AuthScreen({
  backHref,
  children,
}: {
  backHref: Href;
  children: React.ReactNode;
}) {
  const { showLoginPlaceholder } = useRegistrationFlowContext();

  return (
    <AuthBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.frame}>
            <View>
              <AuthHeader backHref={backHref} />
              {children}
            </View>

            <AuthFooter onLoginPress={showLoginPlaceholder} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 6,
    paddingBottom: 18,
  },
  frame: {
    flex: 1,
    justifyContent: "space-between",
  },
});
