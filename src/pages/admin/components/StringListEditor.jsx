import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function StringListEditor({
  value = [],
  onChange,
  multiline = false,
  placeholder = "",
  addLabel = "添加一项",
}) {
  const Control = multiline ? Textarea : Input;

  const updateItem = (index, nextValue) => {
    const next = [...value];
    next[index] = nextValue;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Control
            value={item}
            onChange={(event) => updateItem(index, event.target.value)}
            placeholder={placeholder}
            className="flex-1"
            rows={multiline ? 3 : undefined}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
            aria-label="删除"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, ""])}
      >
        <Plus className="h-4 w-4 mr-1" />
        {addLabel}
      </Button>
    </div>
  );
}
