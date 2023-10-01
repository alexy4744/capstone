/**
 * An error thrown by the AuthProvider when an authentication operation fails. You can use this to
 * display a user-friendly error message to the user.
 */
export class AuthError extends Error {
  public readonly code: string;

  /**
   * @param code The error code from Firebase auth
   * @param message The user-friendly error message
   */
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}
