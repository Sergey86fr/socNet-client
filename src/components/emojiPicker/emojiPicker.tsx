
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import type { EmojiClickData } from 'emoji-picker-react';
import EmojiPickerReact from 'emoji-picker-react';


type EmojiPickerProps = {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

   const handleEmojiClick = (emojiObject: EmojiClickData) => {
    onEmojiSelect(emojiObject.emoji);
    setOpen(false);
  };

  return (
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none" align="end">
        <EmojiPickerReact 
         previewConfig={{ showPreview: false }} onEmojiClick={handleEmojiClick} />
      </PopoverContent>
    </Popover>
  );
}

export  default EmojiPicker ;
