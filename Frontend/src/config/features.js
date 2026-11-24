/**
 * Modules a deployment can switch on without its own branch.
 *
 * Several sites run this same code from `main`: quickdropsindia.com, and
 * superapp.buytogetherindia.com, which also offers the Service Provider module.
 * A branch per site would drift -- every fix to main merged by hand, and one site
 * eventually missing one -- so a site opts in through its build settings
 * (Frontend/.env.production) instead.
 *
 * Read at BUILD time: Vite inlines import.meta.env, so a site that leaves this
 * unset gets a build where the module's entry points are simply absent.
 */

const on = (value) => String(value ?? '').trim().toLowerCase() === 'true';

/**
 * The Service Provider (Services) admin: the /admin/sp routes and the Services
 * tab in both panel switchers. Off unless VITE_ENABLE_SERVICE_PROVIDER=true.
 */
export const SERVICE_PROVIDER_ENABLED = on(import.meta.env.VITE_ENABLE_SERVICE_PROVIDER);

/**
 * Taxi and Medical. This product is Master + Food + Quick Commerce, so both are
 * off unless a site's build asks for them. Their code stays: Master's partner
 * documents and shared settings use parts of the Taxi module.
 */
export const TAXI_ENABLED = on(import.meta.env.VITE_ENABLE_TAXI);
export const MEDICAL_ENABLED = on(import.meta.env.VITE_ENABLE_MEDICAL);

/**
 * The customer food app on the public website (/food/user). Off: browsers are sent
 * to the landing page. The mobile app's own shell always keeps it.
 */
const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent.toLowerCase();
const IN_APP_SHELL = typeof window !== 'undefined'
  && (Boolean(window.flutter_inappwebview) || Boolean(window.ReactNativeWebView)
    || window.location.protocol === 'file:' || ua.includes(' wv') || ua.includes('; wv'));
export const CUSTOMER_WEB_ENABLED = on(import.meta.env.VITE_ENABLE_CUSTOMER_WEB) || IN_APP_SHELL;

const OFF = new Set([
  ...(TAXI_ENABLED ? [] : ["taxi", "parcel", "porter", "taxiAndPorter", "heavyParcel"]),
  ...(MEDICAL_ENABLED ? [] : ["medical"]),
]);

/** Is this service (by the key the screens use) offered on this site? */
export const isServiceOn = (key) => !OFF.has(key);
