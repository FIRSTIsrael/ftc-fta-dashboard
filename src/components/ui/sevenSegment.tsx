import { SEVEN_SEGMENT_DEFAULT_CHARACTER } from "@/constants";
import { cn } from "@/lib/classNames";
import localFont from "next/font/local";

const sevenSegmentFont = localFont({
  src: "../../assets/fonts/sevenSegment.woff",
  display: "swap",
});

const SevenSegment = ({
  value,
  enabled,
  minimumLength,
  className,
  fixedSize = true,
}: {
  value: string;
  enabled: boolean;
  minimumLength?: number;
  className?: string;
  fixedSize?: boolean;
}) => (
  <div
    className={cn(sevenSegmentFont.className, "flex", "select-none", className)}
  >
    {value
      .padStart(minimumLength ?? 0, SEVEN_SEGMENT_DEFAULT_CHARACTER)
      .split("")
      .filter(
        (char, index) =>
          !fixedSize || !minimumLength || index >= value.length - minimumLength
      )
      .map((char, index) => (
        <div
          key={index}
          className={cn("relative", {
            "h-[1lh]": fixedSize,
            "w-[1ch]": fixedSize,
            "text-muted": index - ((minimumLength ?? 0) - value.length) < 0,
          })}
        >
          {fixedSize && (
            <div className="absolute text-muted top-0">
              {SEVEN_SEGMENT_DEFAULT_CHARACTER}
            </div>
          )}
          <div
            className={cn({
              absolute: fixedSize,
              "z-10": fixedSize,
              "top-0": fixedSize,
              "right-0": fixedSize,
            })}
          >
            {enabled ? char : SEVEN_SEGMENT_DEFAULT_CHARACTER}
          </div>
        </div>
      ))}
  </div>
);

export default SevenSegment;
