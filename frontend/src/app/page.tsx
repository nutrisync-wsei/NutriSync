"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/welcome">Go to auth</Link>
    </div>
  );
}
