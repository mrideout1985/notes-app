import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/users.user.dto';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   The JwtAuthGuard is responsible for verifying that a JSON Web Token (JWT) is present in the request and that
  // it is valid. If the JWT is present and valid, the request will be allowed to proceed.
  // If the JWT is not present or is not valid, the request will be rejected and an appropriate error response will be sent to the client.
  //   @UseGuards(JwtAuthGuard)
  //   @ApiSecurity('access-key')
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @Get('authenticated')
  //   public async authenticated(@Request() req) {
  //     return req.user;
  //   }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }
}
