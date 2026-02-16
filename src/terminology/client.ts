// BIND Terminology Server — Typed HTTP Client
// A lightweight, zero-dependency client for https://bind.codes

import type { CodeSystem, CodeSystemSummary, LookupResult, TerminologyError } from "./types";

const DEFAULT_BASE_URL = "https://bind.codes";

export interface TerminologyClientOptions {
  /** Base URL of the terminology server. Defaults to "https://bind.codes". */
  baseUrl?: string;
  /** Custom fetch implementation (defaults to global fetch). */
  fetch?: typeof globalThis.fetch;
}

export class TerminologyClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: TerminologyError,
  ) {
    super(message);
    this.name = "TerminologyClientError";
  }
}

/**
 * Typed HTTP client for the BIND Terminology Server API.
 *
 * @example
 * ```ts
 * import { TerminologyClient } from "@bind-standard /sdk/terminology";
 *
 * const client = new TerminologyClient();
 *
 * // List all code systems
 * const systems = await client.list();
 *
 * // Get a specific code system
 * const roofTypes = await client.get("roof-type");
 *
 * // Look up a single concept
 * const metal = await client.lookup("roof-type", "metal");
 *
 * // Search across all code systems
 * const results = await client.search("shingle");
 *
 * // Get localized values
 * const frenchRoofTypes = await client.get("roof-type", { lang: "fr-CA" });
 * ```
 */
export class TerminologyClient {
  private readonly baseUrl: string;
  private readonly fetch: typeof globalThis.fetch;

  constructor(options?: TerminologyClientOptions) {
    this.baseUrl = (options?.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.fetch = options?.fetch ?? globalThis.fetch.bind(globalThis);
  }

  /**
   * List all available code systems.
   * Returns summaries without the full concept arrays.
   */
  async list(): Promise<CodeSystemSummary[]> {
    return this.request<CodeSystemSummary[]>("/list");
  }

  /**
   * Get a full code system by ID, including all concepts.
   *
   * @param id - Code system identifier (e.g., "roof-type", "line-of-business")
   * @param options - Optional parameters
   * @param options.lang - BCP-47 language code for localized display values (e.g., "fr-CA")
   */
  async get(id: string, options?: { lang?: string }): Promise<CodeSystem> {
    const params = new URLSearchParams();
    if (options?.lang) params.set("lang", options.lang);
    const qs = params.toString();
    return this.request<CodeSystem>(`/${encodeURIComponent(id)}${qs ? `?${qs}` : ""}`);
  }

  /**
   * Look up a single concept by code within a specific code system.
   *
   * @param id - Code system identifier (e.g., "roof-type")
   * @param code - Concept code to look up (e.g., "metal")
   * @param options - Optional parameters
   * @param options.lang - BCP-47 language code for localized display values
   */
  async lookup(id: string, code: string, options?: { lang?: string }): Promise<LookupResult> {
    const params = new URLSearchParams({ code });
    if (options?.lang) params.set("lang", options.lang);
    return this.request<LookupResult>(`/${encodeURIComponent(id)}/$lookup?${params.toString()}`);
  }

  /**
   * Full-text search across all code systems.
   * Searches code, display, and designation values.
   *
   * @param query - Search query (e.g., "shingle", "general liability")
   * @param options - Optional parameters
   * @param options.lang - BCP-47 language code for localized display values
   */
  async search(query: string, options?: { lang?: string }): Promise<LookupResult[]> {
    const params = new URLSearchParams({ q: query });
    if (options?.lang) params.set("lang", options.lang);
    return this.request<LookupResult[]>(`/$search?${params.toString()}`);
  }

  /**
   * Health check — verifies the terminology server is reachable.
   */
  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health");
  }

  private async request<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await this.fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      let body: TerminologyError | undefined;
      try {
        body = (await response.json()) as TerminologyError;
      } catch {
        // ignore parse errors
      }
      throw new TerminologyClientError(
        body?.error ?? `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        body,
      );
    }

    return (await response.json()) as T;
  }
}
