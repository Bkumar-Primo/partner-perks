import { useEffect, useEffectEvent } from "react";
import { useRouter } from "expo-router";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { authRoutes } from "@/features/auth/constants/registration";

export function useSplashAnimation() {
  const router = useRouter();
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(22);
  const titleScale = useSharedValue(0.94);
  const footerOpacity = useSharedValue(0);
  const footerTranslateY = useSharedValue(16);

  const navigateToWelcome = useEffectEvent(() => {
    router.replace(authRoutes.welcome);
  });

  useEffect(() => {
    titleOpacity.value = withTiming(1, {
      duration: 620,
      easing: Easing.out(Easing.cubic),
    });
    titleTranslateY.value = withTiming(0, {
      duration: 720,
      easing: Easing.out(Easing.cubic),
    });
    titleScale.value = withTiming(1, {
      duration: 780,
      easing: Easing.out(Easing.exp),
    });
    footerOpacity.value = withDelay(
      320,
      withTiming(1, {
        duration: 420,
        easing: Easing.out(Easing.quad),
      })
    );
    footerTranslateY.value = withDelay(
      320,
      withTiming(0, {
        duration: 420,
        easing: Easing.out(Easing.quad),
      })
    );

    const timer = setTimeout(() => {
      navigateToWelcome();
    }, 1900);

    return () => clearTimeout(timer);
  }, [
    footerOpacity,
    footerTranslateY,
    navigateToWelcome,
    titleOpacity,
    titleScale,
    titleTranslateY,
  ]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      { translateY: titleTranslateY.value },
      { scale: titleScale.value },
    ],
  }));

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
    transform: [{ translateY: footerTranslateY.value }],
  }));

  return {
    footerAnimatedStyle,
    skipSplash: navigateToWelcome,
    titleAnimatedStyle,
  };
}
