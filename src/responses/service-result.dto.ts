export class ServiceResult<T> {
  isSuccess: boolean;
  message: string;
  data?: T | null;
  errorCode?: string;
  status: number;

  constructor(
    isSuccess: boolean,
    message: string,
    status: number,
    data?: T | null,
    errorCode?: string
  ) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.status = status;
    this.data = data;
    this.errorCode = errorCode;
  }

  static success<T>(
    data: T,
    message = "Operation successful",
    status = 200 
  ): ServiceResult<T> {
    return new ServiceResult(true, message, status, data);
  }

  static failure<T>(message: string, errorCode?: string, status = 400): ServiceResult<T> {
    return new ServiceResult(
      false,
      message,
      status,  // Permitir un código de estado específico para fallos
      null as unknown as T,
      errorCode
    );
  }

  static notFound<T>(message = "Resource not found"): ServiceResult<T> {
    return new ServiceResult(false, message, 404);
  }

  static businessError<T>(
    message: string,
    errorCode: string
  ): ServiceResult<T> {
    return new ServiceResult(
      false,
      message,
      409,
      null as unknown as T,
      errorCode
    );
  }

  static noContent<T>(): ServiceResult<T> {
    return new ServiceResult(true, "No Content", 204);
  }
}
