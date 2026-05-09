"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setUsers((await res.json()) as User[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadUsers(); }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.badge}>Standalone Next.js App</p>
        <h1>Users</h1>
        <p className={styles.subtitle}>
          Cached in Redis · backed by MySQL
        </p>

        <div className={styles.card}>
          {loading ? <p>Loading users...</p> : null}
          {error ? <p className={styles.error}>Error: {error}</p> : null}
          {!loading && !error && users.length === 0 ? (
            <p>No users found. Run the seed script first.</p>
          ) : null}
          {users.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td className={styles.email}>{u.email}</td>
                    <td>
                      <span className={`${styles.role} ${styles[`role_${u.role}`]}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>

        <button type="button" onClick={() => void loadUsers()} className={styles.button}>
          Refresh
        </button>
      </main>
    </div>
  );
}
