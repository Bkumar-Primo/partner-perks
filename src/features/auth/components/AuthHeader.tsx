import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing } from "@/theme";

export function AuthHeader({ backHref }: { backHref: Href }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace(backHref)}
        style={styles.iconButton}
      >
        <Feather color={colors.text} name="chevron-left" size={20} />
      </Pressable>

      <Text style={styles.title}>PW Partner Perks</Text>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xxl,
    paddingTop: 2,
  },
  iconButton: {
    width: 28,
    height: 28,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  spacer: {
    width: 28,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 18,
    letterSpacing: 0.3,
  },
});
