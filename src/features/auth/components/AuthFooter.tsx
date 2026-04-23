import React from "react";
import { StyleSheet, Text } from "react-native";

import { colors } from "@/theme";

export function AuthFooter({ onLoginPress }: { onLoginPress: () => void }) {
  return (
    <Text style={styles.footerText}>
      Already have an account?{" "}
      <Text onPress={onLoginPress} style={styles.footerLink}>
        Login
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  footerText: {
    color: colors.textSubtle,
    fontSize: 10,
    textAlign: "center",
    paddingTop: 28,
    paddingBottom: 10,
  },
  footerLink: {
    color: colors.text,
    fontWeight: "600",
  },
});
