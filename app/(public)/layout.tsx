import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./layout.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/bookings", label: "Bookings" },
  { href: "/profile", label: "Profile" },
];

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>DriveFlow</div>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}