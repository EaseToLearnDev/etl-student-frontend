import type { InputFieldType } from "../../shared/types";

/**
 * Validates an input field for email or mobile format and sets error messages accordingly.
 */
export const validateField = (
  field: InputFieldType,
  setField: (field: InputFieldType) => void,
  type: "email" | "mobile"
) => {
  if (type === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(field.data)) {
      setField({
        ...field,
        error: "Please enter a valid email address.",
      });
      return;
    }
  }

  if (type === "mobile") {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(field.data)) {
      setField({
        ...field,
        error: "Please enter a valid 10 digit mobile number.",
      });
      return;
    }
  }

  // Clear error if validation passes
  setField({
    ...field,
    error: "",
  });
};
