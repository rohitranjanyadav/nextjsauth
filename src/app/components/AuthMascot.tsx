"use client";

import { useEffect, useState } from "react";

type Mood = "curious" | "shy" | "sad" | "happy";

export default function AuthMascot({ mood }: { mood: Mood }) {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const followCursor = (event: PointerEvent) => {
      const x = Math.max(
        -6,
        Math.min(6, (event.clientX - window.innerWidth / 2) / 42),
      );
      const y = Math.max(
        -4,
        Math.min(4, (event.clientY - window.innerHeight / 2) / 55),
      );
      setGaze({ x, y });
    };
    window.addEventListener("pointermove", followCursor);
    return () => window.removeEventListener("pointermove", followCursor);
  }, []);

  const isShy = mood === "shy";
  const isSad = mood === "sad";
  return (
    <div className={`mascot mascot--${mood}`} aria-hidden="true">
      <div className="mascot__ear mascot__ear--left">
        <i />
      </div>
      <div className="mascot__ear mascot__ear--right">
        <i />
      </div>
      <div className="mascot__head">
        <div className="mascot__forehead" />
        <div className="mascot__eye mascot__eye--left">
          <span
            style={{
              transform: `translate(${isShy ? 0 : gaze.x}px, ${isShy ? 0 : gaze.y}px)`,
            }}
          />
        </div>
        <div className="mascot__eye mascot__eye--right">
          <span
            style={{
              transform: `translate(${isShy ? 0 : gaze.x}px, ${isShy ? 0 : gaze.y}px)`,
            }}
          />
        </div>
        <div className="mascot__muzzle">
          <b />
          <em
            className={
              isSad ? "mascot__mouth mascot__mouth--sad" : "mascot__mouth"
            }
          />
        </div>
        <div className="mascot__cheek mascot__cheek--left" />
        <div className="mascot__cheek mascot__cheek--right" />
      </div>
      <div className="mascot__body" />
      <div
        className={`mascot__paw mascot__paw--left ${isShy ? "mascot__paw--cover" : ""}`}
      />
      <div
        className={`mascot__paw mascot__paw--right ${isShy ? "mascot__paw--cover" : ""}`}
      />
      {isSad && <div className="mascot__tear">✦</div>}
    </div>
  );
}
