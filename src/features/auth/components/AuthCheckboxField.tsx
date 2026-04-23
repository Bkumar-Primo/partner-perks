import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "@/theme";

export function AuthCheckboxField({
  checked,
  error,
  onPress,
}: {
  checked: boolean;
  error?: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress} style={styles.row}>
        <View style={[styles.box, checked ? styles.boxActive : null]}>
          {checked ? <Feather color={colors.checkboxIcon} name="check" size={12} /> : null}
        </View>

        <Text style={styles.label}>
          I have read the <Text style={styles.link}>Privacy Policy</Text> and
          agree to the <Text style={styles.link}>Terms & Conditions</Text>.
        </Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 2,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.42)",
    marginTop: 2,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  boxActive: {
    backgroundColor: colors.buttonBackground,
    borderColor: colors.buttonBackground,
  },
  label: {
    flex: 1,
    color: "rgba(255,255,255,0.82)",
    fontSize: 10,
    lineHeight: 15,
  },
  link: {
    color: colors.text,
    fontWeight: "600",
  },
  error: {
    color: colors.error,
    fontSize: 10,
    marginTop: 6,
    paddingHorizontal: spacing.xxs,
  },
});
