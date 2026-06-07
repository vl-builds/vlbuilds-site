'use client';

import { LocaleProvider } from '../contexts/LocaleContext';

export default function ClientProviders({ children }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
