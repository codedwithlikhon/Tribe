import { WebContainer, auth, type AuthAPI } from '@webcontainer/api';
import { WORK_DIR_NAME } from '@/utils/constants';
import { cleanStackTrace } from '@/utils/stacktrace';

interface WebContainerContext {
  loaded: boolean;
  error: string | null;
}

export const webcontainerContext: WebContainerContext = {
  loaded: false,
  error: null,
};

let bootPromise: Promise<WebContainer> | null = null;
let instance: WebContainer | null = null;

const LOGGER_PREFIX = '[webcontainer]';
class CrossOriginIsolationError extends Error {
  static readonly MESSAGE = [
    'WebContainers require cross-origin isolation (SharedArrayBuffer availability).',
    'Serve the app with Cross-Origin-Embedder-Policy: require-corp and Cross-Origin-Opener-Policy: same-origin (or credentialless with matching boot options),',
    'then open Tribe in its own tab and hard-refresh to apply the headers.',
  ].join(' ');

  constructor() {
    super(CrossOriginIsolationError.MESSAGE);
    this.name = 'CrossOriginIsolationError';
  }
}

function createCrossOriginIsolationError(): CrossOriginIsolationError {
  return new CrossOriginIsolationError();
}

export let webcontainer: Promise<WebContainer> = new Promise(() => {
  // noop for ssr environments
});

function ensureClientEnvironment() {
  if (typeof window === 'undefined') {
    throw new Error('WebContainer can only be booted in a browser environment.');
  }
}

function ensureCrossOriginIsolation() {
  if (typeof window === 'undefined') {
    return;
  }

  const hasSharedArrayBuffer = typeof window.SharedArrayBuffer !== 'undefined';
  const isIsolated = (window as typeof window & { crossOriginIsolated?: boolean }).crossOriginIsolated === true;

  if (!hasSharedArrayBuffer || !isIsolated) {
    const isolationError = createCrossOriginIsolationError();
    webcontainerContext.loaded = false;
    webcontainerContext.error = isolationError.message;
    throw isolationError;
  }
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    if (
      (error.name === 'DataCloneError' || error.message.includes('SharedArrayBuffer')) &&
      error.message.includes('SharedArrayBuffer')
    ) {
      return createCrossOriginIsolationError();
    }

    const cleaned = cleanStackTrace(error);
    error.message = cleaned;
    return error;
  }

  return new Error(cleanStackTrace(error));
}

export async function bootWebcontainer(): Promise<WebContainer> {
  ensureClientEnvironment();
  ensureCrossOriginIsolation();

  if (instance) {
    console.debug(`${LOGGER_PREFIX} returning existing instance`);
    return instance;
  }

  if (!bootPromise) {
    console.info(`${LOGGER_PREFIX} boot requested for workdir "${WORK_DIR_NAME}"`);
    bootPromise = (async () => {
      try {
        const webcontainerInstance = await WebContainer.boot({ workdirName: WORK_DIR_NAME });
        instance = webcontainerInstance;
        webcontainerContext.loaded = true;
        webcontainerContext.error = null;
        console.info(`${LOGGER_PREFIX} boot completed`);
        return webcontainerInstance;
      } catch (error) {
        const normalized = normalizeError(error);
        webcontainerContext.loaded = false;
        webcontainerContext.error = normalized.message;
        bootPromise = null;
        console.error(`${LOGGER_PREFIX} boot failed`, normalized);
        throw normalized;
      }
    })();

    webcontainer = bootPromise;
  } else {
    console.debug(`${LOGGER_PREFIX} boot already in progress`);
  }

  return bootPromise;
}

export function getCurrentWebcontainer(): WebContainer | null {
  return instance;
}

export async function teardownWebcontainer(): Promise<void> {
  if (instance) {
    console.info(`${LOGGER_PREFIX} tearing down instance`);
    await Promise.resolve(instance.teardown());
    instance = null;
    console.info(`${LOGGER_PREFIX} teardown completed`);
  } else {
    console.debug(`${LOGGER_PREFIX} no active instance to teardown`);
  }
  bootPromise = null;
  webcontainerContext.loaded = false;
  webcontainerContext.error = null;
  webcontainer = new Promise(() => {
    // noop for ssr environments
  });
}

/**
 * This client-only module exposes the WebContainer auth helpers to avoid
 * bundling `@webcontainer/api` into server-side code.
 */
export { auth, type AuthAPI };
