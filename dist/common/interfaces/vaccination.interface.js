"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccinationStatus = exports.VaccineType = void 0;
var VaccineType;
(function (VaccineType) {
    VaccineType["ANTIRABIC"] = "antirabic";
    VaccineType["DEPARAZITARE"] = "deparazitare";
    VaccineType["POLIVALENT"] = "polivalent";
    VaccineType["TRIVALENT"] = "trivalent";
    VaccineType["MIXOMATOZA"] = "mixomatoza";
})(VaccineType || (exports.VaccineType = VaccineType = {}));
var VaccinationStatus;
(function (VaccinationStatus) {
    VaccinationStatus["VALID"] = "valid";
    VaccinationStatus["DUE_SOON"] = "due_soon";
    VaccinationStatus["EXPIRED"] = "expired";
})(VaccinationStatus || (exports.VaccinationStatus = VaccinationStatus = {}));
//# sourceMappingURL=vaccination.interface.js.map