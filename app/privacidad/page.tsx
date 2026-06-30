import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Privacidad · Mi Gente Latino" };

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="pt-2 font-display text-lg uppercase tracking-tight text-ink">{children}</h2>
);

export default function PrivacidadPage() {
  return (
    <LegalShell title="Política de privacidad">
      <p className="rounded-xl bg-sun/15 px-4 py-3 text-sm text-ink/70">
        Plantilla base — revisa y completa los campos entre [corchetes] y valida con un profesional legal
        antes de operar en Austria/Alemania. Última actualización: [FECHA].
      </p>

      <H>Responsable del tratamiento</H>
      <p>
        [NOMBRE / EMPRESA], [DIRECCIÓN COMPLETA], [PAÍS]. Contacto: [EMAIL DE CONTACTO].
      </p>

      <H>Qué datos recogemos</H>
      <p>
        <strong>Formulario:</strong> nombre, número de teléfono, país de origen, el producto que más extrañas
        y el idioma de la página. Tú nos los facilitas voluntariamente al enviar el formulario.
      </p>
      <p>
        <strong>Analítica de uso:</strong> eventos anónimos de navegación (visitas a la página, interacción con
        el formulario, fuente de tráfico, país aproximado y tipo de dispositivo). <strong>No usamos cookies</strong>,
        no almacenamos nada en tu dispositivo y <strong>no guardamos tu dirección IP</strong> (solo se usa de forma
        transitoria para derivar un identificador anónimo del día).
      </p>

      <H>Para qué los usamos</H>
      <p>
        Para validar el interés en la tienda y <strong>contactarte por WhatsApp</strong> cuando lancemos o cuando
        llegue el producto que pediste, y para entender cómo se usa la página y mejorarla.
      </p>

      <H>Base legal (RGPD)</H>
      <p>
        Tu <strong>consentimiento</strong> (art. 6.1.a) para los datos del formulario y el contacto por WhatsApp;
        nuestro <strong>interés legítimo</strong> (art. 6.1.f) para la analítica anónima y agregada.
      </p>

      <H>Conservación</H>
      <p>
        Conservamos los datos del formulario hasta el lanzamiento o hasta que solicites su eliminación. Los datos
        de analítica se conservan de forma agregada y anónima.
      </p>

      <H>Proveedores</H>
      <p>
        Alojamos los datos en <strong>Supabase</strong> (base de datos, UE) y la web en <strong>Vercel</strong> (hosting).
        No vendemos ni cedemos tus datos a terceros con fines comerciales.
      </p>

      <H>Tus derechos</H>
      <p>
        Puedes solicitar acceso, rectificación, supresión, limitación u oposición, y retirar tu consentimiento en
        cualquier momento escribiendo a [EMAIL DE CONTACTO]. También puedes reclamar ante la autoridad de protección
        de datos competente (p. ej. la <em>Datenschutzbehörde</em> en Austria).
      </p>
    </LegalShell>
  );
}
