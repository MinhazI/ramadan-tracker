import { Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const ShareButton = () => {
  const [saving, setSaving] = useState(false);

  const shareData = {
    title: "Ramadan Tracker",
    text: `I'm using Ramadan Tracker to test my knowledge with the Quran Quiz and keep track of my Tharaweeh prayers this Ramadan! More exciting features are coming soon. Try it out here:`,
    url: window.location.href,
  };

  const handleShare = async () => {
    if (navigator.share) {
      setSaving(true);
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      } finally {
        setSaving(false);
      }
    } else {
      alert(
        "Your browser doesn't support the Web Share API. You can manually share the link."
      );
      console.log("Fallback: Sharing is not supported in this browser.");
    }
  };

  return (
    <Button
      onClick={handleShare}
      disabled={saving}
      size={"icon"}
      variant={"outline"}
      className="mr-2 bg-[var(--background)] text-black dark:text-white"
    >
      {saving ? "Sharing..." : <Share2 />}
    </Button>
  );
};

export default ShareButton;
