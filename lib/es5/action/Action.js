import { ApiRequest } from '../api/ApiRequest';
import { apiResources } from '../ApiResources';
import { RequestFilters } from '../filter/RequestFilters';
import { ActionInput } from './ActionInput';
import { ActionParam } from './ActionParams';
import { ActionResponse } from './ActionResponse';
export class Action {
    constructor(resource, name, json) {
        this._response = null;
        this._params = {};
        this._input = null;
        this._filters = {};
        this._resource = resource;
        this._name = name;
        if (json.response) {
            this._response = new ActionResponse(json.response.type);
        }
        if (json.input) {
            this._input = new ActionInput(json.input.type);
        }
        if (json.params) {
            for (const [name, paramJSON] of Object.entries(json.params)) {
                const param = new ActionParam(paramJSON);
                this._params[name] = param;
            }
        }
        if (json.filters) {
            for (const [name, filterJSON] of Object.entries(json.filters)) {
                const filter = apiResources.getFilter(filterJSON.type);
                if (filter) {
                    const actionFilter = filter.createActionFilter(this, name, filterJSON);
                    this._filters[name] = actionFilter;
                }
            }
        }
    }
    getName() {
        return this._name;
    }
    getFilters() {
        return this._filters;
    }
    createRequestFilters(querySource) {
        const filters = new RequestFilters(querySource);
        for (const [name, filter] of Object.entries(this._filters)) {
            filters.add(name, filter.createRequestFilter(filters));
        }
        filters.initFromQuerySource();
        return filters;
    }
    request() {
        return new ApiRequest()
            .action(this);
    }
    getResource() {
        return this._resource;
    }
    getApi() {
        return this._resource.getApi();
    }
}