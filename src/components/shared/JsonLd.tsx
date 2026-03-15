/**
 * JsonLd — Structured Data (Schema.org)
 *
 * Injeta metadados semânticos que o Google usa para entender a Atlética Incinera
 * como uma organização esportiva e potencialmente exibir "rich results".
 *
 * @see https://schema.org/SportsOrganization
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Atlética Incinera",
    alternateName: "Incinera",
    url: "https://incinera.cin.ufpe.br",
    logo: "https://incinera.cin.ufpe.br/logo.svg",
    image: "https://incinera.cin.ufpe.br/og-image.png",
    description:
      "A chama que não se apaga. A Atlética Incinera é a maior força esportiva do Centro de Informática da UFPE, representando estudantes de Ciência da Computação, Engenharia da Computação, Sistemas de Informação e Inteligência Artificial.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Jorn. Aníbal Fernandes, s/n",
      addressLocality: "Recife",
      addressRegion: "PE",
      postalCode: "50740-560",
      addressCountry: "BR",
    },
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "Centro de Informática — UFPE",
      url: "https://www.cin.ufpe.br",
    },
    sameAs: ["https://www.instagram.com/atleticaincinera"],
    email: "incinera@cin.ufpe.br",
    sport: ["Futsal", "Vôlei", "Basquete", "Handebol", "Natação", "e-Sports"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
