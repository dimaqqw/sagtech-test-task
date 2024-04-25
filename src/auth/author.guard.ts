import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private databaseService: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params.id;

    if (!postId) {
      throw new UnauthorizedException('Post ID is missing');
    }

    const userId = request.user.id;

    const post = await this.databaseService.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        userId: true,
      },
    });

    if (!post || post.userId !== userId) {
      throw new UnauthorizedException('You are not the author of this post');
    }

    return true;
  }
}
