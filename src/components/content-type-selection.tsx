"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ContentTypeOption {
  id: string;
  name: string;
  // icon: string;
  defaultQuantity: number;
  maxQuantity: number;
}

interface ContentTypeSelectionProps {
  onSelectionChange?: (selections: { [key: string]: number }) => void;
}

export function ContentTypeSelection({
  onSelectionChange,
}: ContentTypeSelectionProps) {
  const contentTypes: ContentTypeOption[] = [
    {
      id: "linkedin",
      name: "LinkedIn",
      // icon: "💼",
      defaultQuantity: 2,
      maxQuantity: 5,
    },
    {
      id: "twitter",
      name: "X/Twitter",
      // icon: "𝕏",
      defaultQuantity: 3,
      maxQuantity: 10,
    },
  ];

  const [selections, setSelections] = useState<{ [key: string]: number }>({});

  const handleCheckboxChange = (typeId: string, checked: boolean) => {
    const contentType = contentTypes.find((t) => t.id === typeId);
    if (!contentType) return;

    const newSelections = { ...selections };

    if (checked) {
      newSelections[typeId] = contentType.defaultQuantity;
    } else {
      delete newSelections[typeId];
    }

    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  const handleQuantityChange = (typeId: string, quantity: number) => {
    const contentType = contentTypes.find((t) => t.id === typeId);
    if (!contentType) return;

    const clampedQuantity = Math.max(
      1,
      Math.min(quantity, contentType.maxQuantity)
    );
    const newSelections = { ...selections, [typeId]: clampedQuantity };

    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  const isSelected = (typeId: string) => typeId in selections;
  const getQuantity = (typeId: string) => selections[typeId] || 0;

  return (
    <div className="space-y-4">
      {/* <h4 className="text-lg font-semibold">Content Types</h4> */}
      <div className="space-y-4">
        {contentTypes.map((contentType) => (
          <div key={contentType.id} className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={contentType.id}
                checked={isSelected(contentType.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(contentType.id, checked as boolean)
                }
              />
              <Label
                htmlFor={contentType.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="font-medium">{contentType.name}</span>
              </Label>
            </div>

            {isSelected(contentType.id) && (
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor={`${contentType.id}-quantity`}
                    className="text-sm text-muted-foreground min-w-fit"
                  >
                    Number of posts:
                  </Label>
                  <Input
                    id={`${contentType.id}-quantity`}
                    type="number"
                    min={1}
                    max={contentType.maxQuantity}
                    value={getQuantity(contentType.id)}
                    onChange={(e) =>
                      handleQuantityChange(
                        contentType.id,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-20 h-8"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
