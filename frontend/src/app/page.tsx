import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import DashboardContent from "@/components/dashboard/DashboardContent/DashboardContent";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className={styles.main}>
      <DashboardContent user={session.user} />
    </main>
  );
}
