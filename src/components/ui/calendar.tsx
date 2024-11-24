"use client";

import { pl } from "date-fns/locale";
import * as React from "react";
import { Chevron, DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={pl}
      captionLayout="dropdown"
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 bg",
        caption: "flex justify-center pt-1 relative items-center bg-primary",
        caption_label: "hidden",
        month_caption: "flex justify-center pt-1 relative items-center",
        dropdowns: "flex gap-4 items-center justify-between",
        dropdown: "flex items-center justify-between bg-background",
        nav: "relative flex items-center justify-between w-full", // Distributes space for arrows
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_previous: "absolute top-5 left-0 transform -translate-x-2", // Properly positions the left arrow
        button_next: "absolute right-0 bottom-5 transform translate-x-2",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected:
          "bg-primary rounded-md text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        chevron: "fill-foreground",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          return <Chevron {...props} size={16} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
