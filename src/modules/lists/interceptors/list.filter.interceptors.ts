import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../interfaces';

@Injectable()
export class ListFilterInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<List[]> {
        const filters = ['wte', 'Events'];
        return next.handle().pipe(
            map((res: List[]) => {
                return res.filter((item: List) => !filters.includes(item.name));
            }),
        );
    }
}
