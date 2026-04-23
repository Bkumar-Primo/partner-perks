import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { FeatherIconName } from "@/features/auth/types";
import { colors, radii, spacing } from "@/theme";

export function AuthSelectField({
  error,
  onPress,
  placeholder,
  rightIcon,
  value,
}: {
  error?: string;
  onPress: () => void;
  placeholder: string;
  rightIcon: FeatherIconName;
  value: string;
}) {
  return (
    <View style={styles.group}>
      <Pressable onPress={onPress} style={styles.field}>
        <Text style={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </Text>

        <Feather color={colors.textMuted} name={rightIcon} size={18} />
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: spacing.sm,
  },
  field: {
    minHeight: 44,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    color: colors.text,
    fontSize: 12,
  },
  placeholder: {
    color: colors.placeholder,
    fontSize: 12,
  },
  error: {
    color: colors.error,
    fontSize: 10,
    marginTop: 6,
    paddingHorizontal: 4,
  },
});
