import { ofetch } from "ofetch";
import { useAuthStore } from "../stores/auth";
import { useErrorStore } from "../stores/errors";
import { useLoadingStore } from "../stores/loading";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

interface ErrorResponse {
  message?: string;
  error?: string;
}

// Generate unique request ID for tracking
let requestIdCounter = 0;
const generateRequestId = () => `req-${++requestIdCounter}`;

export const api = ofetch.create({
  baseURL,
  retry: 0,
  onRequest({ options }) {
    // Generate unique ID for this request
    const requestId = generateRequestId();
    (options as any)._requestId = requestId;

    // Start loading state
    const loading = useLoadingStore();
    loading.start(requestId);

    // Attach auth token
    const auth = useAuthStore();
    if (auth.token) {
      options.headers = new Headers(options.headers);
      options.headers.set("Authorization", `Bearer ${auth.token}`);
    }
  },
  onResponse({ options }) {
    // Stop loading state on success
    const requestId = (options as any)._requestId;
    if (requestId) {
      const loading = useLoadingStore();
      loading.stop(requestId);
    }
  },
  onResponseError({ response, options }) {
    // Stop loading state on error
    const requestId = (options as any)._requestId;
    if (requestId) {
      const loading = useLoadingStore();
      loading.stop(requestId);
    }

    const errors = useErrorStore();
    const status = response.status;
    let message = `Request failed (${status})`;

    try {
      const data = response._data as ErrorResponse;
      if (data && typeof data === "object") {
        message = data.message || data.error || message;
      }
    } catch (e) {
      // Use default message if parsing fails
    }

    errors.push(message, status);

    if (status === 401) {
      const auth = useAuthStore();
      auth.clear();
    }

    throw response;
  },
});
