import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { AuthBackground } from "@/features/auth/components/AuthBackground";
import { useSplashAnimation } from "@/features/auth/hooks/useSplashAnimation";
import { colors, fonts } from "@/theme";

export function SplashScreenRoute() {
  const { footerAnimatedStyle, skipSplash, titleAnimatedStyle } =
    useSplashAnimation();

  return (
    <AuthBackground>
      <Pressable onPress={skipSplash} style={styles.container}>
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          PARTNER PERKS
        </Animated.Text>
        <Animated.Text style={[styles.footer, footerAnimatedStyle]}>
          PHYSICIAN&apos;S WEEKLY
        </Animated.Text>
      </Pressable>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 44,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.serif,
    fontSize: 29,
    letterSpacing: 1.4,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 42,
    color: "rgba(255,255,255,0.74)",
    fontSize: 10,
    letterSpacing: 1.8,
    textAlign: "center",
  },
});
