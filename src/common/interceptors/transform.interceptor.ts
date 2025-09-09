import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  timestamp: string;
  path: string;
  message?: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;

    return next.handle().pipe(
      map(data => {
        // If data is already a formatted response (e.g., from error handling), return as-is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Transform successful responses
        return {
          success: true,
          data,
          timestamp: new Date().toISOString(),
          path,
          message: this.getSuccessMessage(request.method, path),
        };
      }),
    );
  }

  private getSuccessMessage(method: string, path: string): string {
    const pathSegments = path.split('/').filter(segment => segment);
    const resource = pathSegments[pathSegments.length - 1] || 'resource';

    switch (method) {
      case 'GET':
        return `${resource} retrieved successfully`;
      case 'POST':
        return `${resource} created successfully`;
      case 'PUT':
      case 'PATCH':
        return `${resource} updated successfully`;
      case 'DELETE':
        return `${resource} deleted successfully`;
      default:
        return 'Operation completed successfully';
    }
  }
}