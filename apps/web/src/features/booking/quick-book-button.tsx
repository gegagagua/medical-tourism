'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button, type ButtonProps } from '@/components/ui/button';
import { QuickBookingSheet } from './quick-booking-sheet';
import { cn } from '@/lib/cn';

interface Props extends ButtonProps {
  className?: string;
  procedureKey?: string;
  children?: ReactNode;
}

export function QuickBookButton({
  className,
  procedureKey,
  children,
  ...rest
}: Props) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className={cn(className)} onClick={() => setOpen(true)} {...rest}>
        {children ?? t('bookNow')}
      </Button>
      <QuickBookingSheet
        open={open}
        onOpenChange={setOpen}
        defaultProcedureKey={procedureKey}
      />
    </>
  );
}
