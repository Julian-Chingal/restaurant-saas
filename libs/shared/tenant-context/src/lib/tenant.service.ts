/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
    constructor(@Inject(REQUEST) private readonly request: any) {}

    getTenantId(): string {
        return this.request.tenantId;
    }
}