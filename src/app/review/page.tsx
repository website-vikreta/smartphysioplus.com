import { PageHeading } from "@/components/PageShell";
import { ReviewTool } from "@/components/ReviewTool";
import { routes } from "@/content/routes";
import { writeReviewUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

// Internal tool: noindex, nofollow, not in the sitemap or the main nav. Linked only from /reviews/ and staff messages.
export const metadata = pageMetadata({
  title: "Share Your Experience | Smart Physio+",
  description: "Leave a Google review for Smart Physio+ in Balewadi, Pune.",
  path: routes.review.path,
  noindex: true,
});

export default function ReviewPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeading
        title="Share your experience"
        intro={
          <p className="text-base">
            Thank you for visiting Smart Physio+. Your review helps other people
            in Pune find the right care.
          </p>
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ReviewTool
          reviewUrl={writeReviewUrl()}
          printHref={routes.reviewPrint.path}
        />
      </div>
    </main>
  );
}
