// Simple joint sketch for joint pages (knee, shoulder, arthritis): two bone ends, cartilage and the joint capsule.
// Decorative; the page text explains it.
export function JointDiagram({ label }: { label: string }) {
  return (
    <figure className="sp-card bg-sp-mist">
      <svg
        viewBox="0 0 200 240"
        className="mx-auto h-56 w-auto"
        aria-hidden="true"
      >
        <rect
          x="76"
          y="0"
          width="48"
          height="86"
          rx="12"
          fill="#efe9df"
          stroke="#c9c1b3"
        />
        <path
          d="M58 86h84a12 12 0 0 1 0 0c0 18-18 28-42 28S58 104 58 86Z"
          fill="#efe9df"
          stroke="#c9c1b3"
        />
        <path
          d="M60 92c10 14 26 20 40 20s30-6 40-20"
          fill="none"
          stroke="#1cabb0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M60 140c10-14 26-20 40-20s30 6 40 20"
          fill="none"
          stroke="#1cabb0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M58 146c0-16 18-26 42-26s42 10 42 26Z"
          fill="#efe9df"
          stroke="#c9c1b3"
        />
        <rect
          x="78"
          y="146"
          width="44"
          height="94"
          rx="12"
          fill="#efe9df"
          stroke="#c9c1b3"
        />
        <rect
          x="46"
          y="80"
          width="108"
          height="72"
          rx="30"
          fill="none"
          stroke="#01689c"
          strokeDasharray="5 5"
        />
      </svg>
      <figcaption className="mt-3 text-center text-sm">
        {label}: bone ends, cartilage (teal) and the joint capsule (dashed).
      </figcaption>
    </figure>
  );
}
