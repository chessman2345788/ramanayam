import { ShieldCheck } from "lucide-react";

export function AccountSettingsTab() {
  return (
    <div style={{ maxWidth: 540 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 32,
        }}
      >
        Account Settings
      </h2>

      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Profile Information
          </h3>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email"
              disabled
              value="devotee@ramanayam.com"
              className="input"
              style={{
                color: "var(--text-muted)",
                cursor: "not-allowed",
                background: "var(--bg-sand)",
              }}
            />
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Security
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 20,
              borderRadius: 16,
              background: "var(--bg-sand)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <ShieldCheck size={20} color="var(--success)" />
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", display: "block" }}>
                  SSL Secured
                </span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginTop: 2 }}>
                  Authentication handled securely
                </span>
              </div>
            </div>
            <span
              style={{
                padding: "4px 10px",
                background: "rgba(118,138,77,0.1)",
                border: "1px solid rgba(118,138,77,0.2)",
                color: "var(--success)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: 6,
              }}
            >
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountSettingsTab;
