/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NestMiddleware} from '@nestjs/common'

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: any, _: any, next: () => void) {
        if (!req.user?.tenantId) {
            throw new Error('El Tenant ID no está presente en el usuario autenticado.')
        }

        req.tenantId = req.user.tenantId    
        next()
    }
}