/** Bot ID from Chatbase → Chat widget → Embed. */
export const CHATBASE_BOT_ID =
  process.env.NEXT_PUBLIC_CHATBASE_BOT_ID ?? "wEI9--YyVc9xUui-4DzR8";

/** Set `NEXT_PUBLIC_CHATBASE_WIDGET_ENABLED=false` to disable the bubble. */
export const CHATBASE_WIDGET_ENABLED =
  process.env.NEXT_PUBLIC_CHATBASE_WIDGET_ENABLED !== "false";

/**
 * Server-only secret for JWT identity verification (Chatbase dashboard).
 * Set `CHATBASE_IDENTITY_SECRET` in .env.local / Vercel — never commit the value.
 * Used only when you add authenticated users and call window.chatbase('identify', { token }).
 */
export const CHATBASE_IDENTITY_SECRET = process.env.CHATBASE_IDENTITY_SECRET;
