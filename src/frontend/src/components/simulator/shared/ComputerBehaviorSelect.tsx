import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ComputerBehavior, computerBehaviorOptions } from './computerBehaviors';

interface ComputerBehaviorSelectProps {
  value: ComputerBehavior;
  onChange: (value: ComputerBehavior) => void;
}

export default function ComputerBehaviorSelect({ value, onChange }: ComputerBehaviorSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Computer Behavior</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {computerBehaviorOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex flex-col">
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
