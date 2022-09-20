import { Action } from '../action/Action';
import { BagEntries } from '../bag/Bag';
import { ActionFilterValueType } from '../filter/ActionFilter';
import { Model } from '../Model';
import { ApiError } from './ApiError';
import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';
declare type ApiListActionResponse = {
    models: Model[];
    meta: object;
};
declare type ApiActionResponse = boolean | Model | null | ApiListActionResponse;
export declare class ApiAction {
    protected _apiActions: ApiAction[];
    protected _action: Action;
    protected _fields: BagEntries<unknown>;
    protected _params: BagEntries<unknown>;
    protected _filters: BagEntries<ActionFilterValueType>;
    protected _data: BagEntries<unknown>;
    protected _bulkIsSequential: boolean;
    static fromRequest(apiRequest: ApiRequest): ApiAction;
    apiAction(apiAction: ApiAction): ApiAction;
    get isBulk(): boolean;
    sequential(sequential?: boolean): ApiAction;
    action({ apiType, resourceType, actionName }: {
        apiType: string | null;
        resourceType: string;
        actionName: string;
    }): ApiAction;
    getAction(): Action;
    param(key: string, value: unknown): ApiAction;
    params(params: Record<string, unknown>): ApiAction;
    filter(name: string, value: ActionFilterValueType): ApiAction;
    filters(filters: BagEntries<ActionFilterValueType>): ApiAction;
    getFilters(): BagEntries<ActionFilterValueType>;
    field(name: string, value: unknown): ApiAction;
    fields(fields: Record<string, unknown>): ApiAction;
    data(data: BagEntries<unknown>): ApiAction;
    getApiRequest(): ApiRequest;
    execute(): Promise<ApiActionResponse | ApiActionResponse[]>;
    beforeBulkRequest(): void;
    afterBulkRequest(): void;
    beforeRequest(): Promise<unknown>;
    afterRequest(): Promise<unknown>;
    processResult(result: ApiResponse): ApiActionResponse;
    processError(_result: ApiError): void;
}
export {};
//# sourceMappingURL=ApiAction.d.ts.map