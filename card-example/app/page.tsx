"use client";

import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import dynamic from "next/dynamic";

// Dynamic import: client-only card, no SSR
const ChristmasCard = dynamic(
  () =>
    import("@/components/ChristmasCard").then(
      (mod) => mod.ChristmasCard
    ),
  { ssr: false }
);

export default function HomePage() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsWorking(true);
    setMessage(null);

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "js-guild-xmas-card.png";
      link.click();
      setMessage("Downloaded PNG of the card.");
    } catch (error) {
      console.error(error);
      setMessage("Could not create image. Try again or take a screenshot.");
    } finally {
      setIsWorking(false);
    }
  };

  const handleCopy = async () => {
    if (!cardRef.current) return;

    if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
      setMessage("Clipboard image copy is not supported in this browser.");
      return;
    }

    setIsWorking(true);
    setMessage(null);

    try {
      const blob = await htmlToImage.toBlob(cardRef.current);
      if (!blob) {
        throw new Error("No blob returned");
      }

      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      setMessage("Card image copied to clipboard.");
    } catch (error) {
      console.error(error);
      setMessage("Could not copy image. Try download instead.");
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <main className="page-root">
      <section className="layout">
        <div className="card-column">
          {/* ref is passed, dynamic component will forward it once loaded */}
          <ChristmasCard ref={cardRef} />
        </div>

        <div className="controls-column">
          <h1 className="controls-title">JS Christmas Card Example</h1>
          <p className="controls-text">
            This is an example card built with Next.js and React. In the
            challenge you can use any technologies you like.
          </p>

          <div className="button-row">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isWorking}
              className="btn btn-primary"
            >
              Download card as PNG
            </button>

            <button
              type="button"
              onClick={handleCopy}
              disabled={isWorking}
              className="btn btn-secondary"
            >
              Copy card image to clipboard
            </button>
          </div>

          {message && <p className="status-text">{message}</p>}
        </div>
      </section>
    </main>
  );
}
