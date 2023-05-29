import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findUserNotes(
    email: string,
    sortBy?: Prisma.SortOrder,
  ): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: {
        authorEmail: email,
        archived: false,
      },
      orderBy: {
        createdAt: sortBy,
      },
    });

    return articles;
  }

  async findUserArchivedNotes(
    email: string,
    sortBy?: Prisma.SortOrder,
  ): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: {
        authorEmail: email,
        archived: true,
      },
      orderBy: {
        createdAt: sortBy,
      },
    });

    return articles;
  }

  async findOne(id: string) {
    return await this.prisma.article.findUnique({ where: { id } });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });

    return updatedArticle;
  }

  async archive(id: string, archiveArticleDto: { archived: boolean }) {
    const archiveArticle = await this.prisma.article.update({
      where: { id },
      data: archiveArticleDto,
    });

    return archiveArticle;
  }

  async remove(id: string) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
