import Link from "next/link";
import ImpactExplorer from "@/components/ImpactExplorer";

export default function Home() {
  return (
    <main className="page">
      <nav className="site-nav">
        <Link href="/epk">VIEW ARTIST EPK →</Link>
      </nav>
      <ImpactExplorer />
    </main>
  );
}
