import { Feather } from "@expo/vector-icons";
import React, { useDeferredValue } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, fonts, radii, spacing } from "@/theme";

export function AuthSelectionSheet({
  onClose,
  onSearchChange,
  onSelect,
  options,
  placeholder,
  searchValue,
  searchable,
  title,
  visible,
}: {
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onSelect: (value: string) => void;
  options: string[];
  placeholder: string;
  searchValue: string;
  searchable: boolean;
  title: string;
  visible: boolean;
}) {
  const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase());
  const filteredOptions =
    searchable && deferredSearchValue
      ? options.filter((option) =>
          option.toLowerCase().includes(deferredSearchValue)
        )
      : options;

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.root}>
        <Pressable onPress={onClose} style={styles.backdrop} />

        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          {searchable ? (
            <View style={styles.searchField}>
              <Feather
                color={colors.textMuted}
                name="search"
                size={16}
                style={styles.leftIcon}
              />
              <TextInput
                autoCapitalize="words"
                keyboardAppearance="dark"
                onChangeText={onSearchChange}
                placeholder={placeholder}
                placeholderTextColor={colors.placeholder}
                selectionColor={colors.text}
                style={styles.searchInput}
                value={searchValue}
              />
            </View>
          ) : null}

          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => onSelect(option)}
                  style={styles.optionRow}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.emptyStateText}>No results found.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.modalBackdrop,
  },
  card: {
    maxHeight: "70%",
    borderRadius: radii.xl,
    backgroundColor: colors.modalCard,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: 18,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 22,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  searchField: {
    minHeight: 44,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  leftIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    paddingVertical: 12,
  },
  optionRow: {
    minHeight: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 14,
    justifyContent: "center",
    marginBottom: 10,
  },
  optionText: {
    color: colors.text,
    fontSize: 13,
  },
  emptyStateText: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 12,
  },
});
