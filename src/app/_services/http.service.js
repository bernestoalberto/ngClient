"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var auth_service_1 = require("./auth.service");
var config = require('../../../config/config.js');
require("rxjs/add/operator/map");
var HttpService = (function () {
    function HttpService(_http, authService) {
        this._http = _http;
        this.authService = authService;
        var host = location.host;
        this.urlRoot = config.api.uri + ":" + config.api.port + config.api.path;
        if (host.indexOf('localhost') >= 0) {
            this.urlRoot = 'http://cd208.104.16.5:6776/api/v1';
        }
    }
    HttpService.prototype._createAuthHeaders = function () {
        var headers = new http_1.Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        if (this.authService.info) {
            headers.set('x-token', this.authService.token);
        }
        return headers;
    };
    HttpService.prototype.get = function (url, options) {
        return this._request(http_1.RequestMethod.Get, url, null, options);
    };
    HttpService.prototype.post = function (url, body, options) {
        return this._request(http_1.RequestMethod.Post, url, body, options);
    };
    HttpService.prototype.put = function (url, body, options) {
        return this._request(http_1.RequestMethod.Put, url, body, options);
    };
    HttpService.prototype.delete = function (url, options) {
        return this._request(http_1.RequestMethod.Delete, url, null, options);
    };
    HttpService.prototype.options = function (url, options) {
        return this._request(http_1.RequestMethod.Options, url, null, options);
    };
    HttpService.prototype._request = function (method, relativeUrl, body, options) {
        var url = this.urlRoot + relativeUrl;
        return this._http.request(url, new http_1.RequestOptions(Object.assign({
            method: method,
            url: url,
            body: body,
            headers: this._createAuthHeaders()
        }, options)));
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
