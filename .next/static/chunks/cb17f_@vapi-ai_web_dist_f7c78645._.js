(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/api.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _define_property = __turbopack_context__.r("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_define_property.cjs [app-client] (ecmascript)");
/* eslint-disable */ /* tslint:disable */ // @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Api = exports.HttpClient = exports.ContentType = void 0;
var ContentType;
(function(ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["JsonApi"] = "application/vnd.api+json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (exports.ContentType = ContentType = {}));
class HttpClient {
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return "".concat(encodedKey, "=").concat(encodeURIComponent(typeof value === "number" ? value : "".concat(value)));
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v)=>this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key)=>"undefined" !== typeof query[key]);
        return keys.map((key)=>Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)).join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? "?".concat(queryString) : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...params2 || {},
            headers: {
                ...this.baseApiParams.headers || {},
                ...params1.headers || {},
                ...params2 && params2.headers || {}
            }
        };
    }
    constructor(apiConfig = {}){
        _define_property._(this, "baseUrl", "https://api.vapi.ai");
        _define_property._(this, "securityData", null);
        _define_property._(this, "securityWorker", void 0);
        _define_property._(this, "abortControllers", new Map());
        _define_property._(this, "customFetch", function() {
            for(var _len = arguments.length, fetchParams = new Array(_len), _key = 0; _key < _len; _key++){
                fetchParams[_key] = arguments[_key];
            }
            return fetch(...fetchParams);
        });
        _define_property._(this, "baseApiParams", {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer"
        });
        _define_property._(this, "setSecurityData", (data)=>{
            this.securityData = data;
        });
        _define_property._(this, "contentFormatters", {
            [ContentType.Json]: (input)=>input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.JsonApi]: (input)=>input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.Text]: (input)=>input !== null && typeof input !== "string" ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input)=>{
                if (input instanceof FormData) {
                    return input;
                }
                return Object.keys(input || {}).reduce((formData, key)=>{
                    const property = input[key];
                    formData.append(key, property instanceof Blob ? property : typeof property === "object" && property !== null ? JSON.stringify(property) : "".concat(property));
                    return formData;
                }, new FormData());
            },
            [ContentType.UrlEncoded]: (input)=>this.toQueryString(input)
        });
        _define_property._(this, "createAbortSignal", (cancelToken)=>{
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        });
        _define_property._(this, "abortRequest", (cancelToken)=>{
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        });
        _define_property._(this, "request", async (param)=>{
            let { body, secure, path, type, query, format, baseUrl, cancelToken, ...params } = param;
            const secureParams = (typeof secure === "boolean" ? secure : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            const responseFormat = format || requestParams.format;
            return this.customFetch("".concat(baseUrl || this.baseUrl || "").concat(path).concat(queryString ? "?".concat(queryString) : ""), {
                ...requestParams,
                headers: {
                    ...requestParams.headers || {},
                    ...type && type !== ContentType.FormData ? {
                        "Content-Type": type
                    } : {}
                },
                signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body)
            }).then(async (response)=>{
                const r = response;
                r.data = null;
                r.error = null;
                const data = !responseFormat ? r : await response[responseFormat]().then((data)=>{
                    if (r.ok) {
                        r.data = data;
                    } else {
                        r.error = data;
                    }
                    return r;
                }).catch((e)=>{
                    r.error = e;
                    return r;
                });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok) throw data;
                return data;
            });
        });
        Object.assign(this, apiConfig);
    }
}
exports.HttpClient = HttpClient;
/**
 * @title Vapi API
 * @version 1.0
 * @baseUrl https://api.vapi.ai
 * @contact
 *
 * Voice AI for developers.
 */ class Api extends HttpClient {
    constructor(...args){
        var _this;
        super(...args), _this = this, _define_property._(this, "assistant", {
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerCreate
         * @summary Create Assistant
         * @request POST:/assistant
         * @secure
         */ assistantControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/assistant",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerFindAll
         * @summary List Assistants
         * @request GET:/assistant
         * @secure
         */ assistantControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/assistant",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerFindOne
         * @summary Get Assistant
         * @request GET:/assistant/{id}
         * @secure
         */ assistantControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/assistant/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerUpdate
         * @summary Update Assistant
         * @request PATCH:/assistant/{id}
         * @secure
         */ assistantControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/assistant/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerReplace
         * @summary Replace Assistant
         * @request PUT:/assistant/{id}
         * @secure
         */ assistantControllerReplace: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/assistant/".concat(id),
                    method: "PUT",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerRemove
         * @summary Delete Assistant
         * @request DELETE:/assistant/{id}
         * @secure
         */ assistantControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/assistant/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerFindVersions
         * @summary List Assistant Versions
         * @request GET:/assistant/{id}/version
         * @secure
         */ assistantControllerFindVersions: function(id, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/assistant/".concat(id, "/version"),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "v2", {
            /**
         * No description
         *
         * @tags Assistants
         * @name AssistantControllerFindAllPaginated
         * @summary List Assistants with pagination
         * @request GET:/v2/assistant
         * @secure
         */ assistantControllerFindAllPaginated: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/v2/assistant",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerCallsExport
         * @summary Export Calls to CSV
         * @request GET:/v2/call/export
         * @secure
         */ callControllerCallsExport: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/v2/call/export",
                    method: "GET",
                    query: query,
                    secure: true,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerFindAllPaginated
         * @summary List Calls
         * @request GET:/v2/call
         * @secure
         */ callControllerFindAllPaginated: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/v2/call",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerFindAllMetadataPaginated
         * @summary List Call Metadata
         * @request GET:/v2/call/metadata
         * @secure
         */ callControllerFindAllMetadataPaginated: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/v2/call/metadata",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerFindAllPaginated
         * @summary List Phone Numbers
         * @request GET:/v2/phone-number
         * @secure
         */ phoneNumberControllerFindAllPaginated: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/v2/phone-number",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "squad", {
            /**
         * No description
         *
         * @tags Squads
         * @name SquadControllerCreate
         * @summary Create Squad
         * @request POST:/squad
         * @secure
         */ squadControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/squad",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Squads
         * @name SquadControllerFindAll
         * @summary List Squads
         * @request GET:/squad
         * @secure
         */ squadControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/squad",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Squads
         * @name SquadControllerFindOne
         * @summary Get Squad
         * @request GET:/squad/{id}
         * @secure
         */ squadControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/squad/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Squads
         * @name SquadControllerUpdate
         * @summary Update Squad
         * @request PATCH:/squad/{id}
         * @secure
         */ squadControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/squad/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Squads
         * @name SquadControllerRemove
         * @summary Delete Squad
         * @request DELETE:/squad/{id}
         * @secure
         */ squadControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/squad/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "workflow", {
            /**
         * No description
         *
         * @tags Workflow
         * @name WorkflowControllerFindAll
         * @summary Get Workflows
         * @request GET:/workflow
         * @secure
         */ workflowControllerFindAll: function() {
                let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return _this.request({
                    path: "/workflow",
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Workflow
         * @name WorkflowControllerCreate
         * @summary Create Workflow
         * @request POST:/workflow
         * @secure
         */ workflowControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/workflow",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Workflow
         * @name WorkflowControllerFindOne
         * @summary Get Workflow
         * @request GET:/workflow/{id}
         * @secure
         */ workflowControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/workflow/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Workflow
         * @name WorkflowControllerDelete
         * @summary Delete Workflow
         * @request DELETE:/workflow/{id}
         * @secure
         */ workflowControllerDelete: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/workflow/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Workflow
         * @name WorkflowControllerUpdate
         * @summary Update Workflow
         * @request PATCH:/workflow/{id}
         * @secure
         */ workflowControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/workflow/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "call", {
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerCreate
         * @summary Create Call
         * @request POST:/call
         * @secure
         */ callControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/call",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerFindAll
         * @summary List Calls
         * @request GET:/call
         * @secure
         */ callControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/call",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerFindOne
         * @summary Get Call
         * @request GET:/call/{id}
         * @secure
         */ callControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/call/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerUpdate
         * @summary Update Call
         * @request PATCH:/call/{id}
         * @secure
         */ callControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/call/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerDeleteCallData
         * @summary Delete Call Data
         * @request DELETE:/call/{id}
         * @secure
         */ callControllerDeleteCallData: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/call/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerCreatePhoneCall
         * @summary Create Phone Call
         * @request POST:/call/phone
         * @deprecated
         * @secure
         */ callControllerCreatePhoneCall: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/call/phone",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Calls
         * @name CallControllerCreateWebCall
         * @summary Create Web Call
         * @request POST:/call/web
         * @secure
         */ callControllerCreateWebCall: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/call/web",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "chat", {
            /**
         * No description
         *
         * @tags Chats
         * @name ChatControllerListChats
         * @summary List Chats
         * @request GET:/chat
         * @secure
         */ chatControllerListChats: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * @description Creates a new chat. Requires at least one of: assistantId/assistant, sessionId, or previousChatId. Note: sessionId and previousChatId are mutually exclusive.
         *
         * @tags Chats
         * @name ChatControllerCreateChat
         * @summary Create Chat
         * @request POST:/chat
         * @secure
         */ chatControllerCreateChat: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Chats
         * @name ChatControllerGetChat
         * @summary Get Chat
         * @request GET:/chat/{id}
         * @secure
         */ chatControllerGetChat: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Chats
         * @name ChatControllerDeleteChat
         * @summary Delete Chat
         * @request DELETE:/chat/{id}
         * @secure
         */ chatControllerDeleteChat: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Chats
         * @name ChatControllerCreateOpenAiChat
         * @summary Create Chat (OpenAI Compatible)
         * @request POST:/chat/responses
         * @secure
         */ chatControllerCreateOpenAiChat: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat/responses",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Chats
         * @name ChatControllerCreateWebChat
         * @summary Create WebChat
         * @request POST:/chat/web
         * @secure
         */ chatControllerCreateWebChat: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat/web",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Chats
         * @name ChatControllerCreateOpenAiWebChat
         * @summary Create WebChat (OpenAI Compatible)
         * @request POST:/chat/web/responses
         * @secure
         */ chatControllerCreateOpenAiWebChat: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/chat/web/responses",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "campaign", {
            /**
         * No description
         *
         * @tags Campaigns
         * @name CampaignControllerCreate
         * @summary Create Campaign
         * @request POST:/campaign
         * @secure
         */ campaignControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/campaign",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Campaigns
         * @name CampaignControllerFindAll
         * @summary List Campaigns
         * @request GET:/campaign
         * @secure
         */ campaignControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/campaign",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Campaigns
         * @name CampaignControllerFindOne
         * @summary Get Campaign
         * @request GET:/campaign/{id}
         * @secure
         */ campaignControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/campaign/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Campaigns
         * @name CampaignControllerUpdate
         * @summary Update Campaign
         * @request PATCH:/campaign/{id}
         * @secure
         */ campaignControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/campaign/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Campaigns
         * @name CampaignControllerRemove
         * @summary Delete Campaign
         * @request DELETE:/campaign/{id}
         * @secure
         */ campaignControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/campaign/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "session", {
            /**
         * No description
         *
         * @tags Sessions
         * @name SessionControllerCreate
         * @summary Create Session
         * @request POST:/session
         * @secure
         */ sessionControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/session",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Sessions
         * @name SessionControllerFindAllPaginated
         * @summary List Sessions
         * @request GET:/session
         * @secure
         */ sessionControllerFindAllPaginated: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/session",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Sessions
         * @name SessionControllerFindOne
         * @summary Get Session
         * @request GET:/session/{id}
         * @secure
         */ sessionControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/session/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Sessions
         * @name SessionControllerUpdate
         * @summary Update Session
         * @request PATCH:/session/{id}
         * @secure
         */ sessionControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/session/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Sessions
         * @name SessionControllerRemove
         * @summary Delete Session
         * @request DELETE:/session/{id}
         * @secure
         */ sessionControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/session/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "phoneNumber", {
            /**
         * @description Use POST /phone-number instead.
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerImportTwilio
         * @summary Import Twilio Number
         * @request POST:/phone-number/import/twilio
         * @deprecated
         * @secure
         */ phoneNumberControllerImportTwilio: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/phone-number/import/twilio",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * @description Use POST /phone-number instead.
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerImportVonage
         * @summary Import Vonage Number
         * @request POST:/phone-number/import/vonage
         * @deprecated
         * @secure
         */ phoneNumberControllerImportVonage: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/phone-number/import/vonage",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerCreate
         * @summary Create Phone Number
         * @request POST:/phone-number
         * @secure
         */ phoneNumberControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/phone-number",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerFindAll
         * @summary List Phone Numbers
         * @request GET:/phone-number
         * @secure
         */ phoneNumberControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/phone-number",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerFindOne
         * @summary Get Phone Number
         * @request GET:/phone-number/{id}
         * @secure
         */ phoneNumberControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/phone-number/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerUpdate
         * @summary Update Phone Number
         * @request PATCH:/phone-number/{id}
         * @secure
         */ phoneNumberControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/phone-number/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Phone Numbers
         * @name PhoneNumberControllerRemove
         * @summary Delete Phone Number
         * @request DELETE:/phone-number/{id}
         * @secure
         */ phoneNumberControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/phone-number/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "tool", {
            /**
         * No description
         *
         * @tags Tools
         * @name ToolControllerCreate
         * @summary Create Tool
         * @request POST:/tool
         * @secure
         */ toolControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/tool",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tools
         * @name ToolControllerFindAll
         * @summary List Tools
         * @request GET:/tool
         * @secure
         */ toolControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/tool",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tools
         * @name ToolControllerFindOne
         * @summary Get Tool
         * @request GET:/tool/{id}
         * @secure
         */ toolControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/tool/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tools
         * @name ToolControllerUpdate
         * @summary Update Tool
         * @request PATCH:/tool/{id}
         * @secure
         */ toolControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/tool/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tools
         * @name ToolControllerRemove
         * @summary Delete Tool
         * @request DELETE:/tool/{id}
         * @secure
         */ toolControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/tool/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "file", {
            /**
         * @description Use POST /file instead.
         *
         * @tags Files
         * @name FileControllerCreateDeprecated
         * @summary Upload File
         * @request POST:/file/upload
         * @deprecated
         * @secure
         */ fileControllerCreateDeprecated: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/file/upload",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.FormData,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Files
         * @name FileControllerCreate
         * @summary Upload File
         * @request POST:/file
         * @secure
         */ fileControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/file",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.FormData,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Files
         * @name FileControllerFindAll
         * @summary List Files
         * @request GET:/file
         * @secure
         */ fileControllerFindAll: function() {
                let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return _this.request({
                    path: "/file",
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Files
         * @name FileControllerFindOne
         * @summary Get File
         * @request GET:/file/{id}
         * @secure
         */ fileControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/file/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Files
         * @name FileControllerUpdate
         * @summary Update File
         * @request PATCH:/file/{id}
         * @secure
         */ fileControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/file/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Files
         * @name FileControllerRemove
         * @summary Delete File
         * @request DELETE:/file/{id}
         * @secure
         */ fileControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/file/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "knowledgeBase", {
            /**
         * No description
         *
         * @tags Knowledge Base
         * @name KnowledgeBaseControllerCreate
         * @summary Create Knowledge Base
         * @request POST:/knowledge-base
         * @secure
         */ knowledgeBaseControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/knowledge-base",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Knowledge Base
         * @name KnowledgeBaseControllerFindAll
         * @summary List Knowledge Bases
         * @request GET:/knowledge-base
         * @secure
         */ knowledgeBaseControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/knowledge-base",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Knowledge Base
         * @name KnowledgeBaseControllerFindOne
         * @summary Get Knowledge Base
         * @request GET:/knowledge-base/{id}
         * @secure
         */ knowledgeBaseControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/knowledge-base/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Knowledge Base
         * @name KnowledgeBaseControllerUpdate
         * @summary Update Knowledge Base
         * @request PATCH:/knowledge-base/{id}
         * @secure
         */ knowledgeBaseControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/knowledge-base/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Knowledge Base
         * @name KnowledgeBaseControllerRemove
         * @summary Delete Knowledge Base
         * @request DELETE:/knowledge-base/{id}
         * @secure
         */ knowledgeBaseControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/knowledge-base/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "structuredOutput", {
            /**
         * No description
         *
         * @tags Structured Outputs
         * @name StructuredOutputControllerFindAll
         * @summary List Structured Outputs
         * @request GET:/structured-output
         * @secure
         */ structuredOutputControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/structured-output",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Structured Outputs
         * @name StructuredOutputControllerCreate
         * @summary Create Structured Output
         * @request POST:/structured-output
         * @secure
         */ structuredOutputControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/structured-output",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Structured Outputs
         * @name StructuredOutputControllerFindOne
         * @summary Get Structured Output
         * @request GET:/structured-output/{id}
         * @secure
         */ structuredOutputControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/structured-output/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Structured Outputs
         * @name StructuredOutputControllerUpdate
         * @summary Update Structured Output
         * @request PATCH:/structured-output/{id}
         * @secure
         */ structuredOutputControllerUpdate: function(id, query, data) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/structured-output/".concat(id),
                    method: "PATCH",
                    query: query,
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Structured Outputs
         * @name StructuredOutputControllerRemove
         * @summary Delete Structured Output
         * @request DELETE:/structured-output/{id}
         * @secure
         */ structuredOutputControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/structured-output/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "testSuite", {
            /**
         * No description
         *
         * @tags Test Suites
         * @name TestSuiteControllerFindAllPaginated
         * @summary List Test Suites
         * @request GET:/test-suite
         * @secure
         */ testSuiteControllerFindAllPaginated: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/test-suite",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suites
         * @name TestSuiteControllerCreate
         * @summary Create Test Suite
         * @request POST:/test-suite
         * @secure
         */ testSuiteControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/test-suite",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suites
         * @name TestSuiteControllerFindOne
         * @summary Get Test Suite
         * @request GET:/test-suite/{id}
         * @secure
         */ testSuiteControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/test-suite/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suites
         * @name TestSuiteControllerUpdate
         * @summary Update Test Suite
         * @request PATCH:/test-suite/{id}
         * @secure
         */ testSuiteControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suites
         * @name TestSuiteControllerRemove
         * @summary Delete Test Suite
         * @request DELETE:/test-suite/{id}
         * @secure
         */ testSuiteControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/test-suite/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Tests
         * @name TestSuiteTestControllerFindAllPaginated
         * @summary List Tests
         * @request GET:/test-suite/{testSuiteId}/test
         * @secure
         */ testSuiteTestControllerFindAllPaginated: function(testSuiteId, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/test"),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Tests
         * @name TestSuiteTestControllerCreate
         * @summary Create Test
         * @request POST:/test-suite/{testSuiteId}/test
         * @secure
         */ testSuiteTestControllerCreate: function(testSuiteId, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/test"),
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Tests
         * @name TestSuiteTestControllerFindOne
         * @summary Get Test
         * @request GET:/test-suite/{testSuiteId}/test/{id}
         * @secure
         */ testSuiteTestControllerFindOne: function(testSuiteId, id) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/test/").concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Tests
         * @name TestSuiteTestControllerUpdate
         * @summary Update Test
         * @request PATCH:/test-suite/{testSuiteId}/test/{id}
         * @secure
         */ testSuiteTestControllerUpdate: function(testSuiteId, id, data) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/test/").concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Tests
         * @name TestSuiteTestControllerRemove
         * @summary Delete Test
         * @request DELETE:/test-suite/{testSuiteId}/test/{id}
         * @secure
         */ testSuiteTestControllerRemove: function(testSuiteId, id) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/test/").concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Runs
         * @name TestSuiteRunControllerFindAllPaginated
         * @summary List Test Suite Runs
         * @request GET:/test-suite/{testSuiteId}/run
         * @secure
         */ testSuiteRunControllerFindAllPaginated: function(testSuiteId, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/run"),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Runs
         * @name TestSuiteRunControllerCreate
         * @summary Create Test Suite Run
         * @request POST:/test-suite/{testSuiteId}/run
         * @secure
         */ testSuiteRunControllerCreate: function(testSuiteId, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/run"),
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Runs
         * @name TestSuiteRunControllerFindOne
         * @summary Get Test Suite Run
         * @request GET:/test-suite/{testSuiteId}/run/{id}
         * @secure
         */ testSuiteRunControllerFindOne: function(testSuiteId, id) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/run/").concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Runs
         * @name TestSuiteRunControllerUpdate
         * @summary Update Test Suite Run
         * @request PATCH:/test-suite/{testSuiteId}/run/{id}
         * @secure
         */ testSuiteRunControllerUpdate: function(testSuiteId, id, data) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/run/").concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Test Suite Runs
         * @name TestSuiteRunControllerRemove
         * @summary Delete Test Suite Run
         * @request DELETE:/test-suite/{testSuiteId}/run/{id}
         * @secure
         */ testSuiteRunControllerRemove: function(testSuiteId, id) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/test-suite/".concat(testSuiteId, "/run/").concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "org", {
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerCreate
         * @summary Create Org
         * @request POST:/org
         * @secure
         */ orgControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerFindAll
         * @summary List Orgs
         * @request GET:/org
         * @secure
         */ orgControllerFindAll: function() {
                let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return _this.request({
                    path: "/org",
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerFeatureFlagEnabled
         * @summary Check if Feature Flag is enabled
         * @request GET:/org/feature-flag
         * @secure
         */ orgControllerFeatureFlagEnabled: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org/feature-flag",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerFindOne
         * @summary Get Org
         * @request GET:/org/{id}
         * @secure
         */ orgControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerUpdate
         * @summary Update Org
         * @request PATCH:/org/{id}
         * @secure
         */ orgControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/org/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerDeleteOrg
         * @summary Delete Org
         * @request DELETE:/org/{id}
         * @secure
         */ orgControllerDeleteOrg: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org/".concat(id),
                    method: "DELETE",
                    secure: true,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerFindAllUsers
         * @summary List Users
         * @request GET:/org/{id}/user
         * @secure
         */ orgControllerFindAllUsers: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org/".concat(id, "/user"),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerOrgLeave
         * @summary Leave Org
         * @request DELETE:/org/{id}/leave
         * @secure
         */ orgControllerOrgLeave: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org/".concat(id, "/leave"),
                    method: "DELETE",
                    secure: true,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerOrgRemoveUser
         * @summary Remove Org Member
         * @request DELETE:/org/{id}/member/{memberId}/leave
         * @secure
         */ orgControllerOrgRemoveUser: function(id, memberId) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/org/".concat(id, "/member/").concat(memberId, "/leave"),
                    method: "DELETE",
                    secure: true,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerUsersInvite
         * @summary Invite User
         * @request POST:/org/{id}/invite
         * @secure
         */ orgControllerUsersInvite: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/org/".concat(id, "/invite"),
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerUserUpdate
         * @summary Update User Role
         * @request PATCH:/org/{id}/role
         * @secure
         */ orgControllerUserUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/org/".concat(id, "/role"),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Orgs
         * @name OrgControllerOrgToken
         * @summary Generate User Org JWT
         * @request GET:/org/{id}/auth
         * @secure
         */ orgControllerOrgToken: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/org/".concat(id, "/auth"),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "token", {
            /**
         * No description
         *
         * @tags Tokens
         * @name TokenControllerCreate
         * @summary Create Token
         * @request POST:/token
         * @secure
         */ tokenControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/token",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tokens
         * @name TokenControllerFindAll
         * @summary List Tokens
         * @request GET:/token
         * @secure
         */ tokenControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/token",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tokens
         * @name TokenControllerFindOne
         * @summary Get Token
         * @request GET:/token/{id}
         * @secure
         */ tokenControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/token/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tokens
         * @name TokenControllerUpdate
         * @summary Update Token
         * @request PATCH:/token/{id}
         * @secure
         */ tokenControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/token/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Tokens
         * @name TokenControllerRemove
         * @summary Delete Token
         * @request DELETE:/token/{id}
         * @secure
         */ tokenControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/token/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "credential", {
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerCreate
         * @summary Create Credential
         * @request POST:/credential
         * @secure
         */ credentialControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerFindAll
         * @summary List Credentials
         * @request GET:/credential
         * @secure
         */ credentialControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerFindOne
         * @summary Get Credential
         * @request GET:/credential/{id}
         * @secure
         */ credentialControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerUpdate
         * @summary Update Credential
         * @request PATCH:/credential/{id}
         * @secure
         */ credentialControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/credential/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerRemove
         * @summary Delete Credential
         * @request DELETE:/credential/{id}
         * @secure
         */ credentialControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerGenerateSession
         * @summary Generate a credential session
         * @request POST:/credential/session
         * @secure
         */ credentialControllerGenerateSession: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential/session",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerHandleWebhook
         * @summary Handle credential webhook
         * @request POST:/credential/webhook
         */ credentialControllerHandleWebhook: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential/webhook",
                    method: "POST",
                    body: data,
                    type: ContentType.Json,
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Credentials
         * @name CredentialControllerTriggerCredentialAction
         * @summary Trigger a credential action
         * @request POST:/credential/trigger
         * @secure
         */ credentialControllerTriggerCredentialAction: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/credential/trigger",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    ...params
                });
            }
        }), _define_property._(this, "template", {
            /**
         * No description
         *
         * @tags Templates
         * @name TemplateControllerCreate
         * @summary Create Template
         * @request POST:/template
         * @secure
         */ templateControllerCreate: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/template",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Templates
         * @name TemplateControllerFindAll
         * @summary List Templates
         * @request GET:/template
         * @secure
         */ templateControllerFindAll: function(query) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/template",
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Templates
         * @name TemplateControllerFindAllPinned
         * @summary List Templates
         * @request GET:/template/pinned
         * @secure
         */ templateControllerFindAllPinned: function() {
                let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                return _this.request({
                    path: "/template/pinned",
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Templates
         * @name TemplateControllerFindOne
         * @summary Get Template
         * @request GET:/template/{id}
         * @secure
         */ templateControllerFindOne: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/template/".concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Templates
         * @name TemplateControllerUpdate
         * @summary Update Template
         * @request PATCH:/template/{id}
         * @secure
         */ templateControllerUpdate: function(id, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/template/".concat(id),
                    method: "PATCH",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Templates
         * @name TemplateControllerRemove
         * @summary Delete Template
         * @request DELETE:/template/{id}
         * @secure
         */ templateControllerRemove: function(id) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/template/".concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "voiceLibrary", {
            /**
         * No description
         *
         * @tags Voice Library
         * @name VoiceLibraryControllerVoiceGetByProvider
         * @summary Get voices in Voice Library by Provider
         * @request GET:/voice-library/{provider}
         * @secure
         */ voiceLibraryControllerVoiceGetByProvider: function(provider, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/voice-library/".concat(provider),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Voice Library
         * @name VoiceLibraryControllerVoiceGetAccentsByProvider
         * @summary Get accents in Voice Library by Provider
         * @request GET:/voice-library/{provider}/accents
         * @secure
         */ voiceLibraryControllerVoiceGetAccentsByProvider: function(provider) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/voice-library/".concat(provider, "/accents"),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Voice Library
         * @name VoiceLibraryControllerVoiceLibrarySyncByProvider
         * @summary Sync Private voices in Voice Library by Provider
         * @request POST:/voice-library/sync/{provider}
         * @secure
         */ voiceLibraryControllerVoiceLibrarySyncByProvider: function(provider) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/voice-library/sync/".concat(provider),
                    method: "POST",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Voice Library
         * @name VoiceLibraryControllerVoiceLibrarySyncDefaultVoices
         * @summary Sync Default voices in Voice Library by Providers
         * @request POST:/voice-library/sync
         * @secure
         */ voiceLibraryControllerVoiceLibrarySyncDefaultVoices: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/voice-library/sync",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Voice Library
         * @name VoiceLibraryControllerVoiceLibraryCreateSesameVoice
         * @summary Create a new voice in the Voice Library using Sesame
         * @request POST:/voice-library/create-sesame-voice
         * @secure
         */ voiceLibraryControllerVoiceLibraryCreateSesameVoice: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/voice-library/create-sesame-voice",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    ...params
                });
            }
        }), _define_property._(this, "provider", {
            /**
         * No description
         *
         * @tags Provider Resources
         * @name ProviderResourceControllerCreateProviderResource
         * @summary Create Provider Resource
         * @request POST:/provider/{provider}/{resourceName}
         * @secure
         */ providerResourceControllerCreateProviderResource: function(provider, resourceName) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/provider/".concat(provider, "/").concat(resourceName),
                    method: "POST",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Provider Resources
         * @name ProviderResourceControllerGetProviderResourcesPaginated
         * @summary List Provider Resources
         * @request GET:/provider/{provider}/{resourceName}
         * @secure
         */ providerResourceControllerGetProviderResourcesPaginated: function(provider, resourceName, query) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/provider/".concat(provider, "/").concat(resourceName),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Provider Resources
         * @name ProviderResourceControllerGetProviderResource
         * @summary Get Provider Resource
         * @request GET:/provider/{provider}/{resourceName}/{id}
         * @secure
         */ providerResourceControllerGetProviderResource: function(provider, resourceName, id) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/provider/".concat(provider, "/").concat(resourceName, "/").concat(id),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Provider Resources
         * @name ProviderResourceControllerDeleteProviderResource
         * @summary Delete Provider Resource
         * @request DELETE:/provider/{provider}/{resourceName}/{id}
         * @secure
         */ providerResourceControllerDeleteProviderResource: function(provider, resourceName, id) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/provider/".concat(provider, "/").concat(resourceName, "/").concat(id),
                    method: "DELETE",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Provider Resources
         * @name ProviderResourceControllerUpdateProviderResource
         * @summary Update Provider Resource
         * @request PATCH:/provider/{provider}/{resourceName}/{id}
         * @secure
         */ providerResourceControllerUpdateProviderResource: function(provider, resourceName, id) {
                let params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                return _this.request({
                    path: "/provider/".concat(provider, "/").concat(resourceName, "/").concat(id),
                    method: "PATCH",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name ProviderControllerGetWorkflows
         * @request GET:/{provider}/workflows
         * @secure
         */ providerControllerGetWorkflows: function(provider, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/".concat(provider, "/workflows"),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name ProviderControllerGetWorkflowTriggerHook
         * @request GET:/{provider}/workflows/{workflowId}/hooks
         * @secure
         */ providerControllerGetWorkflowTriggerHook: function(provider, workflowId) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/".concat(provider, "/workflows/").concat(workflowId, "/hooks"),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name ProviderControllerGetLocations
         * @request GET:/{provider}/locations
         * @secure
         */ providerControllerGetLocations: function(provider) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/".concat(provider, "/locations"),
                    method: "GET",
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name VoiceProviderControllerSearchVoices
         * @summary Search Voice from Provider Voice Library.
         * @request GET:/{provider}/voices/search
         * @deprecated
         * @secure
         */ voiceProviderControllerSearchVoices: function(provider, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/".concat(provider, "/voices/search"),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name VoiceProviderControllerSearchVoice
         * @summary Search Voice from Provider Voice Library.
         * @request GET:/{provider}/voice/search
         * @secure
         */ voiceProviderControllerSearchVoice: function(provider, query) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/".concat(provider, "/voice/search"),
                    method: "GET",
                    query: query,
                    secure: true,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name VoiceProviderControllerAddVoices
         * @summary Add Shared Voice to your Provider Account.
         * @request POST:/{provider}/voices/add
         * @deprecated
         * @secure
         */ voiceProviderControllerAddVoices: function(provider, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/".concat(provider, "/voices/add"),
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            },
            /**
         * No description
         *
         * @tags Providers
         * @name VoiceProviderControllerAddVoice
         * @summary Add Shared Voice to your Provider Account.
         * @request POST:/{provider}/voice/add
         * @secure
         */ voiceProviderControllerAddVoice: function(provider, data) {
                let params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return _this.request({
                    path: "/".concat(provider, "/voice/add"),
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            }
        }), _define_property._(this, "v11Labs", {
            /**
         * No description
         *
         * @tags Providers
         * @name VoiceProviderControllerCloneVoices
         * @summary Clone a voice to the provider account and add to Vapi Voice Library.
         * @request POST:/11labs/voice/clone
         * @secure
         */ voiceProviderControllerCloneVoices: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/11labs/voice/clone",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.FormData,
                    ...params
                });
            }
        }), _define_property._(this, "analytics", {
            /**
         * No description
         *
         * @tags Analytics
         * @name AnalyticsControllerQuery
         * @summary Create Analytics Queries
         * @request POST:/analytics
         * @secure
         */ analyticsControllerQuery: function(data) {
                let params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                return _this.request({
                    path: "/analytics",
                    method: "POST",
                    body: data,
                    secure: true,
                    type: ContentType.Json,
                    format: "json",
                    ...params
                });
            }
        });
    }
}
exports.Api = Api;
}),
"[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/client.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.client = void 0;
const api_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/api.js [app-client] (ecmascript)");
const api = new api_1.Api({
    baseUrl: "https://api.vapi.ai",
    baseApiParams: {
        secure: true
    },
    securityWorker: async (securityData)=>{
        if (securityData) {
            return {
                headers: {
                    Authorization: "Bearer ".concat(securityData)
                }
            };
        }
    }
});
exports.client = api;
}),
"[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/daily-guards.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createSafeDailyConfig = createSafeDailyConfig;
exports.safeSetLocalAudio = safeSetLocalAudio;
exports.safeSetInputDevicesAsync = safeSetInputDevicesAsync;
exports.createSafeDailyFactoryOptions = createSafeDailyFactoryOptions;
function createSafeDailyConfig(config) {
    if (!config) return {};
    const { alwaysIncludeMicInPermissionPrompt, ...rest } = config;
    // Force true or remove the property entirely. This can cause Chrome 140+ issues
    if (alwaysIncludeMicInPermissionPrompt === false) {
        console.warn('[Vapi] alwaysIncludeMicInPermissionPrompt:false detected. ' + 'This can cause Chrome 140+ issues. Removing the property.');
        return rest;
    }
    return config;
}
function safeSetLocalAudio(call, enabled) {
    if (!call) {
        throw new Error('Call object is not available.');
    }
    // Never use forceDiscardTrack. This can cause Chrome 140+ issues
    call.setLocalAudio(enabled);
}
async function safeSetInputDevicesAsync(call, options) {
    if (!call) {
        throw new Error('Call object is not available.');
    }
    // Validate audioSource
    if ('audioSource' in options && options.audioSource === false) {
        console.warn('[Vapi] setInputDevicesAsync with audioSource:false detected. ' + 'This can cause Chrome 140+ issues. Using default device instead.');
        const { audioSource, ...safeOptions } = options;
        await call.setInputDevicesAsync(safeOptions);
        return;
    }
    await call.setInputDevicesAsync(options);
}
function createSafeDailyFactoryOptions(options) {
    if (!options) return {};
    // Ensure audioSource is never false
    if (options.audioSource === false) {
        console.warn('[Vapi] audioSource:false detected in factory options. ' + 'This can cause Chrome 140+ issues. Defaulting to true.');
        return {
            ...options,
            audioSource: true
        };
    }
    return options;
}
}),
"[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/vapi.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _define_property = __turbopack_context__.r("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_define_property.cjs [app-client] (ecmascript)");
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const daily_js_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/@daily-co+daily-js@0.83.1/node_modules/@daily-co/daily-js/dist/daily-esm.js [app-client] (ecmascript)"));
const events_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/.pnpm/events@3.3.0/node_modules/events/events.js [app-client] (ecmascript)"));
const client_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/client.js [app-client] (ecmascript)");
const daily_guards_1 = __turbopack_context__.r("[project]/node_modules/.pnpm/@vapi-ai+web@2.3.10/node_modules/@vapi-ai/web/dist/daily-guards.js [app-client] (ecmascript)");
async function startAudioPlayer(player, track) {
    player.muted = false;
    player.autoplay = true;
    if (track != null) {
        player.srcObject = new MediaStream([
            track
        ]);
        await player.play();
    }
}
async function buildAudioPlayer(track, participantId) {
    const player = document.createElement('audio');
    player.dataset.participantId = participantId;
    document.body.appendChild(player);
    await startAudioPlayer(player, track);
    return player;
}
function destroyAudioPlayer(participantId) {
    const player = document.querySelector('audio[data-participant-id="'.concat(participantId, '"]'));
    player === null || player === void 0 ? void 0 : player.remove();
}
function subscribeToTracks(e, call, isVideoRecordingEnabled, isVideoEnabled) {
    if (e.participant.local) return;
    call.updateParticipant(e.participant.session_id, {
        setSubscribedTracks: {
            audio: true,
            video: isVideoRecordingEnabled || isVideoEnabled
        }
    });
}
class VapiEventEmitter extends events_1.default {
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    once(event, listener) {
        super.once(event, listener);
        return this;
    }
    emit(event) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        return super.emit(event, ...args);
    }
    removeListener(event, listener) {
        super.removeListener(event, listener);
        return this;
    }
    removeAllListeners(event) {
        super.removeAllListeners(event);
        return this;
    }
}
class Vapi extends VapiEventEmitter {
    cleanup() {
        var _this_call;
        this.started = false;
        this.hasEmittedCallEndedStatus = false;
        (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.destroy();
        this.call = null;
        this.speakingTimeout = null;
    }
    isMobileDevice() {
        if (typeof navigator === 'undefined') {
            return false;
        }
        const userAgent = navigator.userAgent;
        return /android|iphone|ipad|ipod|iemobile|blackberry|bada/i.test(userAgent.toLowerCase());
    }
    async sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    async start(assistant, assistantOverrides, squad, workflow, workflowOverrides) {
        const startTime = Date.now();
        // Input validation with detailed error messages
        if (!assistant && !squad && !workflow) {
            const error = new Error('Assistant or Squad or Workflow must be provided.');
            this.emit('error', {
                type: 'validation-error',
                stage: 'input-validation',
                message: error.message,
                timestamp: new Date().toISOString()
            });
            throw error;
        }
        if (this.started) {
            this.emit('call-start-progress', {
                stage: 'validation',
                status: 'failed',
                timestamp: new Date().toISOString(),
                metadata: {
                    reason: 'already-started'
                }
            });
            return null;
        }
        this.emit('call-start-progress', {
            stage: 'initialization',
            status: 'started',
            timestamp: new Date().toISOString(),
            metadata: {
                hasAssistant: !!assistant,
                hasSquad: !!squad,
                hasWorkflow: !!workflow
            }
        });
        this.started = true;
        try {
            var _webCall_artifactPlan, _webCall_assistant_voice, _webCall_assistant, _webCall_artifactPlan1, _webCall_assistant_voice1, _webCall_assistant1, _this_call_iframe;
            // Stage 1: Create web call
            this.emit('call-start-progress', {
                stage: 'web-call-creation',
                status: 'started',
                timestamp: new Date().toISOString()
            });
            const webCallStartTime = Date.now();
            const webCall = (await client_1.client.call.callControllerCreateWebCall({
                assistant: typeof assistant === 'string' ? undefined : assistant,
                assistantId: typeof assistant === 'string' ? assistant : undefined,
                assistantOverrides,
                squad: typeof squad === 'string' ? undefined : squad,
                squadId: typeof squad === 'string' ? squad : undefined,
                workflow: typeof workflow === 'string' ? undefined : workflow,
                workflowId: typeof workflow === 'string' ? workflow : undefined,
                workflowOverrides
            })).data;
            const webCallDuration = Date.now() - webCallStartTime;
            var _webCall_artifactPlan_videoRecordingEnabled;
            this.emit('call-start-progress', {
                stage: 'web-call-creation',
                status: 'completed',
                duration: webCallDuration,
                timestamp: new Date().toISOString(),
                metadata: {
                    callId: (webCall === null || webCall === void 0 ? void 0 : webCall.id) || 'unknown',
                    videoRecordingEnabled: (_webCall_artifactPlan_videoRecordingEnabled = webCall === null || webCall === void 0 ? void 0 : (_webCall_artifactPlan = webCall.artifactPlan) === null || _webCall_artifactPlan === void 0 ? void 0 : _webCall_artifactPlan.videoRecordingEnabled) !== null && _webCall_artifactPlan_videoRecordingEnabled !== void 0 ? _webCall_artifactPlan_videoRecordingEnabled : false,
                    voiceProvider: (webCall === null || webCall === void 0 ? void 0 : (_webCall_assistant = webCall.assistant) === null || _webCall_assistant === void 0 ? void 0 : (_webCall_assistant_voice = _webCall_assistant.voice) === null || _webCall_assistant_voice === void 0 ? void 0 : _webCall_assistant_voice.provider) || 'unknown'
                }
            });
            if (this.call) {
                this.emit('call-start-progress', {
                    stage: 'daily-call-object-creation',
                    status: 'started',
                    timestamp: new Date().toISOString(),
                    metadata: {
                        action: 'cleanup-existing'
                    }
                });
                this.cleanup();
            }
            var _webCall_artifactPlan_videoRecordingEnabled1;
            const isVideoRecordingEnabled = (_webCall_artifactPlan_videoRecordingEnabled1 = webCall === null || webCall === void 0 ? void 0 : (_webCall_artifactPlan1 = webCall.artifactPlan) === null || _webCall_artifactPlan1 === void 0 ? void 0 : _webCall_artifactPlan1.videoRecordingEnabled) !== null && _webCall_artifactPlan_videoRecordingEnabled1 !== void 0 ? _webCall_artifactPlan_videoRecordingEnabled1 : false;
            const isVideoEnabled = (webCall === null || webCall === void 0 ? void 0 : (_webCall_assistant1 = webCall.assistant) === null || _webCall_assistant1 === void 0 ? void 0 : (_webCall_assistant_voice1 = _webCall_assistant1.voice) === null || _webCall_assistant_voice1 === void 0 ? void 0 : _webCall_assistant_voice1.provider) === 'tavus';
            var _this_dailyCallObject_audioSource, _this_dailyCallObject_videoSource;
            // Stage 2: Create Daily call object
            this.emit('call-start-progress', {
                stage: 'daily-call-object-creation',
                status: 'started',
                timestamp: new Date().toISOString(),
                metadata: {
                    audioSource: (_this_dailyCallObject_audioSource = this.dailyCallObject.audioSource) !== null && _this_dailyCallObject_audioSource !== void 0 ? _this_dailyCallObject_audioSource : true,
                    videoSource: (_this_dailyCallObject_videoSource = this.dailyCallObject.videoSource) !== null && _this_dailyCallObject_videoSource !== void 0 ? _this_dailyCallObject_videoSource : isVideoRecordingEnabled,
                    isVideoRecordingEnabled,
                    isVideoEnabled
                }
            });
            const dailyCallStartTime = Date.now();
            try {
                var _this_dailyCallObject_audioSource1, _this_dailyCallObject_videoSource1;
                this.call = daily_js_1.default.createCallObject({
                    audioSource: (_this_dailyCallObject_audioSource1 = this.dailyCallObject.audioSource) !== null && _this_dailyCallObject_audioSource1 !== void 0 ? _this_dailyCallObject_audioSource1 : true,
                    videoSource: (_this_dailyCallObject_videoSource1 = this.dailyCallObject.videoSource) !== null && _this_dailyCallObject_videoSource1 !== void 0 ? _this_dailyCallObject_videoSource1 : isVideoRecordingEnabled,
                    dailyConfig: this.dailyCallConfig
                });
                const dailyCallDuration = Date.now() - dailyCallStartTime;
                this.emit('call-start-progress', {
                    stage: 'daily-call-object-creation',
                    status: 'completed',
                    duration: dailyCallDuration,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                const dailyCallDuration = Date.now() - dailyCallStartTime;
                this.emit('call-start-progress', {
                    stage: 'daily-call-object-creation',
                    status: 'failed',
                    duration: dailyCallDuration,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        error: error === null || error === void 0 ? void 0 : error.toString()
                    }
                });
                this.emit('error', {
                    type: 'daily-call-object-creation-error',
                    stage: 'daily-call-object-creation',
                    error,
                    timestamp: new Date().toISOString()
                });
                throw error;
            }
            (_this_call_iframe = this.call.iframe()) === null || _this_call_iframe === void 0 ? void 0 : _this_call_iframe.style.setProperty('display', 'none');
            this.call.on('left-meeting', ()=>{
                this.emit('call-end');
                if (!this.hasEmittedCallEndedStatus) {
                    this.emit('message', {
                        type: 'status-update',
                        status: 'ended',
                        'endedReason': 'customer-ended-call'
                    });
                    this.hasEmittedCallEndedStatus = true;
                }
                if (isVideoRecordingEnabled) {
                    var _this_call;
                    (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.stopRecording();
                }
                this.cleanup();
            });
            this.call.on('error', (error)=>{
                this.emit('error', error);
                if (isVideoRecordingEnabled) {
                    var _this_call;
                    (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.stopRecording();
                }
            });
            this.call.on('camera-error', (error)=>{
                this.emit('camera-error', error);
            });
            this.call.on('network-quality-change', (event)=>{
                this.emit('network-quality-change', event);
            });
            this.call.on('network-connection', (event)=>{
                this.emit('network-connection', event);
            });
            this.call.on('track-started', async (e)=>{
                var _e_participant, _e_participant1, _this_call;
                if (!e || !e.participant) {
                    return;
                }
                if ((_e_participant = e.participant) === null || _e_participant === void 0 ? void 0 : _e_participant.local) {
                    return;
                }
                if (((_e_participant1 = e.participant) === null || _e_participant1 === void 0 ? void 0 : _e_participant1.user_name) !== 'Vapi Speaker') {
                    return;
                }
                if (e.track.kind === 'video') {
                    this.emit('video', e.track);
                }
                if (e.track.kind === 'audio') {
                    await buildAudioPlayer(e.track, e.participant.session_id);
                }
                (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.sendAppMessage('playable');
            });
            this.call.on('participant-joined', (e)=>{
                if (!e || !this.call) return;
                subscribeToTracks(e, this.call, isVideoRecordingEnabled, isVideoEnabled);
            });
            this.call.on('participant-updated', (e)=>{
                if (!e) {
                    return;
                }
                this.emit('daily-participant-updated', e.participant);
            });
            this.call.on('participant-left', (e)=>{
                if (!e) {
                    return;
                }
                destroyAudioPlayer(e.participant.session_id);
            });
            // Stage 3: Mobile device handling and permissions
            const isMobile = this.isMobileDevice();
            this.emit('call-start-progress', {
                stage: 'mobile-permissions',
                status: 'started',
                timestamp: new Date().toISOString(),
                metadata: {
                    isMobile
                }
            });
            if (isMobile) {
                const mobileWaitStartTime = Date.now();
                await this.sleep(1000);
                const mobileWaitDuration = Date.now() - mobileWaitStartTime;
                this.emit('call-start-progress', {
                    stage: 'mobile-permissions',
                    status: 'completed',
                    duration: mobileWaitDuration,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        action: 'permissions-wait'
                    }
                });
            } else {
                this.emit('call-start-progress', {
                    stage: 'mobile-permissions',
                    status: 'completed',
                    timestamp: new Date().toISOString(),
                    metadata: {
                        action: 'skipped-not-mobile'
                    }
                });
            }
            // Stage 4: Join the call
            this.emit('call-start-progress', {
                stage: 'daily-call-join',
                status: 'started',
                timestamp: new Date().toISOString()
            });
            const joinStartTime = Date.now();
            try {
                await this.call.join({
                    // @ts-expect-error This exists
                    url: webCall.webCallUrl,
                    subscribeToTracksAutomatically: false
                });
                const joinDuration = Date.now() - joinStartTime;
                this.emit('call-start-progress', {
                    stage: 'daily-call-join',
                    status: 'completed',
                    duration: joinDuration,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                const joinDuration = Date.now() - joinStartTime;
                this.emit('call-start-progress', {
                    stage: 'daily-call-join',
                    status: 'failed',
                    duration: joinDuration,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        error: error === null || error === void 0 ? void 0 : error.toString()
                    }
                });
                this.emit('error', {
                    type: 'daily-call-join-error',
                    stage: 'daily-call-join',
                    error,
                    duration: joinDuration,
                    timestamp: new Date().toISOString()
                });
                throw error;
            }
            // Stage 5: Video recording setup (if enabled)
            if (isVideoRecordingEnabled) {
                this.emit('call-start-progress', {
                    stage: 'video-recording-setup',
                    status: 'started',
                    timestamp: new Date().toISOString()
                });
                const recordingRequestedTime = new Date().getTime();
                const recordingStartTime = Date.now();
                try {
                    this.call.startRecording({
                        width: 1280,
                        height: 720,
                        backgroundColor: '#FF1F2D3D',
                        layout: {
                            preset: 'default'
                        }
                    });
                    const recordingSetupDuration = Date.now() - recordingStartTime;
                    this.emit('call-start-progress', {
                        stage: 'video-recording-setup',
                        status: 'completed',
                        duration: recordingSetupDuration,
                        timestamp: new Date().toISOString()
                    });
                    this.call.on('recording-started', ()=>{
                        const totalRecordingDelay = (new Date().getTime() - recordingRequestedTime) / 1000;
                        this.emit('call-start-progress', {
                            stage: 'video-recording-started',
                            status: 'completed',
                            timestamp: new Date().toISOString(),
                            metadata: {
                                delaySeconds: totalRecordingDelay
                            }
                        });
                        this.send({
                            type: 'control',
                            control: 'say-first-message',
                            videoRecordingStartDelaySeconds: totalRecordingDelay
                        });
                    });
                } catch (error) {
                    const recordingSetupDuration = Date.now() - recordingStartTime;
                    this.emit('call-start-progress', {
                        stage: 'video-recording-setup',
                        status: 'failed',
                        duration: recordingSetupDuration,
                        timestamp: new Date().toISOString(),
                        metadata: {
                            error: error === null || error === void 0 ? void 0 : error.toString()
                        }
                    });
                    this.emit('error', {
                        type: 'video-recording-setup-error',
                        stage: 'video-recording-setup',
                        error,
                        timestamp: new Date().toISOString()
                    });
                // Don't throw here, video recording is optional
                }
            } else {
                this.emit('call-start-progress', {
                    stage: 'video-recording-setup',
                    status: 'completed',
                    timestamp: new Date().toISOString(),
                    metadata: {
                        action: 'skipped-not-enabled'
                    }
                });
            }
            // Stage 6: Audio level observer setup
            this.emit('call-start-progress', {
                stage: 'audio-observer-setup',
                status: 'started',
                timestamp: new Date().toISOString()
            });
            const audioObserverStartTime = Date.now();
            try {
                this.call.startRemoteParticipantsAudioLevelObserver(100);
                const audioObserverDuration = Date.now() - audioObserverStartTime;
                this.emit('call-start-progress', {
                    stage: 'audio-observer-setup',
                    status: 'completed',
                    duration: audioObserverDuration,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                const audioObserverDuration = Date.now() - audioObserverStartTime;
                this.emit('call-start-progress', {
                    stage: 'audio-observer-setup',
                    status: 'failed',
                    duration: audioObserverDuration,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        error: error === null || error === void 0 ? void 0 : error.toString()
                    }
                });
                this.emit('error', {
                    type: 'audio-observer-setup-error',
                    stage: 'audio-observer-setup',
                    error,
                    timestamp: new Date().toISOString()
                });
            // Don't throw here, this is non-critical
            }
            this.call.on('remote-participants-audio-level', (e)=>{
                if (e) this.handleRemoteParticipantsAudioLevel(e);
            });
            this.call.on('app-message', (e)=>this.onAppMessage(e));
            this.call.on('nonfatal-error', (e)=>{
                // https://docs.daily.co/reference/daily-js/events/meeting-events#type-audio-processor-error
                if ((e === null || e === void 0 ? void 0 : e.type) === 'audio-processor-error') {
                    var _this_call;
                    (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.updateInputSettings({
                        audio: {
                            processor: {
                                type: 'none'
                            }
                        }
                    }).then(()=>{
                        (0, daily_guards_1.safeSetLocalAudio)(this.call, true);
                    });
                }
            });
            // Stage 7: Audio processing setup
            this.emit('call-start-progress', {
                stage: 'audio-processing-setup',
                status: 'started',
                timestamp: new Date().toISOString()
            });
            const audioProcessingStartTime = Date.now();
            try {
                this.call.updateInputSettings({
                    audio: {
                        processor: {
                            type: 'noise-cancellation'
                        }
                    }
                });
                const audioProcessingDuration = Date.now() - audioProcessingStartTime;
                this.emit('call-start-progress', {
                    stage: 'audio-processing-setup',
                    status: 'completed',
                    duration: audioProcessingDuration,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                const audioProcessingDuration = Date.now() - audioProcessingStartTime;
                this.emit('call-start-progress', {
                    stage: 'audio-processing-setup',
                    status: 'failed',
                    duration: audioProcessingDuration,
                    timestamp: new Date().toISOString(),
                    metadata: {
                        error: error === null || error === void 0 ? void 0 : error.toString()
                    }
                });
                this.emit('error', {
                    type: 'audio-processing-setup-error',
                    stage: 'audio-processing-setup',
                    error,
                    timestamp: new Date().toISOString()
                });
            // Don't throw here, this is non-critical
            }
            const totalDuration = Date.now() - startTime;
            this.emit('call-start-success', {
                totalDuration,
                callId: (webCall === null || webCall === void 0 ? void 0 : webCall.id) || 'unknown',
                timestamp: new Date().toISOString()
            });
            return webCall;
        } catch (e) {
            const totalDuration = Date.now() - startTime;
            this.emit('call-start-failed', {
                stage: 'unknown',
                totalDuration,
                error: (e === null || e === void 0 ? void 0 : e.toString()) || 'Unknown error occurred',
                errorStack: e instanceof Error ? e.stack : 'No stack trace available',
                timestamp: new Date().toISOString(),
                context: {
                    hasAssistant: !!assistant,
                    hasSquad: !!squad,
                    hasWorkflow: !!workflow,
                    isMobile: this.isMobileDevice()
                }
            });
            // Also emit the generic error event for backward compatibility
            this.emit('error', {
                type: 'start-method-error',
                stage: 'unknown',
                error: e,
                totalDuration,
                timestamp: new Date().toISOString(),
                context: {
                    hasAssistant: !!assistant,
                    hasSquad: !!squad,
                    hasWorkflow: !!workflow,
                    isMobile: this.isMobileDevice()
                }
            });
            this.cleanup();
            return null;
        }
    }
    onAppMessage(e) {
        if (!e) {
            return;
        }
        try {
            if (e.data === 'listening') {
                return this.emit('call-start');
            } else {
                try {
                    const parsedMessage = JSON.parse(e.data);
                    this.emit('message', parsedMessage);
                    if (parsedMessage && 'type' in parsedMessage && 'status' in parsedMessage && parsedMessage.type === 'status-update' && parsedMessage.status === 'ended') {
                        this.hasEmittedCallEndedStatus = true;
                    }
                } catch (parseError) {
                    console.log('Error parsing message data: ', parseError);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    handleRemoteParticipantsAudioLevel(e) {
        const speechLevel = Object.values(e.participantsAudioLevel).reduce((a, b)=>a + b, 0);
        this.emit('volume-level', Math.min(1, speechLevel / 0.15));
        const isSpeaking = speechLevel > 0.01;
        if (!isSpeaking) {
            return;
        }
        if (this.speakingTimeout) {
            clearTimeout(this.speakingTimeout);
            this.speakingTimeout = null;
        } else {
            this.emit('speech-start');
        }
        this.speakingTimeout = setTimeout(()=>{
            this.emit('speech-end');
            this.speakingTimeout = null;
        }, 1000);
    }
    stop() {
        var _this_call;
        this.started = false;
        (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.destroy();
        this.call = null;
    }
    send(message) {
        var _this_call;
        (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.sendAppMessage(JSON.stringify(message));
    }
    setMuted(mute) {
        (0, daily_guards_1.safeSetLocalAudio)(this.call, !mute);
    }
    isMuted() {
        if (!this.call) {
            return false;
        }
        return this.call.localAudio() === false;
    }
    say(message, endCallAfterSpoken, interruptionsEnabled, interruptAssistantEnabled) {
        this.send({
            type: 'say',
            message,
            endCallAfterSpoken,
            interruptionsEnabled: interruptionsEnabled !== null && interruptionsEnabled !== void 0 ? interruptionsEnabled : false,
            interruptAssistantEnabled: interruptAssistantEnabled !== null && interruptAssistantEnabled !== void 0 ? interruptAssistantEnabled : false
        });
    }
    setInputDevicesAsync(options) {
        return (0, daily_guards_1.safeSetInputDevicesAsync)(this.call, options);
    }
    async increaseMicLevel(gain) {
        if (!this.call) {
            throw new Error('Call object is not available.');
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const gainNode = audioContext.createGain();
            gainNode.gain.value = gain;
            source.connect(gainNode);
            const destination = audioContext.createMediaStreamDestination();
            gainNode.connect(destination);
            const [boostedTrack] = destination.stream.getAudioTracks();
            await (0, daily_guards_1.safeSetInputDevicesAsync)(this.call, {
                audioSource: boostedTrack
            });
        } catch (error) {
            console.error("Error adjusting microphone level:", error);
        }
    }
    setOutputDeviceAsync(options) {
        var _this_call;
        (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.setOutputDeviceAsync(options);
    }
    getDailyCallObject() {
        return this.call;
    }
    startScreenSharing(displayMediaOptions, screenVideoSendSettings) {
        var _this_call;
        (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.startScreenShare({
            displayMediaOptions,
            screenVideoSendSettings
        });
    }
    stopScreenSharing() {
        var _this_call;
        (_this_call = this.call) === null || _this_call === void 0 ? void 0 : _this_call.stopScreenShare();
    }
    constructor(apiToken, apiBaseUrl, dailyCallConfig, dailyCallObject){
        super(), _define_property._(this, "started", false), _define_property._(this, "call", null), _define_property._(this, "speakingTimeout", null), _define_property._(this, "dailyCallConfig", {}), _define_property._(this, "dailyCallObject", {}), _define_property._(this, "hasEmittedCallEndedStatus", false);
        client_1.client.baseUrl = apiBaseUrl !== null && apiBaseUrl !== void 0 ? apiBaseUrl : 'https://api.vapi.ai';
        client_1.client.setSecurityData(apiToken);
        this.dailyCallConfig = (0, daily_guards_1.createSafeDailyConfig)(dailyCallConfig);
        this.dailyCallObject = (0, daily_guards_1.createSafeDailyFactoryOptions)(dailyCallObject);
    }
}
exports.default = Vapi;
}),
]);

//# sourceMappingURL=cb17f_%40vapi-ai_web_dist_f7c78645._.js.map