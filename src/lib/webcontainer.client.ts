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

export let webcontainer: Promise<WebContainer> = new Promise(() => {
  // noop for ssr environments
});

function ensureClientEnvironment() {
  if (typeof window === 'undefined') {
    throw new Error('WebContainer can only be booted in a browser environment.');
  }
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    const cleaned = cleanStackTrace(error);
    error.message = cleaned;
    return error;
  }

  return new Error(cleanStackTrace(error));
}

export async function bootWebcontainer(): Promise<WebContainer> {
  ensureClientEnvironment();

  if (instance) {
    return instance;
  }

  if (!bootPromise) {
    bootPromise = WebContainer.boot({ workdirName: WORK_DIR_NAME })
      .then((webcontainerInstance) => {
        instance = webcontainerInstance;
        webcontainerContext.loaded = true;
        webcontainerContext.error = null;
        return webcontainerInstance;
      })
      .catch((error) => {
        const normalized = normalizeError(error);
        webcontainerContext.loaded = false;
        webcontainerContext.error = normalized.message;
        bootPromise = null;
        throw normalized;
      });

    webcontainer = bootPromise;
  }

  return bootPromise;
}

export function getCurrentWebcontainer(): WebContainer | null {
  return instance;
}

export async function teardownWebcontainer(): Promise<void> {
  if (instance) {
    instance.teardown();
    instance = null;
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
