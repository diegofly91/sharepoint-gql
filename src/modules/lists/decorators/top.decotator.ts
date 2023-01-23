import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const TopDecorator = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const top: number = ctx.getArgs().top;
    if (top) return `&$top=${top}`;
    return '';
});
