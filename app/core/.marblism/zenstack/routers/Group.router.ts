/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.GroupInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).group.createMany(input as any))),

        create: procedure.input($Schema.GroupInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).group.create(input as any))),

        deleteMany: procedure.input($Schema.GroupInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).group.deleteMany(input as any))),

        delete: procedure.input($Schema.GroupInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).group.delete(input as any))),

        findFirst: procedure.input($Schema.GroupInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).group.findFirst(input as any))),

        findMany: procedure.input($Schema.GroupInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).group.findMany(input as any))),

        findUnique: procedure.input($Schema.GroupInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).group.findUnique(input as any))),

        updateMany: procedure.input($Schema.GroupInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).group.updateMany(input as any))),

        update: procedure.input($Schema.GroupInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).group.update(input as any))),

        count: procedure.input($Schema.GroupInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).group.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.GroupCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.GroupCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.GroupGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.GroupGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.GroupGetPayload<T>, Context>) => Promise<Prisma.GroupGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.GroupDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.GroupDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.GroupGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.GroupGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.GroupGetPayload<T>, Context>) => Promise<Prisma.GroupGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.GroupFindFirstArgs, TData = Prisma.GroupGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.GroupFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.GroupGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.GroupFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.GroupFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.GroupGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.GroupGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.GroupFindManyArgs, TData = Array<Prisma.GroupGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.GroupFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.GroupGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.GroupFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.GroupFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.GroupGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.GroupGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.GroupFindUniqueArgs, TData = Prisma.GroupGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.GroupFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.GroupGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.GroupFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.GroupFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.GroupGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.GroupGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.GroupUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.GroupUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.GroupGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.GroupGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.GroupGetPayload<T>, Context>) => Promise<Prisma.GroupGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.GroupCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.GroupCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.GroupCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.GroupCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.GroupCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.GroupCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.GroupCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.GroupCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
