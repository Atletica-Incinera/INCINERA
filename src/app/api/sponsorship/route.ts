import { NextResponse } from "next/server";
import { Resend } from "resend";
import { logger } from "@/lib/logger";
import { getTranslations } from "next-intl/server";
import { buildSponsorEmailTemplate } from "@/lib/sponsorEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINATION_EMAIL = "incinera@cin.ufpe.br";

function validatePayload(body: unknown): body is {
  nomeFantasia: string;
  nomeResponsavel: string;
  email: string;
  visaoParceria: string;
  locale?: string;
} {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.nomeFantasia === "string" &&
    b.nomeFantasia.trim().length >= 1 &&
    typeof b.nomeResponsavel === "string" &&
    b.nomeResponsavel.trim().length >= 3 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.visaoParceria === "string" &&
    b.visaoParceria.trim().length >= 50 &&
    b.visaoParceria.trim().length <= 1000
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        { error: "Dados do formulário inválidos." },
        { status: 400 }
      );
    }

    const { nomeFantasia, nomeResponsavel, email, visaoParceria, locale = "pt" } = body;
    const t = await getTranslations({ locale, namespace: "Emails" });

    const { error } = await resend.emails.send({
      from: "Atlética Incinera <onboarding@resend.dev>",
      to: [DESTINATION_EMAIL],
      replyTo: email,
      subject: t("sponsorship.subject", { company: nomeFantasia }),
      html: buildSponsorEmailTemplate(
        {
          nomeFantasia,
          nomeResponsavel,
          email,
          visaoParceria,
        },
        (key, props) => t(key as Parameters<typeof t>[0], props)
      ),
    });

    if (error) {
      logger.error({ error, event: "SPONSORSHIP_EMAIL_SEND_FAILED", company: nomeFantasia }, "[Resend] Error sending sponsorship email");
      return NextResponse.json(
        { error: "Falha ao enviar email." },
        { status: 500 }
      );
    }

    logger.info({ event: "SPONSORSHIP_EMAIL_SENT_SUCCESS", company: nomeFantasia, email });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    logger.error({ error: err, event: "SPONSORSHIP_API_UNEXPECTED_ERROR" }, "[Sponsorship API] Unexpected error");
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
