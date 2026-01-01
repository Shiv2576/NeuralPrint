import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link
    href="/"
    className="flex items-center space-x-2.5 group"
    aria-label="Disperz Home"
  >
    <Image
      src="/fingerprint.svg"
      alt=""
      width={40}
      height={40}
      priority
      className="h-8 w-8 md:h-10 md:w-10"
      aria-hidden="true"
    />
    {/* Enhanced Wordmark */}
    <span
      className="text-[20px] font-extralight tracking-[0.02em] text-current leading-none md:text-[22px]"
      style={{
        fontFamily:
          "'Geist Variable', 'IBM Plex Sans', 'Inter', system-ui, sans-serif",
      }}
    >
      Neuralprint
    </span>
  </Link>
);
