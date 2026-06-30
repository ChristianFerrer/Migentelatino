import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Aviso legal · Mi Gente Latino" };

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="pt-2 font-display text-lg uppercase tracking-tight text-ink">{children}</h2>
);

export default function AvisoLegalPage() {
  return (
    <LegalShell title="Aviso legal · Impressum">
      <p className="rounded-xl bg-sun/15 px-4 py-3 text-sm text-ink/70">
        Plantilla base. En Austria/Alemania el <em>Impressum</em> es obligatorio: completa los campos
        entre [corchetes] con tus datos reales y verifica los requisitos según tu forma jurídica.
      </p>

      <H>Titular del sitio</H>
      <p>
        [NOMBRE / RAZÓN SOCIAL]
        <br />
        [DIRECCIÓN COMPLETA]
        <br />
        [CÓDIGO POSTAL, CIUDAD, PAÍS]
      </p>

      <H>Contacto</H>
      <p>
        Email: [EMAIL]
        <br />
        Teléfono: [TELÉFONO]
      </p>

      <H>Datos de registro (si aplica)</H>
      <p>
        Forma jurídica: [p. ej. Einzelunternehmen / GmbH]
        <br />
        Nº de registro mercantil: [FIRMENBUCHNUMMER / HANDELSREGISTER]
        <br />
        Nº de IVA: [UID / USt-IdNr.]
      </p>

      <H>Responsable de contenidos</H>
      <p>[NOMBRE DEL RESPONSABLE]</p>

      <H>Exención de responsabilidad</H>
      <p>
        Esta es una página de validación de mercado previa al lanzamiento. La información puede cambiar.
        No nos responsabilizamos del contenido de sitios externos enlazados.
      </p>
    </LegalShell>
  );
}
