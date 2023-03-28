import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
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

  async findUserNotes(
    email: string,
    sortBy?: Prisma.SortOrder,
  ): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: {
        authorEmail: email,
      },
      orderBy: {
        createdAt: sortBy,
      },
    });

    return articles;
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
