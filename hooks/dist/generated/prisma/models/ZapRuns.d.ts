import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model ZapRuns
 *
 */
export type ZapRunsModel = runtime.Types.Result.DefaultSelection<Prisma.$ZapRunsPayload>;
export type AggregateZapRuns = {
    _count: ZapRunsCountAggregateOutputType | null;
    _min: ZapRunsMinAggregateOutputType | null;
    _max: ZapRunsMaxAggregateOutputType | null;
};
export type ZapRunsMinAggregateOutputType = {
    id: string | null;
    zapId: string | null;
};
export type ZapRunsMaxAggregateOutputType = {
    id: string | null;
    zapId: string | null;
};
export type ZapRunsCountAggregateOutputType = {
    id: number;
    zapId: number;
    metadata: number;
    _all: number;
};
export type ZapRunsMinAggregateInputType = {
    id?: true;
    zapId?: true;
};
export type ZapRunsMaxAggregateInputType = {
    id?: true;
    zapId?: true;
};
export type ZapRunsCountAggregateInputType = {
    id?: true;
    zapId?: true;
    metadata?: true;
    _all?: true;
};
export type ZapRunsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ZapRuns to aggregate.
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ZapRuns to fetch.
     */
    orderBy?: Prisma.ZapRunsOrderByWithRelationInput | Prisma.ZapRunsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ZapRunsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ZapRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ZapRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ZapRuns
    **/
    _count?: true | ZapRunsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ZapRunsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ZapRunsMaxAggregateInputType;
};
export type GetZapRunsAggregateType<T extends ZapRunsAggregateArgs> = {
    [P in keyof T & keyof AggregateZapRuns]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateZapRuns[P]> : Prisma.GetScalarType<T[P], AggregateZapRuns[P]>;
};
export type ZapRunsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZapRunsWhereInput;
    orderBy?: Prisma.ZapRunsOrderByWithAggregationInput | Prisma.ZapRunsOrderByWithAggregationInput[];
    by: Prisma.ZapRunsScalarFieldEnum[] | Prisma.ZapRunsScalarFieldEnum;
    having?: Prisma.ZapRunsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ZapRunsCountAggregateInputType | true;
    _min?: ZapRunsMinAggregateInputType;
    _max?: ZapRunsMaxAggregateInputType;
};
export type ZapRunsGroupByOutputType = {
    id: string;
    zapId: string;
    metadata: runtime.JsonValue;
    _count: ZapRunsCountAggregateOutputType | null;
    _min: ZapRunsMinAggregateOutputType | null;
    _max: ZapRunsMaxAggregateOutputType | null;
};
export type GetZapRunsGroupByPayload<T extends ZapRunsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ZapRunsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ZapRunsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ZapRunsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ZapRunsGroupByOutputType[P]>;
}>>;
export type ZapRunsWhereInput = {
    AND?: Prisma.ZapRunsWhereInput | Prisma.ZapRunsWhereInput[];
    OR?: Prisma.ZapRunsWhereInput[];
    NOT?: Prisma.ZapRunsWhereInput | Prisma.ZapRunsWhereInput[];
    id?: Prisma.StringFilter<"ZapRuns"> | string;
    zapId?: Prisma.StringFilter<"ZapRuns"> | string;
    metadata?: Prisma.JsonFilter<"ZapRuns">;
    zapRunOutbox?: Prisma.XOR<Prisma.ZapRunOutboxNullableScalarRelationFilter, Prisma.ZapRunOutboxWhereInput> | null;
    zap?: Prisma.XOR<Prisma.ZapScalarRelationFilter, Prisma.ZapWhereInput>;
};
export type ZapRunsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    zapId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    zapRunOutbox?: Prisma.ZapRunOutboxOrderByWithRelationInput;
    zap?: Prisma.ZapOrderByWithRelationInput;
};
export type ZapRunsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ZapRunsWhereInput | Prisma.ZapRunsWhereInput[];
    OR?: Prisma.ZapRunsWhereInput[];
    NOT?: Prisma.ZapRunsWhereInput | Prisma.ZapRunsWhereInput[];
    zapId?: Prisma.StringFilter<"ZapRuns"> | string;
    metadata?: Prisma.JsonFilter<"ZapRuns">;
    zapRunOutbox?: Prisma.XOR<Prisma.ZapRunOutboxNullableScalarRelationFilter, Prisma.ZapRunOutboxWhereInput> | null;
    zap?: Prisma.XOR<Prisma.ZapScalarRelationFilter, Prisma.ZapWhereInput>;
}, "id">;
export type ZapRunsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    zapId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    _count?: Prisma.ZapRunsCountOrderByAggregateInput;
    _max?: Prisma.ZapRunsMaxOrderByAggregateInput;
    _min?: Prisma.ZapRunsMinOrderByAggregateInput;
};
export type ZapRunsScalarWhereWithAggregatesInput = {
    AND?: Prisma.ZapRunsScalarWhereWithAggregatesInput | Prisma.ZapRunsScalarWhereWithAggregatesInput[];
    OR?: Prisma.ZapRunsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ZapRunsScalarWhereWithAggregatesInput | Prisma.ZapRunsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ZapRuns"> | string;
    zapId?: Prisma.StringWithAggregatesFilter<"ZapRuns"> | string;
    metadata?: Prisma.JsonWithAggregatesFilter<"ZapRuns">;
};
export type ZapRunsCreateInput = {
    id?: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxCreateNestedOneWithoutZapRunInput;
    zap: Prisma.ZapCreateNestedOneWithoutZapRunsInput;
};
export type ZapRunsUncheckedCreateInput = {
    id?: string;
    zapId: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxUncheckedCreateNestedOneWithoutZapRunInput;
};
export type ZapRunsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxUpdateOneWithoutZapRunNestedInput;
    zap?: Prisma.ZapUpdateOneRequiredWithoutZapRunsNestedInput;
};
export type ZapRunsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    zapId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxUncheckedUpdateOneWithoutZapRunNestedInput;
};
export type ZapRunsCreateManyInput = {
    id?: string;
    zapId: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    zapId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsListRelationFilter = {
    every?: Prisma.ZapRunsWhereInput;
    some?: Prisma.ZapRunsWhereInput;
    none?: Prisma.ZapRunsWhereInput;
};
export type ZapRunsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ZapRunsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    zapId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
};
export type ZapRunsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    zapId?: Prisma.SortOrder;
};
export type ZapRunsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    zapId?: Prisma.SortOrder;
};
export type ZapRunsScalarRelationFilter = {
    is?: Prisma.ZapRunsWhereInput;
    isNot?: Prisma.ZapRunsWhereInput;
};
export type ZapRunsCreateNestedManyWithoutZapInput = {
    create?: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapInput, Prisma.ZapRunsUncheckedCreateWithoutZapInput> | Prisma.ZapRunsCreateWithoutZapInput[] | Prisma.ZapRunsUncheckedCreateWithoutZapInput[];
    connectOrCreate?: Prisma.ZapRunsCreateOrConnectWithoutZapInput | Prisma.ZapRunsCreateOrConnectWithoutZapInput[];
    createMany?: Prisma.ZapRunsCreateManyZapInputEnvelope;
    connect?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
};
export type ZapRunsUncheckedCreateNestedManyWithoutZapInput = {
    create?: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapInput, Prisma.ZapRunsUncheckedCreateWithoutZapInput> | Prisma.ZapRunsCreateWithoutZapInput[] | Prisma.ZapRunsUncheckedCreateWithoutZapInput[];
    connectOrCreate?: Prisma.ZapRunsCreateOrConnectWithoutZapInput | Prisma.ZapRunsCreateOrConnectWithoutZapInput[];
    createMany?: Prisma.ZapRunsCreateManyZapInputEnvelope;
    connect?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
};
export type ZapRunsUpdateManyWithoutZapNestedInput = {
    create?: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapInput, Prisma.ZapRunsUncheckedCreateWithoutZapInput> | Prisma.ZapRunsCreateWithoutZapInput[] | Prisma.ZapRunsUncheckedCreateWithoutZapInput[];
    connectOrCreate?: Prisma.ZapRunsCreateOrConnectWithoutZapInput | Prisma.ZapRunsCreateOrConnectWithoutZapInput[];
    upsert?: Prisma.ZapRunsUpsertWithWhereUniqueWithoutZapInput | Prisma.ZapRunsUpsertWithWhereUniqueWithoutZapInput[];
    createMany?: Prisma.ZapRunsCreateManyZapInputEnvelope;
    set?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    disconnect?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    delete?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    connect?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    update?: Prisma.ZapRunsUpdateWithWhereUniqueWithoutZapInput | Prisma.ZapRunsUpdateWithWhereUniqueWithoutZapInput[];
    updateMany?: Prisma.ZapRunsUpdateManyWithWhereWithoutZapInput | Prisma.ZapRunsUpdateManyWithWhereWithoutZapInput[];
    deleteMany?: Prisma.ZapRunsScalarWhereInput | Prisma.ZapRunsScalarWhereInput[];
};
export type ZapRunsUncheckedUpdateManyWithoutZapNestedInput = {
    create?: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapInput, Prisma.ZapRunsUncheckedCreateWithoutZapInput> | Prisma.ZapRunsCreateWithoutZapInput[] | Prisma.ZapRunsUncheckedCreateWithoutZapInput[];
    connectOrCreate?: Prisma.ZapRunsCreateOrConnectWithoutZapInput | Prisma.ZapRunsCreateOrConnectWithoutZapInput[];
    upsert?: Prisma.ZapRunsUpsertWithWhereUniqueWithoutZapInput | Prisma.ZapRunsUpsertWithWhereUniqueWithoutZapInput[];
    createMany?: Prisma.ZapRunsCreateManyZapInputEnvelope;
    set?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    disconnect?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    delete?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    connect?: Prisma.ZapRunsWhereUniqueInput | Prisma.ZapRunsWhereUniqueInput[];
    update?: Prisma.ZapRunsUpdateWithWhereUniqueWithoutZapInput | Prisma.ZapRunsUpdateWithWhereUniqueWithoutZapInput[];
    updateMany?: Prisma.ZapRunsUpdateManyWithWhereWithoutZapInput | Prisma.ZapRunsUpdateManyWithWhereWithoutZapInput[];
    deleteMany?: Prisma.ZapRunsScalarWhereInput | Prisma.ZapRunsScalarWhereInput[];
};
export type ZapRunsCreateNestedOneWithoutZapRunOutboxInput = {
    create?: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapRunOutboxInput, Prisma.ZapRunsUncheckedCreateWithoutZapRunOutboxInput>;
    connectOrCreate?: Prisma.ZapRunsCreateOrConnectWithoutZapRunOutboxInput;
    connect?: Prisma.ZapRunsWhereUniqueInput;
};
export type ZapRunsUpdateOneRequiredWithoutZapRunOutboxNestedInput = {
    create?: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapRunOutboxInput, Prisma.ZapRunsUncheckedCreateWithoutZapRunOutboxInput>;
    connectOrCreate?: Prisma.ZapRunsCreateOrConnectWithoutZapRunOutboxInput;
    upsert?: Prisma.ZapRunsUpsertWithoutZapRunOutboxInput;
    connect?: Prisma.ZapRunsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ZapRunsUpdateToOneWithWhereWithoutZapRunOutboxInput, Prisma.ZapRunsUpdateWithoutZapRunOutboxInput>, Prisma.ZapRunsUncheckedUpdateWithoutZapRunOutboxInput>;
};
export type ZapRunsCreateWithoutZapInput = {
    id?: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxCreateNestedOneWithoutZapRunInput;
};
export type ZapRunsUncheckedCreateWithoutZapInput = {
    id?: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxUncheckedCreateNestedOneWithoutZapRunInput;
};
export type ZapRunsCreateOrConnectWithoutZapInput = {
    where: Prisma.ZapRunsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapInput, Prisma.ZapRunsUncheckedCreateWithoutZapInput>;
};
export type ZapRunsCreateManyZapInputEnvelope = {
    data: Prisma.ZapRunsCreateManyZapInput | Prisma.ZapRunsCreateManyZapInput[];
    skipDuplicates?: boolean;
};
export type ZapRunsUpsertWithWhereUniqueWithoutZapInput = {
    where: Prisma.ZapRunsWhereUniqueInput;
    update: Prisma.XOR<Prisma.ZapRunsUpdateWithoutZapInput, Prisma.ZapRunsUncheckedUpdateWithoutZapInput>;
    create: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapInput, Prisma.ZapRunsUncheckedCreateWithoutZapInput>;
};
export type ZapRunsUpdateWithWhereUniqueWithoutZapInput = {
    where: Prisma.ZapRunsWhereUniqueInput;
    data: Prisma.XOR<Prisma.ZapRunsUpdateWithoutZapInput, Prisma.ZapRunsUncheckedUpdateWithoutZapInput>;
};
export type ZapRunsUpdateManyWithWhereWithoutZapInput = {
    where: Prisma.ZapRunsScalarWhereInput;
    data: Prisma.XOR<Prisma.ZapRunsUpdateManyMutationInput, Prisma.ZapRunsUncheckedUpdateManyWithoutZapInput>;
};
export type ZapRunsScalarWhereInput = {
    AND?: Prisma.ZapRunsScalarWhereInput | Prisma.ZapRunsScalarWhereInput[];
    OR?: Prisma.ZapRunsScalarWhereInput[];
    NOT?: Prisma.ZapRunsScalarWhereInput | Prisma.ZapRunsScalarWhereInput[];
    id?: Prisma.StringFilter<"ZapRuns"> | string;
    zapId?: Prisma.StringFilter<"ZapRuns"> | string;
    metadata?: Prisma.JsonFilter<"ZapRuns">;
};
export type ZapRunsCreateWithoutZapRunOutboxInput = {
    id?: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zap: Prisma.ZapCreateNestedOneWithoutZapRunsInput;
};
export type ZapRunsUncheckedCreateWithoutZapRunOutboxInput = {
    id?: string;
    zapId: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsCreateOrConnectWithoutZapRunOutboxInput = {
    where: Prisma.ZapRunsWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapRunOutboxInput, Prisma.ZapRunsUncheckedCreateWithoutZapRunOutboxInput>;
};
export type ZapRunsUpsertWithoutZapRunOutboxInput = {
    update: Prisma.XOR<Prisma.ZapRunsUpdateWithoutZapRunOutboxInput, Prisma.ZapRunsUncheckedUpdateWithoutZapRunOutboxInput>;
    create: Prisma.XOR<Prisma.ZapRunsCreateWithoutZapRunOutboxInput, Prisma.ZapRunsUncheckedCreateWithoutZapRunOutboxInput>;
    where?: Prisma.ZapRunsWhereInput;
};
export type ZapRunsUpdateToOneWithWhereWithoutZapRunOutboxInput = {
    where?: Prisma.ZapRunsWhereInput;
    data: Prisma.XOR<Prisma.ZapRunsUpdateWithoutZapRunOutboxInput, Prisma.ZapRunsUncheckedUpdateWithoutZapRunOutboxInput>;
};
export type ZapRunsUpdateWithoutZapRunOutboxInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zap?: Prisma.ZapUpdateOneRequiredWithoutZapRunsNestedInput;
};
export type ZapRunsUncheckedUpdateWithoutZapRunOutboxInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    zapId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsCreateManyZapInput = {
    id?: string;
    metadata: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsUpdateWithoutZapInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxUpdateOneWithoutZapRunNestedInput;
};
export type ZapRunsUncheckedUpdateWithoutZapInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    zapRunOutbox?: Prisma.ZapRunOutboxUncheckedUpdateOneWithoutZapRunNestedInput;
};
export type ZapRunsUncheckedUpdateManyWithoutZapInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type ZapRunsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    zapId?: boolean;
    metadata?: boolean;
    zapRunOutbox?: boolean | Prisma.ZapRuns$zapRunOutboxArgs<ExtArgs>;
    zap?: boolean | Prisma.ZapDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zapRuns"]>;
