// src/articles/articles.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async findUserNotes(email: string) {
    return this.prisma.article.findMany({ where: { authorEmail: email } });
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });

    return updatedArticle;
  }

  remove(id: string) {
    return this.prisma.article.delete({ where: { id } });
  }
}
