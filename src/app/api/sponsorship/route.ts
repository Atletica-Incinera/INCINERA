import { NextResponse } from "next/server";
import { Resend } from "resend";
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
        (key, props) => t(key as any, props)
      ),
    });

    if (error) {
      console.error("[Resend] Error sending sponsorship email:", error);
      return NextResponse.json(
        { error: "Falha ao enviar email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Sponsorship API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
