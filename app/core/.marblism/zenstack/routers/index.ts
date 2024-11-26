/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createCategoryRouter from "./Category.router";
import createProjectRouter from "./Project.router";
import createGroupRouter from "./Group.router";
import createExpenseRouter from "./Expense.router";
import createGroupMemberRouter from "./GroupMember.router";
import createPaymentRouter from "./Payment.router";
import createNotificationRouter from "./Notification.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as CategoryClientType } from "./Category.router";
import { ClientType as ProjectClientType } from "./Project.router";
import { ClientType as GroupClientType } from "./Group.router";
import { ClientType as ExpenseClientType } from "./Expense.router";
import { ClientType as GroupMemberClientType } from "./GroupMember.router";
import { ClientType as PaymentClientType } from "./Payment.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        category: createCategoryRouter(router, procedure),
        project: createProjectRouter(router, procedure),
        group: createGroupRouter(router, procedure),
        expense: createExpenseRouter(router, procedure),
        groupMember: createGroupMemberRouter(router, procedure),
        payment: createPaymentRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    category: CategoryClientType<AppRouter>;
    project: ProjectClientType<AppRouter>;
    group: GroupClientType<AppRouter>;
    expense: ExpenseClientType<AppRouter>;
    groupMember: GroupMemberClientType<AppRouter>;
    payment: PaymentClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
}
