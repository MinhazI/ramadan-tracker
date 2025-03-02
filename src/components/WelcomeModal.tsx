import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("seenWelcomeModal");

    if (!hasSeenModal) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("seenWelcomeModal", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Welcome to the Ramdan Tracker App</DialogTitle>
          <DialogDescription className="mt-3">
            <strong>Assalamu Alaikum,</strong>
            <br />
            Jazakallahu Khair for visiting my app,{" "}
            <strong>Ramadan Tracker</strong>.
            <br />
            <br />
            This app helps you keep track of your{" "}
            <strong>Tharaweeh prayers</strong> throughout Ramadan.
            <br />
            💡{" "}
            <strong>
              Your prayer data is stored securely on your phone
            </strong>{" "}
            and is <strong>never sent</strong> to any server. I do not have
            access to your personal entries.
            <br />
            <br />
            📊 I use <strong>Vercel Analytics</strong> only to understand
            general usage trends, but this does <strong>not</strong> include
            your personal prayer records.
            <br />
            <br />
            This app was primarily built for <strong>Sri Lankans</strong>, as
            getting accurate Ramadan dates can be challenging here. However, I
            am working on making it fully functional for users worldwide.
            <br />
            <br />
            If you have any suggestions or feedback, feel free to reach out at{" "}
            <strong>
              <a
                href="mailto:hello@minhazimohamed.com?subject=Suggestions for the Ramdan Tracker App"
                target="_blank"
              >
                hello@minhazimohamed.com
              </a>
            </strong>
            .
            <br />
            <br />
            <strong>Barakallahu Feek,</strong>
            <br />
            <strong>Minhaz Irphan Mohamed</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClose}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
