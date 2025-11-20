"use client";

import React, { forwardRef } from "react";
import Image from "next/image";


const SNOWFLAKE_COUNT = 60;

type Snowflake = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  fontSize: number;
};

// Generated once when this module loads (client bundle only, after we disable SSR)
const SNOWFLAKES: Snowflake[] = Array.from({ length: SNOWFLAKE_COUNT }).map(
  (_v, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 7,
    opacity: 0.3 + Math.random() * 0.7,
    fontSize: 10 + Math.random() * 10,
  })
);

export const ChristmasCard = forwardRef<HTMLDivElement>(function ChristmasCard(
  _props,
  ref
) {
  return (
    <div className="card" ref={ref}>
      <div className="snow-layer">
        {SNOWFLAKES.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}vw`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              opacity: flake.opacity,
              fontSize: `${flake.fontSize}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="card-content">
        <p className="card-eyebrow">JavaScript Guild presents</p>
        <h1 className="card-title">Happy holidays!</h1>
        <p className="card-subtitle">
          May your builds be green, your bundles light, and your bugs tiny this
          holiday season.
        </p>

        <div className="tag-row">
          <span className="tag">PikkuJSoulut 2025</span>
          <span className="tag">JS Christmas Card</span>
        </div>
      </div>

      <div className="tree-wrapper">
        <Image
          src="/snowy-tree1.png"
          alt="Vintage Christmas tree"
          className="tree-image"
          fill
          sizes="(max-width: 768px) 40vw, 20vw"
          priority
        />
      </div>
    </div>
  );
});
