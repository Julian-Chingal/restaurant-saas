import { Injectable } from '@nestjs/common';
import { PrismaService, Plan } from '@prismaClient';
import { CreatePlanInput } from './dtos/create-plan.input';
import { UpdatePlanInput } from './dtos/update-plant.input';


@Injectable()
export class PlansService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Plan[]> {
        return this.prisma.plan.findMany();
    }

    async findAllActive(): Promise<Plan[]> {
        return this.prisma.plan.findMany({
            where: { isActive: true },
            orderBy: { price: 'asc' },
        });
    }

    async findOne(id: string): Promise<Plan | null> {
        return this.prisma.plan.findUnique({
            where: { id },
        });
    }

    async create(data: CreatePlanInput): Promise<Plan> {
        return this.prisma.plan.create({
            data
        });
    }

    async update(id: string, data: UpdatePlanInput): Promise<Plan> {
        return this.prisma.plan.update({
            where: { id },
            data
        });
    }

    async remove(id: string): Promise<Plan> {
        return this.prisma.plan.update({
            where: { id },
            data: { isActive: false }
        });
    }
}
