import { Action } from '../action/Action';
import { BagEntries } from '../bag/Bag';
import { ActionFilterValueType } from '../filter/ActionFilter';
export declare class ListViewConfig {
    private _action;
    private _fields;
    private _params;
    private _filters;
    action({ apiType, resourceType, actionName }: {
        apiType: string | null;
        resourceType: string;
        actionName: string;
    }): ListViewConfig;
    getAction(): Action | null;
    params(params: BagEntries<unknown>): ListViewConfig;
    getParams(): BagEntries<unknown>;
    filters(filters: BagEntries<ActionFilterValueType>): ListViewConfig;
    getFilters(): BagEntries<ActionFilterValueType>;
    fields(fields: BagEntries<unknown>): ListViewConfig;
    getFields(): BagEntries<unknown>;
}
//# sourceMappingURL=ListViewConfig.d.ts.map