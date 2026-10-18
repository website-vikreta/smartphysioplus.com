// Shown on dev and Netlify previews only, never on the production deploy.
const preview =
  process.env.NODE_ENV !== "production" ||
  (process.env.CONTEXT ?? "production") !== "production";

export function DraftBanner({ children }: { children: string }) {
  return preview ? (
    <p className="bg-sp-blue-900 px-4 py-2 text-center text-sm text-sp-white">
      {children}
    </p>
  ) : null;
}