export type ZapRunsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    zapId?: boolean;
    metadata?: boolean;
    zap?: boolean | Prisma.ZapDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zapRuns"]>;
export type ZapRunsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    zapId?: boolean;
    metadata?: boolean;
    zap?: boolean | Prisma.ZapDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zapRuns"]>;
export type ZapRunsSelectScalar = {
    id?: boolean;
    zapId?: boolean;
    metadata?: boolean;
};
export type ZapRunsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "zapId" | "metadata", ExtArgs["result"]["zapRuns"]>;
export type ZapRunsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    zapRunOutbox?: boolean | Prisma.ZapRuns$zapRunOutboxArgs<ExtArgs>;
    zap?: boolean | Prisma.ZapDefaultArgs<ExtArgs>;
};
export type ZapRunsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    zap?: boolean | Prisma.ZapDefaultArgs<ExtArgs>;
};
export type ZapRunsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    zap?: boolean | Prisma.ZapDefaultArgs<ExtArgs>;
};
export type $ZapRunsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ZapRuns";
    objects: {
        zapRunOutbox: Prisma.$ZapRunOutboxPayload<ExtArgs> | null;
        zap: Prisma.$ZapPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        zapId: string;
        metadata: runtime.JsonValue;
    }, ExtArgs["result"]["zapRuns"]>;
    composites: {};
};
export type ZapRunsGetPayload<S extends boolean | null | undefined | ZapRunsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload, S>;
export type ZapRunsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ZapRunsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ZapRunsCountAggregateInputType | true;
};
export interface ZapRunsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ZapRuns'];
        meta: {
            name: 'ZapRuns';
        };
    };
    /**
     * Find zero or one ZapRuns that matches the filter.
     * @param {ZapRunsFindUniqueArgs} args - Arguments to find a ZapRuns
     * @example
     * // Get one ZapRuns
     * const zapRuns = await prisma.zapRuns.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ZapRunsFindUniqueArgs>(args: Prisma.SelectSubset<T, ZapRunsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ZapRuns that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ZapRunsFindUniqueOrThrowArgs} args - Arguments to find a ZapRuns
     * @example
     * // Get one ZapRuns
     * const zapRuns = await prisma.zapRuns.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ZapRunsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ZapRunsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ZapRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsFindFirstArgs} args - Arguments to find a ZapRuns
     * @example
     * // Get one ZapRuns
     * const zapRuns = await prisma.zapRuns.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ZapRunsFindFirstArgs>(args?: Prisma.SelectSubset<T, ZapRunsFindFirstArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ZapRuns that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsFindFirstOrThrowArgs} args - Arguments to find a ZapRuns
     * @example
     * // Get one ZapRuns
     * const zapRuns = await prisma.zapRuns.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ZapRunsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ZapRunsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ZapRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ZapRuns
     * const zapRuns = await prisma.zapRuns.findMany()
     *
     * // Get first 10 ZapRuns
     * const zapRuns = await prisma.zapRuns.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const zapRunsWithIdOnly = await prisma.zapRuns.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ZapRunsFindManyArgs>(args?: Prisma.SelectSubset<T, ZapRunsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ZapRuns.
     * @param {ZapRunsCreateArgs} args - Arguments to create a ZapRuns.
     * @example
     * // Create one ZapRuns
     * const ZapRuns = await prisma.zapRuns.create({
     *   data: {
     *     // ... data to create a ZapRuns
     *   }
     * })
     *
     */
    create<T extends ZapRunsCreateArgs>(args: Prisma.SelectSubset<T, ZapRunsCreateArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ZapRuns.
     * @param {ZapRunsCreateManyArgs} args - Arguments to create many ZapRuns.
     * @example
     * // Create many ZapRuns
     * const zapRuns = await prisma.zapRuns.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ZapRunsCreateManyArgs>(args?: Prisma.SelectSubset<T, ZapRunsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ZapRuns and returns the data saved in the database.
     * @param {ZapRunsCreateManyAndReturnArgs} args - Arguments to create many ZapRuns.
     * @example
     * // Create many ZapRuns
     * const zapRuns = await prisma.zapRuns.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ZapRuns and only return the `id`
     * const zapRunsWithIdOnly = await prisma.zapRuns.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ZapRunsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ZapRunsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ZapRuns.
     * @param {ZapRunsDeleteArgs} args - Arguments to delete one ZapRuns.
     * @example
     * // Delete one ZapRuns
     * const ZapRuns = await prisma.zapRuns.delete({
     *   where: {
     *     // ... filter to delete one ZapRuns
     *   }
     * })
     *
     */
    delete<T extends ZapRunsDeleteArgs>(args: Prisma.SelectSubset<T, ZapRunsDeleteArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ZapRuns.
     * @param {ZapRunsUpdateArgs} args - Arguments to update one ZapRuns.
     * @example
     * // Update one ZapRuns
     * const zapRuns = await prisma.zapRuns.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ZapRunsUpdateArgs>(args: Prisma.SelectSubset<T, ZapRunsUpdateArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ZapRuns.
     * @param {ZapRunsDeleteManyArgs} args - Arguments to filter ZapRuns to delete.
     * @example
     * // Delete a few ZapRuns
     * const { count } = await prisma.zapRuns.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ZapRunsDeleteManyArgs>(args?: Prisma.SelectSubset<T, ZapRunsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ZapRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ZapRuns
     * const zapRuns = await prisma.zapRuns.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ZapRunsUpdateManyArgs>(args: Prisma.SelectSubset<T, ZapRunsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ZapRuns and returns the data updated in the database.
     * @param {ZapRunsUpdateManyAndReturnArgs} args - Arguments to update many ZapRuns.
     * @example
     * // Update many ZapRuns
     * const zapRuns = await prisma.zapRuns.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ZapRuns and only return the `id`
     * const zapRunsWithIdOnly = await prisma.zapRuns.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ZapRunsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ZapRunsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ZapRuns.
     * @param {ZapRunsUpsertArgs} args - Arguments to update or create a ZapRuns.
     * @example
     * // Update or create a ZapRuns
     * const zapRuns = await prisma.zapRuns.upsert({
     *   create: {
     *     // ... data to create a ZapRuns
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ZapRuns we want to update
     *   }
     * })
     */
    upsert<T extends ZapRunsUpsertArgs>(args: Prisma.SelectSubset<T, ZapRunsUpsertArgs<ExtArgs>>): Prisma.Prisma__ZapRunsClient<runtime.Types.Result.GetResult<Prisma.$ZapRunsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ZapRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsCountArgs} args - Arguments to filter ZapRuns to count.
     * @example
     * // Count the number of ZapRuns
     * const count = await prisma.zapRuns.count({
     *   where: {
     *     // ... the filter for the ZapRuns we want to count
     *   }
     * })
    **/
    count<T extends ZapRunsCountArgs>(args?: Prisma.Subset<T, ZapRunsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ZapRunsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ZapRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ZapRunsAggregateArgs>(args: Prisma.Subset<T, ZapRunsAggregateArgs>): Prisma.PrismaPromise<GetZapRunsAggregateType<T>>;
    /**
     * Group by ZapRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZapRunsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ZapRunsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ZapRunsGroupByArgs['orderBy'];
    } : {
        orderBy?: ZapRunsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ZapRunsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZapRunsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ZapRuns model
     */
    readonly fields: ZapRunsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ZapRuns.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ZapRunsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    zapRunOutbox<T extends Prisma.ZapRuns$zapRunOutboxArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ZapRuns$zapRunOutboxArgs<ExtArgs>>): Prisma.Prisma__ZapRunOutboxClient<runtime.Types.Result.GetResult<Prisma.$ZapRunOutboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    zap<T extends Prisma.ZapDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ZapDefaultArgs<ExtArgs>>): Prisma.Prisma__ZapClient<runtime.Types.Result.GetResult<Prisma.$ZapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ZapRuns model
 */
export interface ZapRunsFieldRefs {
    readonly id: Prisma.FieldRef<"ZapRuns", 'String'>;
    readonly zapId: Prisma.FieldRef<"ZapRuns", 'String'>;
    readonly metadata: Prisma.FieldRef<"ZapRuns", 'Json'>;
}
/**
 * ZapRuns findUnique
 */
export type ZapRunsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * Filter, which ZapRuns to fetch.
     */
    where: Prisma.ZapRunsWhereUniqueInput;
};
/**
 * ZapRuns findUniqueOrThrow
 */
export type ZapRunsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * Filter, which ZapRuns to fetch.
     */
    where: Prisma.ZapRunsWhereUniqueInput;
};
/**
 * ZapRuns findFirst
 */
export type ZapRunsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * Filter, which ZapRuns to fetch.
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ZapRuns to fetch.
     */
    orderBy?: Prisma.ZapRunsOrderByWithRelationInput | Prisma.ZapRunsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ZapRuns.
     */
    cursor?: Prisma.ZapRunsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ZapRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ZapRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ZapRuns.
     */
    distinct?: Prisma.ZapRunsScalarFieldEnum | Prisma.ZapRunsScalarFieldEnum[];
};
/**
 * ZapRuns findFirstOrThrow
 */
export type ZapRunsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * Filter, which ZapRuns to fetch.
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ZapRuns to fetch.
     */
    orderBy?: Prisma.ZapRunsOrderByWithRelationInput | Prisma.ZapRunsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ZapRuns.
     */
    cursor?: Prisma.ZapRunsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ZapRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ZapRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ZapRuns.
     */
    distinct?: Prisma.ZapRunsScalarFieldEnum | Prisma.ZapRunsScalarFieldEnum[];
};
/**
 * ZapRuns findMany
 */
