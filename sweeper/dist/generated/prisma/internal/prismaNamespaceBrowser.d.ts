import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Zap: "Zap";
    readonly Trigger: "Trigger";
    readonly Action: "Action";
    readonly AvailableTriggers: "AvailableTriggers";
    readonly AvailableAction: "AvailableAction";
    readonly ZapRuns: "ZapRuns";
    readonly ZapRunOutbox: "ZapRunOutbox";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ZapScalarFieldEnum: {
    readonly id: "id";
    readonly triggerId: "triggerId";
};
export type ZapScalarFieldEnum = (typeof ZapScalarFieldEnum)[keyof typeof ZapScalarFieldEnum];
export declare const TriggerScalarFieldEnum: {
    readonly id: "id";
    readonly triggerId: "triggerId";
};
export type TriggerScalarFieldEnum = (typeof TriggerScalarFieldEnum)[keyof typeof TriggerScalarFieldEnum];
export declare const ActionScalarFieldEnum: {
    readonly id: "id";
    readonly zapId: "zapId";
    readonly actionId: "actionId";
};
export type ActionScalarFieldEnum = (typeof ActionScalarFieldEnum)[keyof typeof ActionScalarFieldEnum];
export declare const AvailableTriggersScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type AvailableTriggersScalarFieldEnum = (typeof AvailableTriggersScalarFieldEnum)[keyof typeof AvailableTriggersScalarFieldEnum];
export declare const AvailableActionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type AvailableActionScalarFieldEnum = (typeof AvailableActionScalarFieldEnum)[keyof typeof AvailableActionScalarFieldEnum];
export declare const ZapRunsScalarFieldEnum: {
    readonly id: "id";
    readonly zapId: "zapId";
    readonly metadata: "metadata";
};
export type ZapRunsScalarFieldEnum = (typeof ZapRunsScalarFieldEnum)[keyof typeof ZapRunsScalarFieldEnum];
export declare const ZapRunOutboxScalarFieldEnum: {
    readonly id: "id";
    readonly zapRunId: "zapRunId";
};
export type ZapRunOutboxScalarFieldEnum = (typeof ZapRunOutboxScalarFieldEnum)[keyof typeof ZapRunOutboxScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map