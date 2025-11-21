import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class DeleteCountryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const token = req.headers['x-admin-token'];

    if (!token) {
      throw new UnauthorizedException(
        'Missing x-admin-token header for authorization',
      );
    }

    if (token !== 'super-secret-token') {
      throw new ForbiddenException('Invalid admin token');
    }

    return true;
  }
}
