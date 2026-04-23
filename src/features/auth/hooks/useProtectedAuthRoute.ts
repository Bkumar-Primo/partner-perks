import { useEffect } from "react";
import { useRouter, type Href } from "expo-router";
import { useFormContext } from "react-hook-form";

import type { RegistrationFormValues } from "@/features/auth/types";

export function useProtectedAuthRoute(
  requiredFields: (keyof RegistrationFormValues)[],
  redirectHref: Href
) {
  const router = useRouter();
  const { getValues } = useFormContext<RegistrationFormValues>();

  useEffect(() => {
    const fieldValues = getValues(requiredFields);
    const values = Array.isArray(fieldValues) ? fieldValues : [fieldValues];

    const hasRequiredValues = values.every((value) => {
      if (typeof value === "boolean") {
        return value;
      }

      return Boolean(String(value ?? "").trim());
    });

    if (!hasRequiredValues) {
      router.replace(redirectHref);
    }
  }, [getValues, redirectHref, requiredFields, router]);
}
