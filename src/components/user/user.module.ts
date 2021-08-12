import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { User, UserSchema } from './entities/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JWT_SECRET } from 'src/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d', algorithm: 'HS256' },
    }),
  ],
  providers: [UserResolver, UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
