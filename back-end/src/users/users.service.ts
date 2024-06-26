import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdatePasswordDto,
} from './dto/users.user.dto';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare passwords
    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  // Use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userInDb) {
      throw new HttpException(
        'Email already exists in the database',
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.user.create({
      data: {
        email: userDto.email,
        password: await hash(userDto.password, 10),
      },
    });
  }

  // Use by auth module to find user by login credentials
  async findByLogin({ email, password }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  // Use by auth module to get user in database by payload
  async findByPayload(email: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  // Use by user module to upload avatar
  async uploadAvatar(id: string, avatar: string): Promise<any> {
    return await this.prisma.user.update({
      where: { id },
      data: {},
    });
  }
}
