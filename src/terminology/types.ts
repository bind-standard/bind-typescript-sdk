// BIND Terminology Server — TypeScript Types
// Mirrors the code system types served by https://bind.codes

/**
 * A localized display value for a concept.
 * Used for multi-language support (e.g., French-Canadian "fr-CA").
 */
export interface Designation {
  /** BCP-47 language code (e.g., "fr-CA", "es") */
  language: string;
  /** Localized display value */
  value: string;
}

/**
 * A single concept within a code system.
 * Represents a coded value with display text and optional localized alternatives.
 *
 * @example
 * {
 *   "code": "shingle",
 *   "display": "Shingle",
 *   "definition": "Asphalt or fiberglass shingle roof covering.",
 *   "designation": [{ "language": "fr-CA", "value": "Bardeaux" }]
 * }
 */
export interface CodeSystemConcept {
  /** Unique code within this code system */
  code: string;
  /** Primary display text */
  display: string;
  /** Definition / description of the code */
  definition?: string;
  /** Localized display alternatives */
  designation?: Designation[];
}

/**
 * A BIND terminology code system resource.
 * Contains a set of coded concepts for a specific domain
 * (e.g., roof types, vehicle uses, lines of business).
 *
 * @example
 * {
 *   "resourceType": "CodeSystem",
 *   "id": "roof-type",
 *   "url": "https://bind.codes/roof-type",
 *   "name": "RoofType",
 *   "title": "Roof Type",
 *   "status": "active",
 *   "description": "Types of roofing materials.",
 *   "concept": [...]
 * }
 */
export interface CodeSystem {
  /** Always "CodeSystem" */
  resourceType: "CodeSystem";
  /** Code system identifier (e.g., "roof-type") */
  id: string;
  /** Canonical URL (e.g., "https://bind.codes/roof-type") */
  url: string;
  /** PascalCase name */
  name: string;
  /** Human-readable title */
  title: string;
  /** Publication status */
  status: "draft" | "active" | "retired" | "unknown";
  /** Default language (BCP-47, defaults to "en") */
  language?: string;
  /** Code system description */
  description: string;
  /** Concepts in this code system */
  concept: CodeSystemConcept[];
}

/**
 * Summary of a code system (without the full concept list).
 * Returned by the list endpoint.
 */
export interface CodeSystemSummary {
  /** Code system identifier */
  id: string;
  /** Canonical URL */
  url: string;
  /** PascalCase name */
  name: string;
  /** Human-readable title */
  title: string;
  /** Publication status */
  status: string;
  /** Number of concepts in the code system */
  count?: number;
}

/**
 * Result of a concept lookup or search.
 */
export interface LookupResult {
  /** Code system URL */
  system: string;
  /** Concept code */
  code: string;
  /** Display text (localized if lang was specified) */
  display: string;
  /** Concept definition */
  definition: string;
  /** Localized display alternatives */
  designation?: Designation[];
}

/**
 * Error response from the terminology server.
 */
export interface TerminologyError {
  /** Error message */
  error: string;
}
