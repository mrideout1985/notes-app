import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto, response: any): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken({ email: user.email });

    response.cookie('token', token.Authorization, {
      httpOnly: true,
    });

    return {
      ...token,
      user,
    };
  }

  private _createToken({ email }): {
    expiresIn: string;
    Authorization: string;
  } {
    const user: JwtPayload = { email };
    const Authorization = this.jwtService.sign(user, {
      expiresIn: process.env.EXPIRESIN,
    });

    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  // pass this with the request to the controller to validate the user token and get the user data
  async validateUser(payload: string): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async logout(response): Promise<any> {
    response.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    return {
      message: 'LOGOUT_SUCCESS',
    };
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
