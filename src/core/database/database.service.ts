import { Injectable } from '@nestjs/common';
import { MikroORM, EntityManager } from '@mikro-orm/postgresql'
@Injectable()
export class DatabaseService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) {}

    get ormInstance(): MikroORM {
        return this.orm;
    }

    get emInstance(): EntityManager {
        return this.em;
    }

    async persist<T extends object>(entity: T): Promise<T> {
        await this.em.persist(entity).flush();
        return entity;
    }

    async remove<T extends object>(entity: T): Promise<void> {
        await this.em.remove(entity).flush();
    }

    async transactional<T>(fn: (em: EntityManager) => Promise<T>){
        return this.em.transactional(fn);
    }
}
