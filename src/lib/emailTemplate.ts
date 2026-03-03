export interface EmailTemplateData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function buildEmailTemplate(
  data: EmailTemplateData,
  t: (key: string, props?: Record<string, string | number>) => string,
): string {
  const { name, email, subject, message } = data;
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t("contact.subject", { subject })}</title>
</head>
<body style="margin:0;padding:0;background:#141414;font-family:'Segoe UI',Arial,sans-serif;color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
          
          <!-- Header / Brand -->
          <tr>
            <td style="background:linear-gradient(135deg,#c0392b 0%,#e74c3c 35%,#f39c12 70%,#c0392b 100%);padding:40px 32px;text-align:center;">
              <p style="margin:0;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:600;">Atlética</p>
              <h1 style="margin:8px 0 0;font-size:42px;font-weight:900;letter-spacing:-2px;text-transform:uppercase;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.4);">INCINERA</h1>
              <p style="margin:6px 0 0;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">CIn · UFPE</p>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding:0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 0 0;">
                    <span style="display:inline-block;background:rgba(192,57,43,0.15);border:1px solid rgba(192,57,43,0.35);color:#e74c3c;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:100px;"> ${t("contact.badge")}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Info -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#222;border-radius:12px;overflow:hidden;border:1px solid #2e2e2e;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#888;">${t("contact.sender")}</p>
                    <p style="margin:0;font-size:22px;font-weight:700;color:#fff;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 16px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:8px;">
                          <span style="display:inline-block;width:8px;height:8px;background:#e74c3c;border-radius:50%;"></span>
                        </td>
                        <td>
                          <a href="mailto:${email}" style="color:#e74c3c;text-decoration:none;font-size:14px;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subject -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#222;border-radius:12px;border:1px solid #2e2e2e;">
                <tr>
                  <td style="padding:16px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#888;">${t("contact.subjectLabel")}</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#fff;">${subject}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#222;border-radius:12px;border:1px solid #2e2e2e;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#888;">${t("contact.messageLabel")}</p>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#ccc;">${escapedMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:24px 32px;">
              <a href="mailto:${email}?subject=Re: [Incinera] ${subject}" style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:10px;text-decoration:none;">${t("contact.reply")}</a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:1px solid #2a2a2a;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#555;">${t("contact.footer")}</p>
              <p style="margin:0;font-size:12px;color:#444;">
                <a href="https://incinera.vercel.app" style="color:#e74c3c;text-decoration:none;">incinera.vercel.app</a>
                &nbsp;·&nbsp;
                <a href="mailto:incinera@cin.ufpe.br" style="color:#e74c3c;text-decoration:none;">incinera@cin.ufpe.br</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#3a3a3a;">© 2026 Atlética Incinera — CIn UFPE</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
