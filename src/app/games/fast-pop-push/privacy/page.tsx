export default function PrivacyPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Privacy Policy</h1>

      <p>
        Fast Pop Push Game respects your privacy. This Privacy Policy explains
        how we handle information when you use our game.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We do <strong>not collect, store, or share</strong> any personal
        information.  
        Fast Pop Push Game can be played without creating an account or
        providing any personal data.
      </p>

      <h2>Advertising</h2>
      <p>
        Our game may display ads provided by third-party ad networks (such as
        Google AdMob). These services may use anonymous identifiers to serve
        relevant ads. We do not control or access this data.
      </p>

      <h2>Children’s Privacy</h2>
      <p>
        Fast Pop Push Game is suitable for all ages. We do not knowingly collect
        personal information from children under 13.
      </p>

      <h2>Data Security</h2>
      <p>
        Since we do not collect personal data, there is no risk of personal data
        leakage from our game.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </p>

      <p style={styles.email}>📧 lxc150896@gmail.com</p>
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
};
