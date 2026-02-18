import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ConfigurationModeToggleProps<T> {
  presets: Array<{ name: string; [key: string]: any }>;
  selectedPreset: string;
  onPresetChange: (presetName: string) => void;
  isCustom: boolean;
  label?: string;
}

export default function ConfigurationModeToggle<T>({
  presets,
  selectedPreset,
  onPresetChange,
  isCustom,
  label = 'Configuration',
}: ConfigurationModeToggleProps<T>) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {isCustom && (
          <Badge variant="outline" className="text-xs">
            Custom
          </Badge>
        )}
      </div>
      <Select value={selectedPreset} onValueChange={onPresetChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem key={preset.name} value={preset.name}>
              {preset.name}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
