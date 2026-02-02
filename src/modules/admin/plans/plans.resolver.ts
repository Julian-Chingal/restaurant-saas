import { Resolver } from '@nestjs/graphql';
import { PlanType } from './dto/plan.type';

@Resolver(() => PlanType)
export class PlansResolver {
    constructor(private readonly planService: PLan)
}
