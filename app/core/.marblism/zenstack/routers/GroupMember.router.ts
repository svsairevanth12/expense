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

        createMany: procedure.input($Schema.GroupMemberInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).groupMember.createMany(input as any))),

        create: procedure.input($Schema.GroupMemberInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).groupMember.create(input as any))),

        deleteMany: procedure.input($Schema.GroupMemberInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).groupMember.deleteMany(input as any))),

        delete: procedure.input($Schema.GroupMemberInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).groupMember.delete(input as any))),

        findFirst: procedure.input($Schema.GroupMemberInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).groupMember.findFirst(input as any))),

        findMany: procedure.input($Schema.GroupMemberInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).groupMember.findMany(input as any))),

        findUnique: procedure.input($Schema.GroupMemberInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).groupMember.findUnique(input as any))),

        updateMany: procedure.input($Schema.GroupMemberInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).groupMember.updateMany(input as any))),

        update: procedure.input($Schema.GroupMemberInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).groupMember.update(input as any))),

        count: procedure.input($Schema.GroupMemberInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).groupMember.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.GroupMemberCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupMemberCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupMemberCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupMemberCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.GroupMemberCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupMemberCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.GroupMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.GroupMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupMemberCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupMemberCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.GroupMemberGetPayload<T>, Context>) => Promise<Prisma.GroupMemberGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.GroupMemberDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupMemberDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupMemberDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupMemberDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.GroupMemberDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupMemberDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.GroupMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.GroupMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupMemberDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupMemberDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.GroupMemberGetPayload<T>, Context>) => Promise<Prisma.GroupMemberGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.GroupMemberFindFirstArgs, TData = Prisma.GroupMemberGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.GroupMemberFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.GroupMemberGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.GroupMemberFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.GroupMemberFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.GroupMemberGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.GroupMemberGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.GroupMemberFindManyArgs, TData = Array<Prisma.GroupMemberGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.GroupMemberFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.GroupMemberGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.GroupMemberFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.GroupMemberFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.GroupMemberGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.GroupMemberGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.GroupMemberFindUniqueArgs, TData = Prisma.GroupMemberGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.GroupMemberFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.GroupMemberGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.GroupMemberFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.GroupMemberFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.GroupMemberGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.GroupMemberGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.GroupMemberUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupMemberUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupMemberUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupMemberUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.GroupMemberUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.GroupMemberUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.GroupMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.GroupMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.GroupMemberUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.GroupMemberUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.GroupMemberGetPayload<T>, Context>) => Promise<Prisma.GroupMemberGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.GroupMemberCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.GroupMemberCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.GroupMemberCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.GroupMemberCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.GroupMemberCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.GroupMemberCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.GroupMemberCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.GroupMemberCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
