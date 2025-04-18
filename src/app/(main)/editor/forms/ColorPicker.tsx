import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
interface ColorPikerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}
const customColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#102E50'];
export default function ColorPicker({ color, onChange }: ColorPikerProps) {
  const [showPopOver, setshowPopOver] = useState(false);
  return (
    <Popover open={showPopOver} onOpenChange={setshowPopOver}>
      <PopoverTrigger asChild>
        <Button
        title="Change Resume Color"
          onClick={() => setshowPopOver(true)}
          size={"icon"}
          className="bg-[#121212] text-gray hover:bg-black"
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
      align="end"
      className="border-none shadow-none bg-transparent">
        <TwitterPicker className="border border-black bg-amber-300"  colors={customColors} triangle="top-right" color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
