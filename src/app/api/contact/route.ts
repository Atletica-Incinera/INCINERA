import { NextResponse } from "next/server";
import { Resend } from "resend";
import { logger } from "@/lib/logger";
import { getTranslations } from "next-intl/server";
import { buildEmailTemplate } from "@/lib/emailTemplate";

const DESTINATION_EMAIL = "incinera@cin.ufpe.br";

// Basic server-side validation (defence in depth — client also validates with Zod)
function validatePayload(body: unknown): body is {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale?: string;
} {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length >= 3 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" &&
    b.subject.trim().length >= 5 &&
    typeof b.message === "string" &&
    b.message.trim().length >= 20 &&
    b.message.trim().length <= 1000
  );
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const { name, email, subject, message, locale = "pt" } = body;
    const t = await getTranslations({ locale, namespace: "Emails" });

    const { error } = await resend.emails.send({
      from: "Atlética Incinera <onboarding@resend.dev>",
      to: [DESTINATION_EMAIL],
      replyTo: email,
      subject: t("contact.subject", { subject }),
      html: buildEmailTemplate(
        { name, email, subject, message },
        (key, props) => t(key as Parameters<typeof t>[0], props),
      ),
    });

    if (error) {
      logger.error(
        { error, event: "CONTACT_EMAIL_SEND_FAILED", to: DESTINATION_EMAIL },
        "[Resend] Error sending email",
      );
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }

    logger.info({ event: "CONTACT_EMAIL_SENT_SUCCESS", from: email });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    logger.error(
      { error: err, event: "CONTACT_API_UNEXPECTED_ERROR" },
      "[Contact API] Unexpected error",
    );
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
