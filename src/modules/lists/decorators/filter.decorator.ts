import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FilterDto } from '../dtos';
import { Type } from '../enums';

export const FilterDecorator = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const filter: FilterDto = ctx.getArgs().filter;
    if (filter) {
        if (Type[filter.type] == Type.TEST) {
            return `&$filter=${filter.column} ${Type[filter.type]} '${filter.value}' or startsWith(${
                filter.column
            },  '${filter.value}')`;
        } else {
            return `&$filter=${filter.column} ${Type[filter.type]} '${filter.value.substr(0, 4)}-01' AND  
                     ${filter.column} le '${Number(filter.value.substr(0, 4)) + 1}-01'`;
        }
    }
    return '';
});
