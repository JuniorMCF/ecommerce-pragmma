
export class LoginValidator {
  static async validateLogin( email: string, password: string): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];

    // Validations
    if (!email) {
      errors.push("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push("Email format is invalid");
      }
    }

    if (!password) {
      errors.push("Password is required");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
