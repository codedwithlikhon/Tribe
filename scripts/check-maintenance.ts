import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

interface MaintenanceStatus {
  name: string;
  latestVersion: string;
  deprecated: boolean;
  lastPublishDate: string;
  stale: boolean;
  error?: string;
}

interface NpmViewResponse {
  time?: Record<string, string> & { modified?: string };
  version?: string | string[];
  deprecated?: string | boolean;
}

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
const ROOT_DIR = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const execFileAsync = promisify(execFile);

function resolveRoot(...segments: string[]): string {
  return path.resolve(ROOT_DIR, ...segments);
}

async function readPackageJson(): Promise<PackageJson> {
  const packageJsonPath = resolveRoot('package.json');
  const file = await readFile(packageJsonPath, 'utf8');
  return JSON.parse(file) as PackageJson;
}

function resolveLatestVersion(version: NpmViewResponse['version']): string {
  if (typeof version === 'string') {
    return version;
  }
  if (Array.isArray(version) && version.length) {
    return version[version.length - 1];
  }
  return 'unknown';
}

async function fetchPackageMetadata(name: string): Promise<MaintenanceStatus> {
  const { stdout } = await execFileAsync('npm', ['view', name, '--json', 'time', 'version', 'deprecated'], {
    maxBuffer: 1024 * 1024 * 10,
  });
  const data = JSON.parse(stdout) as NpmViewResponse;
  const latestVersion = resolveLatestVersion(data.version);
  const modified = data.time?.modified ?? (latestVersion !== 'unknown' ? data.time?.[latestVersion] : undefined);
  const modifiedDate = modified ? new Date(modified) : null;
  const stale = modifiedDate ? Date.now() - modifiedDate.getTime() > ONE_YEAR_MS : true;

  return {
    name,
    latestVersion,
    deprecated: Boolean(data.deprecated),
    lastPublishDate: modifiedDate ? modifiedDate.toISOString() : 'unknown',
    stale,
  };
}

async function main(): Promise<void> {
  const packageJson = await readPackageJson();
  const packageNames = Object.keys({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  }).sort();

  if (!packageNames.length) {
    console.warn('No dependencies found to check.');
    return;
  }

  console.info(`Checking maintenance status for ${packageNames.length} packages...`);

  const results = await Promise.all(
    packageNames.map(async (name) => {
      try {
        return await fetchPackageMetadata(name);
      } catch (error) {
        return {
          name,
          latestVersion: 'unknown',
          deprecated: false,
          lastPublishDate: 'unknown',
          stale: false,
          error: error instanceof Error ? error.message : String(error),
        } satisfies MaintenanceStatus;
      }
    })
  );

  console.table(
    results.map(({ name, latestVersion, deprecated, lastPublishDate, stale, error }) => ({
      package: name,
      latestVersion,
      deprecated,
      lastPublishDate,
      stale,
      error: error ?? '',
    }))
  );

  const deprecatedPackages = results.filter((result) => result.deprecated);
  const stalePackages = results.filter((result) => result.stale && !result.deprecated);

  if (deprecatedPackages.length) {
    console.warn('Deprecated packages detected:', deprecatedPackages.map((pkg) => pkg.name));
  }

  if (stalePackages.length) {
    console.warn('Packages with no releases in the last year:', stalePackages.map((pkg) => pkg.name));
  }
}

await main();
