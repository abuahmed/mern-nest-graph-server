import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LeadModule } from './lead/lead.module';
import { AuthModule } from './auth/auth.module';

@Module({ imports: [UserModule, LeadModule, AuthModule] })
export class ComponentsModule {}
