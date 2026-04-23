import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import type { FeatherIconName } from "@/features/auth/types";
import { colors, radii, spacing } from "@/theme";

export function AuthFormTextField({
  autoCapitalize = "words",
  autoComplete,
  error,
  icon,
  keyboardType = "default",
  onBlur,
  onChangeText,
  onRightIconPress,
  placeholder,
  rightIcon,
  secureTextEntry = false,
  value,
}: {
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  error?: string;
  icon?: FeatherIconName;
  keyboardType?: TextInputProps["keyboardType"];
  onBlur?: () => void;
  onChangeText: (value: string) => void;
  onRightIconPress?: () => void;
  placeholder: string;
  rightIcon?: FeatherIconName;
  secureTextEntry?: boolean;
  value: string;
}) {
  return (
    <View style={styles.group}>
      <View style={styles.field}>
        {icon ? (
          <Feather
            color={colors.textMuted}
            name={icon}
            size={16}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          keyboardAppearance="dark"
          keyboardType={keyboardType}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry}
          selectionColor={colors.text}
          style={[styles.input, icon ? styles.inputWithIcon : null]}
          value={value}
        />

        {rightIcon && onRightIconPress ? (
          <Pressable onPress={onRightIconPress} style={styles.rightIconButton}>
            <Feather color={colors.textMuted} name={rightIcon} size={17} />
          </Pressable>
        ) : null}
      </View>

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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    paddingVertical: 12,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  rightIconButton: {
    paddingLeft: 10,
  },
  error: {
    color: colors.error,
    fontSize: 10,
    marginTop: 6,
    paddingHorizontal: 4,
  },
});
