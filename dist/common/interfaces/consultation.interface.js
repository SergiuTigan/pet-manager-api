"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationStatus = exports.ConsultationType = void 0;
var ConsultationType;
(function (ConsultationType) {
    ConsultationType["CONTROL_RUTINA"] = "control_rutina";
    ConsultationType["URGENTA"] = "urgenta";
    ConsultationType["VACCINARE"] = "vaccinare";
    ConsultationType["CHIRURGIE"] = "chirurgie";
})(ConsultationType || (exports.ConsultationType = ConsultationType = {}));
var ConsultationStatus;
(function (ConsultationStatus) {
    ConsultationStatus["SCHEDULED"] = "scheduled";
    ConsultationStatus["IN_PROGRESS"] = "in_progress";
    ConsultationStatus["COMPLETED"] = "completed";
    ConsultationStatus["CANCELLED"] = "cancelled";
})(ConsultationStatus || (exports.ConsultationStatus = ConsultationStatus = {}));
//# sourceMappingURL=consultation.interface.js.map