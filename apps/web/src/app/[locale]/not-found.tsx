import Link from 'next/link';
import { Container, Section } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-[560px] text-center">
        <h1 className="font-display text-display-l">Page not found</h1>
        <p className="mt-3 text-ink-muted">The page you are looking for does not exist.</p>
        <Link href="/" className="btn btn-primary mt-6">
          Back to home
        </Link>
      </Container>
    </Section>
  );
}
