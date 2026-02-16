import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface ModelAssumptionsNoteProps {
  assumptions: string[];
}

export default function ModelAssumptionsNote({ assumptions }: ModelAssumptionsNoteProps) {
  return (
    <Alert className="bg-muted/50">
      <Info className="h-4 w-4" />
      <AlertTitle>Model Assumptions</AlertTitle>
      <AlertDescription>
        <p className="text-sm mb-2">This educational model makes the following simplifying assumptions:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {assumptions.map((assumption, index) => (
            <li key={index}>{assumption}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
