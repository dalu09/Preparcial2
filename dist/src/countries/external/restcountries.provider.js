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
exports.RestCountriesAPI = void 0;
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
let RestCountriesAPI = class RestCountriesAPI {
    http;
    constructor(http) {
        this.http = http;
    }
    async getCountryByCode(code) {
        try {
            const url = `https://restcountries.com/v3.1/alpha/${code}`;
            const response = await (0, rxjs_1.firstValueFrom)(this.http.get(url));
            if (!response.data || response.data.length === 0) {
                return null;
            }
            const c = response.data[0];
            return {
                code: code.toUpperCase(),
                name: c.name?.common ?? '',
                region: c.region ?? '',
                subregion: c.subregion ?? '',
                capital: c.capital?.[0] ?? '',
                population: c.population ?? 0,
                flagUrl: c.flags?.svg ?? c.flags?.png ?? '',
            };
        }
        catch {
            return null;
        }
    }
};
exports.RestCountriesAPI = RestCountriesAPI;
exports.RestCountriesAPI = RestCountriesAPI = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RestCountriesAPI);
//# sourceMappingURL=restcountries.provider.js.map