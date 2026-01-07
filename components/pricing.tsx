"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react"; // Added useEffect

interface Value {
  id: string;
  name: string;
  description: string;
  points: string[];
}

const values: Value[] = [
  {
    id: "student-centric",
    name: "Student-Centric Approach",
    description:
      "We prioritize the needs and aspirations of every student above all else.",
    points: [
      "Personalized guidance for each student",
      "Flexible solutions tailored to individual goals",
      "Continuous feedback and improvement cycles",
      "Accessible support across all touchpoints",
    ],
  },
  {
    id: "integrity-transparency",
    name: "Integrity & Transparency",
    description:
      "Building trust through honest communication and ethical practices.",
    points: [
      "Clear and open communication channels",
      "No hidden fees or conditions",
      "Ethical partnership with institutions",
      "Accurate representation of opportunities",
    ],
  },
  {
    id: "excellence-execution",
    name: "Excellence in Execution",
    description: "Delivering exceptional quality in every service we provide.",
    points: [
      "Industry-best practices and methodologies",
      "Continuous training for our counselors",
      "Quality assurance at every step",
      "Measurable outcomes and success metrics",
    ],
  },
];

interface ValueCardProps {
  value: Value;
  index: number;
}

const ValueCard = ({ value, index }: ValueCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Move window checks to useEffect
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    // Check for dark mode
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

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

  const cardStyle = {
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
    transform:
      isHovered && !prefersReducedMotion ? "translateY(-8px)" : "translateY(0)",
    transition: prefersReducedMotion ? "none" : "transform 0.5s ease-out",
    boxShadow:
      isHovered && !prefersReducedMotion
        ? isDarkMode
          ? "0 12px 30px rgba(255, 255, 255, 0.05)"
          : "0 12px 30px rgba(0, 0, 0, 0.1)"
        : "none",
  } as React.CSSProperties;

  return (
    <article
      data-card-type="core-value"
      className={cn(
        "flex-1 border rounded-lg p-8 relative overflow-hidden",
        "bg-background transition-all duration-300",
        "border-border",
        prefersReducedMotion && "transition-none",
      )}
      style={prefersReducedMotion ? undefined : cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={value.name}
    >
      {/* Card glow effect overlay */}
      {!prefersReducedMotion && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: `radial-gradient(
              200px circle at var(--mouse-x) var(--mouse-y),
              ${isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"} 0%,
              transparent 80%
            )`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-background font-bold text-lg">
                {index + 1}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground">{value.name}</h3>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {value.description}
          </p>
        </div>

        <div className="h-px w-full bg-border mb-6" aria-hidden="true" />

        <ul className="space-y-3">
          {value.points.map((point) => (
            <li
              key={`${value.id}-point-${point.substring(0, 20).replace(/\s+/g, "-")}`}
              className="flex items-start gap-3 text-foreground"
            >
              <div
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-foreground mt-2"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

// Usage component
export const ValuesSection = () => {
  return (
    <section
      className="container mx-auto px-4 py-12"
      aria-labelledby="values-heading"
    >
      <h2 id="values-heading" className="text-3xl font-bold mb-8 text-center">
        Our Core Values
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <ValueCard key={value.id} value={value} index={index} />
        ))}
      </div>
    </section>
  );
};

const CoreValues = () => {
  return (
    <section id="values" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-foreground tracking-tight">
            Our Core Values
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            The principles that guide our mission to transform student careers
            through dedicated service
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {values.map((value, index) => (
            <ValueCard key={value.name} value={value} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 rounded-lg border bg-muted/50 border-border">
            <p className="text-muted-foreground">
              These values form the foundation of our commitment to student
              success and institutional excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
