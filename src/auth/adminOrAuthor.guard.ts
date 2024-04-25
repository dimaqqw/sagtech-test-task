import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminOrAuthorGuard implements CanActivate {
  constructor(private prisma: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params.id;
    const userId = request.user.id;

    const post = await this.prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        userId: true,
      },
    });

    if (request.user.role === 'ADMIN' || (post && post.userId === userId)) {
      return true;
    }

    throw new UnauthorizedException(
      'You are not have access to delete this post',
    );
  }
}
