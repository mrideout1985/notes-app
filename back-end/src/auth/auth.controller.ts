import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../users/dto/users.user.dto';
import { AuthService, RegistrationStatus } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    }
    return result;
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true })
    response: any,
  ): Promise<any> {
    return await this.authService.login(loginUserDto, response);
  }

  @Post('logout')
  public async logout(@Res({ passthrough: true }) response: any) {
    return await this.authService.logout(response);
  }
}
