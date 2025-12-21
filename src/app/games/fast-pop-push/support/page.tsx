export default function SupportPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Support</h1>

      <p>
        Welcome to Fast Pop Push Game support!  
        If you need help or have feedback, we’re here to assist you.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>🎮 How do I play?</h3>
      <p>
        Tap the bubbles as fast as possible before time runs out.
        Complete levels to unlock new colors and higher difficulty.
      </p>

      <h3>❤️ How do lives work?</h3>
      <p>
        Each level uses a limited number of moves.
        You can wait for lives to refill or watch an ad to get an extra life.
      </p>

      <h3>🌈 Why are some colors locked?</h3>
      <p>
        Colors unlock progressively. You must complete levels of the current
        color to unlock the next one.
      </p>

      <h3>⚠️ The ad did not load</h3>
      <p>
        Ads depend on network availability. Please check your internet
        connection and try again later.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any issues, suggestions, or business inquiries, please contact:
      </p>

      <p style={styles.email}>📧 lxc150896@gmail.com</p>

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
		color: "#fff",
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
