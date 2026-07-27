import Link from "next/link";
import { Card } from "@/design-system";
import { Badge } from "@/design-system";
import { Container } from "@/design-system";

export default function HomePage() {
  return (
    <Container>
      <section className="hero">
        <Badge>Versión 1.1.1</Badge>
        <h1>El idioma se adapta a tu vida, no al revés.</h1>
        <p>
          Aprende inglés y francés con lecciones progresivas, audio natural,
          práctica interactiva y retroalimentación personalizada.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" href="/register">Comenzar prueba gratis</Link>
          <Link className="btn btn-light" href="/login">Iniciar sesión</Link>
        </div>
      </section>

      <section className="grid">
  <Card>
    <h3>Aprendizaje progresivo</h3>
    <p className="muted">Continúa desde tu última actividad.</p>
  </Card>

  <Card>
    <h3>Audio natural</h3>
    <p className="muted">Preparado para audios creados con SuitBlaster.</p>
  </Card>

  <Card>
    <h3>Práctica con IA</h3>
    <p className="muted">Speaking y Writing con retroalimentación.</p>
  </Card>
</section>
    </Container>
  );
}
