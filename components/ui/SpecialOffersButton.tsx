"use client";

import { useEnquiry } from "@/context/EnquiryContext";
import styles from "./SpecialOffersButton.module.css";

interface SpecialOffersButtonProps {
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function SpecialOffersButton({
  compact = false,
  className = "",
  onClick,
}: SpecialOffersButtonProps) {
  const { openPromotions, promotionsCount } = useEnquiry();
  const caption = promotionsCount > 0
    ? `${promotionsCount} ${promotionsCount === 1 ? "offer" : "offers"} to explore`
    : "Find your next escape";

  return (
    <button
      type="button"
      onClick={onClick ?? openPromotions}
      className={`${styles.button} ${compact ? styles.compact : ""} ${className}`}
    >
      <span className={styles.ticket} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4V5Z" />
          <path d="M15 5v2m0 4v2m0 4v2M7.5 12h4m-2-2v4" />
        </svg>
      </span>
      <span className={styles.copy}>
        <span className={styles.title}>{compact ? "Special Offers" : "Explore Special Offers"}</span>
        <span className={styles.caption}>{caption}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}
