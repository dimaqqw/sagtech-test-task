import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(
    userDto: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    await this.usersService.create(userDto);
    const payload = { role: userDto.role, sub: userDto.email };
    const access_token = this.jwtService.sign(payload, {
      secret: 'mySecretKey',
    });

    return {
      access_token,
    };
  }

  async login(
    userDto: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const isExist = await this.usersService.findByEmail(userDto.email);
    if (!isExist) throw new BadRequestException('There is no such user');
    const passIsMatch = await bcrypt.compare(
      userDto.password,
      isExist.password,
    );
    if (!passIsMatch) throw new BadRequestException('Incorrect password');
    const payload = { role: userDto.role, sub: userDto.email };
    const access_token = this.jwtService.sign(payload, {
      secret: 'mySecretKey',
    });

    return {
      access_token,
    };
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.usersService.findByEmail(payload.sub);
    console.log(user);

    if (user) {
      return user;
    }
    return null;
  }
}
