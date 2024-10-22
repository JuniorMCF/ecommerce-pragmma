
export class RegisterValidator {
  static async validateRegister( name: string, email: string, password: string): Promise<{ valid: boolean, errors?: string[] }> {
    const errors: string[] = [];

    // Validations
    if (!name) {
      errors.push("Name is required");
    } else if (name.length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

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
    } else {
      if (password.length < 7) {
        errors.push("Password must be at least 7 characters long");
      }
      // if (!/[A-Z]/.test(password)) {
      //   errors.push("Password must contain at least one uppercase letter");
      // }
      // if (!/[a-z]/.test(password)) {
      //   errors.push("Password must contain at least one lowercase letter");
      // }
      // if (!/[0-9]/.test(password)) {
      //   errors.push("Password must contain at least one number");
      // }
      // if (!/[!@#$%^&*]/.test(password)) {
      //   errors.push("Password must contain at least one special character (e.g. !@#$%^&*)");
      // }
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