export type ZapRunsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * Filter, which ZapRuns to fetch.
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ZapRuns to fetch.
     */
    orderBy?: Prisma.ZapRunsOrderByWithRelationInput | Prisma.ZapRunsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ZapRuns.
     */
    cursor?: Prisma.ZapRunsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ZapRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ZapRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ZapRuns.
     */
    distinct?: Prisma.ZapRunsScalarFieldEnum | Prisma.ZapRunsScalarFieldEnum[];
};
/**
 * ZapRuns create
 */
export type ZapRunsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * The data needed to create a ZapRuns.
     */
    data: Prisma.XOR<Prisma.ZapRunsCreateInput, Prisma.ZapRunsUncheckedCreateInput>;
};
/**
 * ZapRuns createMany
 */
export type ZapRunsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ZapRuns.
     */
    data: Prisma.ZapRunsCreateManyInput | Prisma.ZapRunsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ZapRuns createManyAndReturn
 */
export type ZapRunsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * The data used to create many ZapRuns.
     */
    data: Prisma.ZapRunsCreateManyInput | Prisma.ZapRunsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ZapRuns update
 */
export type ZapRunsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * The data needed to update a ZapRuns.
     */
    data: Prisma.XOR<Prisma.ZapRunsUpdateInput, Prisma.ZapRunsUncheckedUpdateInput>;
    /**
     * Choose, which ZapRuns to update.
     */
    where: Prisma.ZapRunsWhereUniqueInput;
};
/**
 * ZapRuns updateMany
 */
