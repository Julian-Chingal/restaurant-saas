import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PlansService {
    constructor(private readonly prisma: PrismaClient) { }
}
