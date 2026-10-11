'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button, type ButtonProps } from '@/components/ui/button';
import { BookingSheet } from './booking-sheet';
import { cn } from '@/lib/cn';

interface Props extends ButtonProps {
  className?: string;
  procedureKey?: string;
  children?: ReactNode;
  label?: string;
}

export function BookCallButton({
  className,
  procedureKey,
  children,
  label,
  ...rest
}: Props) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className={cn(className)} onClick={() => setOpen(true)} {...rest}>
        {children ?? label ?? t('bookCall')}
      </Button>
      <BookingSheet open={open} onOpenChange={setOpen} defaultProcedureKey={procedureKey} />
    </>
  );
}
