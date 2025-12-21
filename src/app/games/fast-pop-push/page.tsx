import Image from "next/image";

export default function FastPage() {
  return (
    <main style={styles.main}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroMedia}>
          <Image
            src="/images/fast-pop-push/hero.png"
            alt="Fast Pop Push Game"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <h1 style={styles.title}>Fast Pop Push Game</h1>
        <p style={styles.subtitle}>
          A fast-paced, light-up pop puzzle game inspired by the classic Pop It toy.
          Challenge your reflexes, memory, and speed!
        </p>

        <div style={styles.buttons}>
          <a style={styles.appStoreBtn} href="#">
            🍎 App Store
          </a>
          <a style={styles.playStoreBtn} href="#">
            ▶ Google Play
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why You’ll Love It</h2>

        <div style={styles.featureGrid}>
          <Feature title="⚡ Fast Gameplay">
            Push bubbles quickly before time runs out.
          </Feature>
          <Feature title="🌈 Color Levels">
            Unlock Green → Blue → Purple → Yellow → Pink → Red.
          </Feature>
          <Feature title="🧠 Memory & Reflex">
            Train reaction speed and focus.
          </Feature>
          <Feature title="🔥 Increasing Difficulty">
            Faster speed and harder patterns each level.
          </Feature>
        </div>
      </section>

      {/* GAMEPLAY IMAGES */}
      <section style={styles.gallery}>
        <h2 style={styles.sectionTitle}>Gameplay</h2>

        <div style={styles.imageGrid}>
          {[1,2,3,4,5,6,7,8].map((i) => (
            <Image
              key={i}
              src={`/images/fast-pop-push/gameplay${i}.jpg`}
              alt={`Gameplay ${i}`}
              width={350}
              height={700}
              style={styles.gameImage}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section style={styles.cta}>
        <h2>Ready to pop?</h2>
        <p>Download now and challenge yourself!</p>
        <a style={styles.bigBtn} href="#">
          🎮 Play Now – Free
        </a>
      </section> */}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <a href="/games/fast-pop-push/privacy">Privacy Policy</a>
        <span>•</span>
        <a href="/games/fast-pop-push/support">Support</a>
      </footer>
    </main>
  );
}

/* ---------- COMPONENT ---------- */
function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.featureBox}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    background: "linear-gradient(180deg,#0A0F24,#1F1135,#320D3E)",
    color: "#fff",
    fontFamily: "system-ui, sans-serif",
  },
  hero: {
    minHeight: "100vh",
    padding: "10px 20px 20px 0px",
    textAlign: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    marginTop: 24,
  },
  subtitle: {
    maxWidth: 600,
    margin: "16px auto",
    opacity: 0.85,
    fontSize: 18,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginTop: 24,
  },
  appStoreBtn: {
    background: "#000",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
  },
  playStoreBtn: {
    background: "#34A853",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
  },
  features: {
    padding: "80px 20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 800,
    marginBottom: 40,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20,
    maxWidth: 1000,
    margin: "0 auto",
  },
  featureBox: {
    background: "rgba(255,255,255,0.06)",
    padding: 20,
    borderRadius: 20,
  },
  heroMedia: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
  },
  gallery: {
    padding: "80px 20px",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 20,
    maxWidth: 1200,
    margin: "0 auto",
  },
  gameImage: {
    width: "100%",
    height: "auto",
    borderRadius: 20,
  },
  cta: {
    padding: "100px 20px",
    textAlign: "center",
  },
  bigBtn: {
    display: "inline-block",
    marginTop: 20,
    padding: "18px 36px",
    background: "#ff6b35",
    borderRadius: 20,
    color: "#fff",
    fontWeight: 900,
    textDecoration: "none",
    fontSize: 20,
  },
  footer: {
    padding: 30,
    textAlign: "center",
    opacity: 0.7,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
};
