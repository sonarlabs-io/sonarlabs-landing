// components/shared/EmptyProjectState.tsx
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EmptyProjectStateProps {
  projectName: string;
  message?: string;
}

export function EmptyProjectState({ 
  projectName, 
  message = "You've removed all artists from this project. Start a new search above or return home to explore more artists."
}: EmptyProjectStateProps) {
  const router = useRouter();
  
  return (
    <div className="text-center space-y-6 py-12">
      <div className="space-y-2">
        <h3 className="text-xl font-medium">This project is empty</h3>
        <p className="text-gray-500 dark:text-gray-400">{message}</p>
      </div>
      <Button
        onClick={() => router.push('/')}
        className="inline-flex items-center"
      >
        <Home className="mr-2 h-4 w-4" />
        Return to Home
      </Button>
    </div>
  );
}