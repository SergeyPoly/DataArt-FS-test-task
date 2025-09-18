import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { plainToClass } from 'class-transformer';
import { UserService } from '../user/user.service';
import { TokenPayload } from './types/token-payload.interface';
import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET must be defined in the .env file.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: TokenPayload): Promise<UserResponseDto> {
    const { sub } = payload;
    const user = await this.userService.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
  }
}
