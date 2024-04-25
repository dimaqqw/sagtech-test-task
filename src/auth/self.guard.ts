import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;

    if (request.user.id !== Number(userId)) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    return true;
  }
}
