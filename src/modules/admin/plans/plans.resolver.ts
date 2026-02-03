import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlanType } from './dtos';
import { PlansService } from './plans.service';
import { CreatePlanInput, UpdatePlanInput } from './dtos';

@Resolver(() => PlanType)
export class PlansResolver {
    constructor(private readonly planService: PlansService) { }

    @Query(() => [PlanType])
    async findAll() {
        return this.planService.findAll();
    }

    @Query(() => [PlanType])
    async findAllActive() {
        return this.planService.findAllActive();
    }

    @Query(() => PlanType, { nullable: true })
    async findOne(@Args('id') id: string) {
        return this.planService.findOne(id);
    }

    @Mutation(() => PlanType)
    async create(@Args('data') data: CreatePlanInput) {
        return this.planService.create(data);
    }

    @Mutation(() => PlanType)
    async update(@Args('id') id: string, @Args('data') data: UpdatePlanInput) {
        return this.planService.update(id, data);
    }

    @Mutation(() => PlanType)
    async remove(@Args('id') id: string) {
        return this.planService.remove(id);
    }
}
