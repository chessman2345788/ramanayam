import type { Metadata } from "next";
import { cookies } from "next/headers";
import HomePage from "./(shop)/home/page";
import { LaunchingSoon } from "@/components/launch/LaunchingSoon";
import { PREVIEW_COOKIE_NAME, verifyPreviewSession } from "@/lib/preview";

const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "true";

export async function generateMetadata(): Promise<Metadata> {
  if (!isLaunchMode) {
    return {};
  }

  try {
    const cookieStore = await cookies();
    const previewCookie = cookieStore.get(PREVIEW_COOKIE_NAME)?.value;
    const isPreview = await verifyPreviewSession(previewCookie);

    if (isPreview) {
      return {
        title: "Ramayanam — Sacred Rituals, Modern Living [Preview]",
        description:
          "Private preview: A premium spiritual lifestyle brand. Handcrafted puja essentials curated for the modern devotee.",
      };
    }
  } catch {
    // Fall through to launch metadata
  }

  return {
    title: "Ramayanam — Launching Soon",
    description:
      "Ramayanam is coming soon — a premium destination for Puja Samagri, Bhagwan Vastra, Temple Shringar and devotional essentials.",
    openGraph: {
      title: "Ramayanam — Launching Soon",
      description:
        "Ramayanam is coming soon — a premium destination for Puja Samagri, Bhagwan Vastra, Temple Shringar and devotional essentials.",
    },
  };
}

export default async function Home() {
  if (isLaunchMode) {
    try {
      const cookieStore = await cookies();
      const previewCookie = cookieStore.get(PREVIEW_COOKIE_NAME)?.value;
      const isPreview = await verifyPreviewSession(previewCookie);

      if (isPreview) {
        return <HomePage />;
      }
    } catch {
      // In case of error reading cookies, fall back safely to LaunchingSoon
    }

    return <LaunchingSoon />;
  }

  return <HomePage />;
}
