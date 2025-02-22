// app/(unauthenticated)/layout.tsx
import { ReactNode } from 'react';

export default function UnauthenticatedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
