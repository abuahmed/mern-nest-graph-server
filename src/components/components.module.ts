import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LeadModule } from './lead/lead.module';

@Module({ imports: [UserModule, LeadModule] })
export class ComponentsModule {}
