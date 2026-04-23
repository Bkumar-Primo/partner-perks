import { Stack } from "expo-router";

import { RegistrationFlowProvider } from "@/features/auth/providers/RegistrationFlowProvider";

export default function AuthLayout() {
  return (
    <RegistrationFlowProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: "fade" }} />
      </Stack>
    </RegistrationFlowProvider>
  );
}
