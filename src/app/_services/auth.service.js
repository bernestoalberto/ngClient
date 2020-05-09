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
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.loggedIn = false;
        // set token if saved in local storage
        var user = JSON.parse(localStorage.getItem('user'));
        this.token = user && user.token;
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('http://208.104.17.253:6776/authenticate', { username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            var info = response.json() && response.json().user;
            if (token) {
                // set token property
                _this.token = token;
                try {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify({ info: info, token: token }));
                }
                catch (err) {
                    console.log(err);
                }
                // return true to indicate successful login
                return true;
            }
            return false;
        });
    };
    AuthService.prototype.logout = function () {
        this.token = null;
        localStorage.removeItem('user');
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
