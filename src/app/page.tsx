import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { InstallPrompt, PushNotificationManager } from './pwa';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <PushNotificationManager />
      <InstallPrompt />
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <a href="/auth/login">Masuk</a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href="/auth/register">Daftar</a>
        </Button>
      </div>
    </div>
  );
}
