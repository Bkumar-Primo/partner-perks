import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing } from "@/theme";

export function AuthStepHeading({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 24,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
