import { forwardRef } from "react";
import Switch from "@/components/Common/Switch";
import type { FloatingWindowHeaderProps } from "@/types";
import {
  CopyClassesIcon,
  CopyElementIcon,
  CloseMarkIcon,
  TifooText,
} from "@/components";
const FloatingWindowHeader = forwardRef<
  HTMLDivElement,
  FloatingWindowHeaderProps
>(
  (
    {
      isFixed,
      isDragging,
      onCopyClasses,
      onCopyElement,
      onDeactivate,
      isAIMode,
      onAIModeChange,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`flex p-3 justify-between items-center mb-3 pb-2 border-b border-[#1DA1F2] bg-[#1DA1F2] text-white rounded-t-lg ${
          isFixed ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <TifooText className="text-md" />
          <Switch checked={isAIMode} onChange={onAIModeChange} />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onCopyClasses}
            className="bg-transparent border-none text-white cursor-pointer p-1 rounded hover:bg-[#0C7ABF]"
            title="Copy Classes"
          >
            <CopyClassesIcon className="size-4" />
          </button>
          <button
            onClick={onCopyElement}
            className="bg-transparent border-none text-white cursor-pointer p-1 rounded hover:bg-[#0C7ABF]"
            title="Copy Element"
          >
            <CopyElementIcon className="size-4" />
          </button>
          <button
            onClick={onDeactivate}
            className="bg-transparent border-none text-white cursor-pointer p-1 rounded hover:bg-[#0C7ABF]"
            title="Deactivate"
          >
            <CloseMarkIcon className="size-4" />
          </button>
        </div>
      </div>
    );
  }
);

export default FloatingWindowHeader;
