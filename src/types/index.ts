// BIND Standard — Core Data Types
// Insurance Interoperability Standard
//
// This barrel file re-exports all BIND resource types.

// --- Base types ---
export type { AdditionalInterest } from "./additional-interest";
export type {
  Address,
  Attachment,
  CodeableConcept,
  Coding,
  ContactPoint,
  GeoPoint,
  Identifier,
  Meta,
  Money,
  Period,
  Quantity,
  Reference,
  Resource,
} from "./base";
export type {
  Certificate,
  CertificateHolder,
  CoverageSummary,
} from "./certificate";
export type {
  Claim,
  Claimant,
  ClaimFinancials,
  ClaimPayment,
  ClaimReport,
  ClaimsAssignment,
  SubrogationDetail,
} from "./claim";
export type { Commission, CommissionSplit, CommissionTier } from "./commission";
export type {
  Classification,
  Coverage,
  CoverageExtension,
  CoverageLimit,
} from "./coverage";
export type {
  DateTimePeriod,
  GeoRegion,
  HumanName,
  InsuranceUnit,
  MoneyWithConversion,
  MultiCurrencyMoney,
  UcumUnit,
} from "./datatypes";
// --- Complex data types ---
export {
  BIND_INSURANCE_UNITS_SYSTEM,
  UCUM_SYSTEM,
} from "./datatypes";
export type { Deductible } from "./deductible";
export type { Exclusion, PolicyCondition } from "./exclusion";
// --- Insurance domain supporting types ---
export type { FinancialRating } from "./financial-rating";
export type { InsuranceForm } from "./form";
export type {
  CarrierAppointment,
  InsuranceSpecialty,
  SplitLimitComponent,
} from "./insurance-common";
// --- Resources ---
export type { Insured } from "./insured";
export type { Lienholder } from "./lienholder";
export type { Location, SprinklerDetail } from "./location";
export type { LargeLoss, LossHistory } from "./loss-history";
export type { DrivingViolation, NamedDriver } from "./named-driver";
export type { Note } from "./note";
export type { Organization } from "./organization";
export type { License, Person } from "./person";
export type { PersonRole } from "./person-role";
export type { Endorsement, EndorsementChange, Policy } from "./policy";
export type { PolicyTransaction } from "./policy-transaction";
export type {
  Premium,
  PremiumAdjustment,
  PremiumAllocation,
  PremiumBasis,
  PremiumInstallment,
} from "./premium";
// --- Primitives ---
export type {
  BindBase64Binary,
  BindBoolean,
  BindDate,
  BindDateTime,
  BindDecimal,
  BindId,
  BindInstant,
  BindInteger,
  BindMarkdown,
  BindPercentage,
  BindPositiveInt,
  BindString,
  BindTime,
  BindUri,
  BindUrl,
  BindYear,
} from "./primitives";
export type { QuestionResponse } from "./question-response";
export type { PremiumLineItem, Quote, Subjectivity } from "./quote";
export type { AssetValuation, Risk, RiskCharacteristic } from "./risk";
export type { ScheduledItem } from "./scheduled-item";
export type { Submission } from "./submission";
