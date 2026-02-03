import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePlanInput {
    @Field()
    name: string;

    @Field()
    code: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    price: number;

    @Field({ defaultValue: 'COP' })
    currency?: string;

    @Field(() => [String])
    features: string[];
}   