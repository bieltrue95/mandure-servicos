import { AppError } from './AppError';

export class ErrorHandler {
  static handle(error: unknown): AppError {
    if (error instanceof AppError) {
      this.log(error);
      return error;
    }

    if (error instanceof Error) {
      const appError = new AppError(error.message, 500, false);
      this.log(appError);
      return appError;
    }

    const unknownError = new AppError('Erro desconhecido', 500, false);
    this.log(unknownError);
    return unknownError;
  }

  static log(error: AppError): void {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${error.name}] ${error.message}`, {
        statusCode: error.statusCode,
        isOperational: error.isOperational,
        stack: error.stack,
      });
    }
  }

  static isOperational(error: unknown): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
