"use client";

import React, { useState, useCallback } from "react";

interface CardComponentProps {
  title: string;
  subtitle: string;
}

const colors = [
  "hsl(0, 0%, 9%)",
  "hsl(348, 100%, 30%)",
  "hsl(171, 100%, 20%)",
  "hsl(141, 71%, 20%)",
  "hsl(48, 100%, 20%)",
  "hsl(204, 86%, 20%)",
  "hsl(217, 71%, 20%)",
  "hsl(285, 91%, 20%)",
  "hsl(264, 64%, 20%)",
] as const;

const CardComponent: React.FC<CardComponentProps> = ({ title, subtitle }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [touchStartPosition, setTouchStartPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();

      setTouchStartTime(Date.now());
      setTouchStartPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
      setMousePosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setIsTouching(true);
      setIsHovered(true);
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isTouching) return;

      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    },
    [isTouching],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isTouching) return;

      const touch = e.changedTouches[0];
      const touchDuration = Date.now() - touchStartTime;
      const movedX = Math.abs(touchStartPosition.x - touch.clientX);
      const movedY = Math.abs(touchStartPosition.y - touch.clientY);
      const hasMoved = movedX > 10 || movedY > 10;

      if (touchDuration < 500 && !hasMoved) {
        handleClick();
      }

      setIsTouching(false);
      setIsHovered(false);
    },
    [isTouching, touchStartTime, touchStartPosition, handleClick],
  );

  const cardStyle: React.CSSProperties = {
    "--card-color": colors[colorIndex],
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
    transform: isHovered ? "translateY(-10px)" : "none",
  } as React.CSSProperties;

  return (
    <div
      className={`card ${isHovered ? "card-hovered" : ""} ${isTouching ? "card-touching" : ""}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${subtitle}. Click to change color.`}
    >
      <div className="card-content">
        <div className="card-info-wrapper">
          <div className="card-info">
            <div className="card-info-title">
              <h3>{title}</h3>
              <h4>{subtitle}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCard {
  title: string;
  subtitle: string;
}

const features: FeatureCard[] = [
  {
    title: "Unified Interaction",
    subtitle:
      "Adaptable for touch and mouse, embodying the essence of responsive design.",
  },
  {
    title: "Dynamic Feedback",
    subtitle:
      "Visual cues like color shifts and elevated animation on interaction.",
  },
  {
    title: "Dynamic Feedback",
    subtitle:
      "Visual cues like color shifts and elevated animation on interaction.",
  },
];

const Cards: React.FC = () => {
  return (
    <div id="cards">
      {features.map((feature, index) => (
        <CardComponent
          key={`${feature.title}-${index}`}
          title={feature.title}
          subtitle={feature.subtitle}
        />
      ))}
    </div>
  );
};

export default Cards;
