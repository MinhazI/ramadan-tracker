import { useState } from "react";

const ShareButton = () => {
  const [saving, setSaving] = useState(false); // State for managing button disable

  const shareData = {
    title: "Ramadan Tharaweeh Tracker",
    text: `I’m using the Ramadan Tracker to keep track of my tharaweeh prayers, and it’s been really helpful. You can also try the app by visiting the link below:`,
    url: window.location.href, // Use the current page URL
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
        setSaving(false); // Ensure saving is false after the share process
      }
    } else {
      // Fallback: If share isn't supported, alert or provide alternative options
      alert(
        "Your browser doesn't support the Web Share API. You can manually share the link."
      );
      console.log("Fallback: Sharing is not supported in this browser.");
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={saving} // Disable button while sharing
      className="rounded-full p-2 border-2 text-white text-xs"
    >
      {saving ? "Sharing..." : "Share this with friends and family"}
    </button>
  );
};

export default ShareButton;
