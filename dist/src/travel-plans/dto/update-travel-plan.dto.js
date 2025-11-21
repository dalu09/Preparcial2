"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTravelPlanDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_travel_plan_dto_1 = require("./create-travel-plan.dto");
class UpdateTravelPlanDto extends (0, mapped_types_1.PartialType)(create_travel_plan_dto_1.CreateTravelPlanDto) {
}
exports.UpdateTravelPlanDto = UpdateTravelPlanDto;
//# sourceMappingURL=update-travel-plan.dto.js.map