import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPostDto: Prisma.PostCreateInput, userId: number) {
    const post = await this.databaseService.post.create({
      data: {
        ...createPostDto,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
      },
    });
    return post;
  }

  async findAll() {
    return this.databaseService.post.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.databaseService.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.post.delete({
      where: { id },
    });
  }
}
