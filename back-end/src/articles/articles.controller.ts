import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  @Get('drafts')
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  @Get('my-articles')
  async getMyArticles(
    @Query('email') email: string,
    @Query('sortBy') sortBy: Prisma.SortOrder,
  ) {
    const articles = await this.articlesService.findUserNotes(email, sortBy);
    return articles;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  @Get('my-archived-articles')
  async getMyArchivedArticles(
    @Query('email') email: string,
    @Query('sortBy') sortBy: Prisma.SortOrder,
  ) {
    const articles = await this.articlesService.findUserArchivedNotes(
      email,
      sortBy,
    );
    return articles;
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('add-to-archive/:id')
  @ApiOkResponse({ type: ArticleEntity })
  addToArchive(@Param('id') id: string) {
    return this.articlesService.archive(id, { archived: true });
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @ApiHeader({
    name: 'access-token',
    description: 'Access token',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('remove-from-archive/:id')
  @ApiOkResponse({ type: ArticleEntity })
  removeFromArchive(@Param('id') id: string) {
    return this.articlesService.archive(id, { archived: false });
  }
}
