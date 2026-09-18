import type { Metadata } from "next";
import HomePage from "./(shop)/home/page";
import { LaunchingSoon } from "@/components/launch/LaunchingSoon";

const isLaunchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "true";

export const metadata: Metadata = isLaunchMode
  ? {
      title: "Ramanayam — Launching Soon",
      description:
        "Ramanayam is coming soon — a premium destination for Puja Samagri, Bhagwan Vastra, Temple Shringar and devotional essentials.",
      openGraph: {
        title: "Ramanayam — Launching Soon",
        description:
          "Ramanayam is coming soon — a premium destination for Puja Samagri, Bhagwan Vastra, Temple Shringar and devotional essentials.",
      },
    }
  : {};

export default function Home() {
  if (isLaunchMode) {
    return <LaunchingSoon />;
  }
  return <HomePage />;
}
