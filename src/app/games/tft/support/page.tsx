import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TFT Meta Guide Support",
  description: "Support page for TFT Meta Guide",
};

export default function SupportPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>TFT Meta Guide Support</h1>

      <p>
        Welcome to the TFT Meta Guide support page.
        If you have questions, feedback, or encounter any issues while using
        the app, please contact us anytime.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>📘 What does this app provide?</h3>
      <p>
        TFT Meta Guide provides team compositions, item recommendations,
        champion builds, and strategy references for Teamfight Tactics players.
      </p>

      <h3>🔄 Why is some data outdated?</h3>
      <p>
        TFT updates frequently with new patches and balance changes.
        Some content may require a short time to sync with the latest patch.
      </p>

      <h3>📶 Why is content not loading?</h3>
      <p>
        Please check your internet connection and restart the app.
        Some features require an active network connection.
      </p>

      <h3>⚠️ Ads or rewards are not working</h3>
      <p>
        Ads depend on device and network availability.
        Please try again later if an ad fails to load.
      </p>

      <h2>Contact Us</h2>

      <p>
        For support, bug reports, or business inquiries, contact:
      </p>

      <p style={styles.email}>
        <a href="mailto:lxc150896@gmail.com">
          lxc150896@gmail.com
        </a>
      </p>

      <p style={styles.note}>
        We usually respond within 24–48 hours.
      </p>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "60px 20px",
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.7,
    color: "#111",
    background: "#fff",
    minHeight: "100vh",
  },

  title: {
    fontSize: 36,
    fontWeight: 900,
    marginBottom: 20,
  },

  email: {
    fontWeight: 700,
    marginTop: 10,
  },

  note: {
    marginTop: 20,
    opacity: 0.7,
  },
};