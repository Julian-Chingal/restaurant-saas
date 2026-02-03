import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Plan de suscripcion del Saas' })
export class PlanType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    code: string;

    @Field(() => String, { nullable: true })
    description: string | null;

    @Field()
    price: number;

    @Field()
    currency: string;

    @Field(() => [String])
    features: string[];

    @Field()
    isActive: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
