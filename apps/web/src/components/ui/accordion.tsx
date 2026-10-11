'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export function FAQAccordion({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-line">
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                'group flex w-full items-center justify-between gap-4 py-5 text-start text-title',
                'font-medium text-ink hover:text-balcony',
              )}
            >
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden
                className="h-5 w-5 shrink-0 transition-transform group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pb-5 text-ink-muted leading-relaxed">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
