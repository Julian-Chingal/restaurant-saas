import { Module } from '@nestjs/common';
import { PlansResolver } from './plans.resolver';
import { PlansService } from './plans.service';

@Module({
  providers: [PlansResolver, PlansService],
})
export class PlansModule { }
