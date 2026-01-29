"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnquiryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_enquiry_dto_1 = require("./create-enquiry.dto");
class UpdateEnquiryDto extends (0, mapped_types_1.PartialType)(create_enquiry_dto_1.CreateEnquiryDto) {
}
exports.UpdateEnquiryDto = UpdateEnquiryDto;
//# sourceMappingURL=update-enquiry.dto.js.map