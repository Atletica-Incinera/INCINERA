import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy minimalista para Next.js 16.
 *
 * O locale é gerenciado exclusivamente via cookie (NEXT_LOCALE) — veja
 * src/i18n/request.ts. Não há roteamento baseado em URL por locale.
 *
 * O next-intl (via createNextIntlPlugin no next.config.ts) + getRequestConfig
 * cuida de tudo no servidor. Este proxy apenas deixa as requisições passarem.
 *
 * IMPORTANTE: Não use createMiddleware do next-intl aqui, pois ele tenta
 * fazer rewrites para rotas /{locale}/... que não existem nesta arquitetura.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export default proxy;

export const config = {
  // Aplica o proxy em todas as rotas, exceto assets estáticos e internals do Next.js
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
