import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container', className)} {...rest} />;
}

export function Section({
  className,
  id,
  ...rest
}: HTMLAttributes<HTMLElement> & { id?: string }) {
  return (
    <section
      id={id}
      className={cn('py-12 md:py-section-y', className)}
      {...rest}
    />
  );
}
