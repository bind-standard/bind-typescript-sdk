# BIND TypeScript SDK

TypeScript SDK for the [BIND Standard](https://bind-standard.org) — the open data model for insurance interoperability.

Includes all BIND resource types and a typed client for the [BIND Terminology Server](https://bind.codes).

## Install

```bash
npm install @bind-insurance/sdk
```

## Types

Every BIND resource type is exported as a TypeScript interface:

```ts
import type { Policy, Claim, Coverage, Submission, Quote } from "@bind-insurance/sdk";
import type { Insured, Organization, Person, PersonRole } from "@bind-insurance/sdk";
import type { Location, Risk, RiskCharacteristic } from "@bind-insurance/sdk";
```

Base data types are also available:

```ts
import type {
  Address,
  Money,
  CodeableConcept,
  Reference,
  Period,
  Coding,
} from "@bind-insurance/sdk";
```

You can also import from the `types` subpath if you only need the types:

```ts
import type { Policy } from "@bind-insurance/sdk/types";
```

## Terminology Client

A zero-dependency, typed HTTP client for the [BIND Terminology Server](https://bind.codes) (280+ insurance code systems):

```ts
import { TerminologyClient } from "@bind-insurance/sdk";

const client = new TerminologyClient();

// List all code systems
const systems = await client.list();

// Get a full code system
const roofTypes = await client.get("roof-type");

// Look up a single concept
const metal = await client.lookup("roof-type", "metal");

// Search across all code systems
const results = await client.search("shingle");

// Localized display values
const french = await client.get("construction-type", { lang: "fr-CA" });
```

You can also import from the `terminology` subpath:

```ts
import { TerminologyClient } from "@bind-insurance/sdk/terminology";
import type { CodeSystem, LookupResult } from "@bind-insurance/sdk/terminology";
```

### Custom Base URL

Point the client at a different server instance:

```ts
const client = new TerminologyClient({ baseUrl: "http://localhost:8787" });
```

## Syncing Types from bind-standard

The canonical type definitions live in [`bind-standard`](https://github.com/bindstandard/bind-standard). To sync updated types into this SDK:

```bash
pnpm run sync:types
```

This copies the type files from a sibling `bind-standard` directory. Pass a custom path with:

```bash
pnpm run sync:types -- --standard-path /path/to/bind-standard
```

## Development

```bash
pnpm install
pnpm run typecheck    # TypeScript type checking
pnpm run check        # Biome lint + format check
pnpm run build        # Compile to dist/
```

## CI/CD

- **CI** — Runs typecheck, lint, and build on every push and pull request.
- **Publish** — Publishes to npm on GitHub release. Requires an `NPM_TOKEN` secret.

## Contributing

We welcome contributions from everyone. See [CONTRIBUTING.md](CONTRIBUTING.md) for details, or open a pull request directly.

For questions or ideas, reach out at **contact@bind-standard.org**.

## License

Released under the [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) license — dedicated to the public domain. You are free to use, modify, and build upon it without restriction.
