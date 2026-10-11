'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Sheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 end-0 z-50 flex w-full max-w-xl flex-col overflow-y-auto',
            'bg-surface shadow-ticket',
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <Dialog.Title className="text-title font-medium">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="rounded-input p-2 text-ink-muted hover:text-ink"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex-1 px-6 py-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
