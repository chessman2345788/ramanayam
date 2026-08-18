import { ApiValidationError } from "@/types/api";

export class ApiError extends Error {
  statusCode: number;
  errors?: ApiValidationError[];

  constructor(message: string, statusCode = 500, errors?: ApiValidationError[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static getFriendlyMessage(error: unknown): string {
    if (error instanceof ApiError) {
      switch (error.statusCode) {
        case 400:
          return error.message || "Invalid request parameters provided.";
        case 401:
          return "Your session has expired. Please log in again.";
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return error.message || "The requested resource was not found.";
        case 409:
          return error.message || "A conflict occurred with existing data.";
        case 422:
          return "Validation failed for submitted data.";
        case 429:
          return "Too many requests. Please wait a moment and try again.";
        case 500:
        default:
          return "A server error occurred. Please try again later.";
      }
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return "Request timed out. Please check your internet connection.";
      }
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        return "Network connection failed. Unable to reach backend server.";
      }
      return error.message;
    }

    return "An unexpected error occurred.";
  }
}
