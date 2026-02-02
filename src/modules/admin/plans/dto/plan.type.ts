import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Plan de suscripcion del Saas' })
export class PlanType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    code: string;

    @Field({ nullable: true })
    description: string;

    @Field()
    price: number;

    @Field()
    currency: string;

    @Field(() => [String])
    features: string[];

    @Field()
    isActive: boolean;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