export type ZapRunsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ZapRuns.
     */
    data: Prisma.XOR<Prisma.ZapRunsUpdateManyMutationInput, Prisma.ZapRunsUncheckedUpdateManyInput>;
    /**
     * Filter which ZapRuns to update
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * Limit how many ZapRuns to update.
     */
    limit?: number;
};
/**
 * ZapRuns updateManyAndReturn
 */
export type ZapRunsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * The data used to update ZapRuns.
     */
    data: Prisma.XOR<Prisma.ZapRunsUpdateManyMutationInput, Prisma.ZapRunsUncheckedUpdateManyInput>;
    /**
     * Filter which ZapRuns to update
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * Limit how many ZapRuns to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ZapRuns upsert
 */
export type ZapRunsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * The filter to search for the ZapRuns to update in case it exists.
     */
    where: Prisma.ZapRunsWhereUniqueInput;
    /**
     * In case the ZapRuns found by the `where` argument doesn't exist, create a new ZapRuns with this data.
     */
    create: Prisma.XOR<Prisma.ZapRunsCreateInput, Prisma.ZapRunsUncheckedCreateInput>;
    /**
     * In case the ZapRuns was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ZapRunsUpdateInput, Prisma.ZapRunsUncheckedUpdateInput>;
};
/**
 * ZapRuns delete
 */
export type ZapRunsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
    /**
     * Filter which ZapRuns to delete.
     */
    where: Prisma.ZapRunsWhereUniqueInput;
};
/**
 * ZapRuns deleteMany
 */
export type ZapRunsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ZapRuns to delete
     */
    where?: Prisma.ZapRunsWhereInput;
    /**
     * Limit how many ZapRuns to delete.
     */
    limit?: number;
};
/**
 * ZapRuns.zapRunOutbox
 */
export type ZapRuns$zapRunOutboxArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRunOutbox
     */
    select?: Prisma.ZapRunOutboxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRunOutbox
     */
    omit?: Prisma.ZapRunOutboxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunOutboxInclude<ExtArgs> | null;
    where?: Prisma.ZapRunOutboxWhereInput;
};
/**
 * ZapRuns without action
 */
export type ZapRunsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZapRuns
     */
    select?: Prisma.ZapRunsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ZapRuns
     */
    omit?: Prisma.ZapRunsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ZapRunsInclude<ExtArgs> | null;
};
