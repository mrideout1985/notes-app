// src/articles/articles.module.ts

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    PrismaService,
    UsersService,
    AuthService,
    JwtService,
  ],
  imports: [PrismaModule],
})
export class ArticlesModule {}
