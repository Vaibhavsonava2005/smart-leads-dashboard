"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadSource = exports.LeadStatus = void 0;
var LeadStatus;
(function (LeadStatus) {
    LeadStatus["NEW"] = "New";
    LeadStatus["CONTACTED"] = "Contacted";
    LeadStatus["QUALIFIED"] = "Qualified";
    LeadStatus["LOST"] = "Lost";
})(LeadStatus || (exports.LeadStatus = LeadStatus = {}));
var LeadSource;
(function (LeadSource) {
    LeadSource["WEBSITE"] = "Website";
    LeadSource["INSTAGRAM"] = "Instagram";
    LeadSource["REFERRAL"] = "Referral";
})(LeadSource || (exports.LeadSource = LeadSource = {}));
