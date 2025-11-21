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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const country_entity_1 = require("./country.entity");
let CountriesService = class CountriesService {
    countryRepo;
    api;
    constructor(countryRepo, api) {
        this.countryRepo = countryRepo;
        this.api = api;
    }
    async findAll() {
        return this.countryRepo.find();
    }
    async findByCode(code) {
        const codeUpper = code.toUpperCase();
        const cached = await this.countryRepo.findOne({ where: { code: codeUpper } });
        if (cached) {
            return { source: 'cache', data: cached };
        }
        const external = await this.api.getCountryByCode(codeUpper);
        if (!external) {
            throw new common_1.NotFoundException(`Country ${codeUpper} not found`);
        }
        const saved = await this.countryRepo.save(external);
        return { source: 'api', data: saved };
    }
    async create(countryData) {
        const country = this.countryRepo.create({
            ...countryData,
            code: countryData.code?.toUpperCase(),
        });
        return this.countryRepo.save(country);
    }
    async update(code, updateData) {
        const country = await this.countryRepo.findOne({
            where: { code: code.toUpperCase() },
        });
        if (!country) {
            throw new common_1.NotFoundException(`Country ${code} not found`);
        }
        Object.assign(country, updateData);
        return this.countryRepo.save(country);
    }
    async remove(code) {
        const result = await this.countryRepo.delete(code.toUpperCase());
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Country ${code} not found`);
        }
        return { deleted: true };
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __param(1, (0, common_1.Inject)('COUNTRIES_API')),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], CountriesService);
//# sourceMappingURL=countries.service.js.map