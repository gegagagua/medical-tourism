// The Ticket (DESIGN.md §2) — boarding-pass shaped card. Three variants:
// `estimator` on the landing hero, `offer` for an accepted offer, `itinerary` for the itinerary page.
// A separate `/og/*` route renders the static OG variant.
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export interface TicketProps {
  variant?: 'estimator' | 'offer' | 'itinerary';
  home: string;
  destination?: string;
  procedure: string;
  atHome: string;
  inGeorgia: string;
  nights: string;
  coordinator?: string;
  savingsBadge?: string;
  cta?: ReactNode;
  children?: ReactNode;
  animate?: boolean;
  className?: string;
}

export function Ticket({
  variant = 'estimator',
  home,
  destination = 'TBS',
  procedure,
  atHome,
  inGeorgia,
  nights,
  coordinator,
  savingsBadge,
  cta,
  children,
  animate = true,
  className,
}: TicketProps) {
  return (
    <article
      className={cn(
        'ticket-shell relative overflow-hidden rounded-ticket',
        animate && 'motion-safe:animate-ticket-print motion-reduce:animate-none',
        className,
      )}
      aria-label="Treatment ticket"
    >
      {/* Perforation dots at the top-right corner — brand mark */}
      <div className="absolute end-5 top-4 flex gap-1" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-saffron" />
        ))}
      </div>
      {savingsBadge && (
        <span className="absolute end-5 top-9 rounded-full bg-saffron/15 px-2 py-0.5 text-small font-medium text-ink">
          {savingsBadge}
        </span>
      )}

      <div className="p-5 sm:p-6">
        {/* Trip line */}
        <div className="flex items-center gap-2 text-small text-ink-muted">
          <span className="truncate">{home}</span>
          <span aria-hidden className="flip-x text-balcony">→</span>
          <span className="font-medium text-ink">{destination}</span>
        </div>
        <div className="mt-1 text-small font-medium text-ink">{procedure}</div>

        {/* Prices — one line each, compact */}
        <div className="mt-5 grid grid-cols-2 gap-x-5">
          <div>
            <div className="text-small text-ink-muted">At home</div>
            <div className="mt-0.5 whitespace-nowrap font-display tabular text-ticket-figure text-ink/70 line-through decoration-line/70 decoration-1">
              {atHome}
            </div>
          </div>
          <div>
            <div className="text-small text-ink-muted">In Georgia</div>
            <div className="mt-0.5 whitespace-nowrap font-display tabular text-ticket-figure text-balcony">
              {inGeorgia}
            </div>
          </div>
        </div>

        {/* Stay + coordinator chips */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-dashed border-line pt-4 text-small">
          <div>
            <span className="text-ink-muted">Stay </span>
            <span className="font-medium tabular text-ink">{nights}</span>
          </div>
          {coordinator && (
            <div>
              <span className="text-ink-muted">Coordinator </span>
              <span className="font-medium text-ink">{coordinator}</span>
            </div>
          )}
        </div>

        {/* Interactive controls (estimator) */}
        {children && <div className="mt-4">{children}</div>}

        {/* CTA */}
        {cta && <div className="mt-4">{cta}</div>}

        {variant === 'estimator' && (
          <p className="mt-3 text-small text-ink-muted">
            Estimate — your exact plan comes from the clinic after reviewing your X-ray.
          </p>
        )}
      </div>
    </article>
  );
}
