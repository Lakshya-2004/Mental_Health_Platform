import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <>
      <style>{`
        .mh-calendar {
          font-family: 'DM Sans', 'Nunito', system-ui, sans-serif;
          background: #f7f5f0;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 24px rgba(98, 124, 103, 0.10);
          border: 1.5px solid #dde8dc;
          max-width: 320px;
        }

        /* Caption / month header */
        .mh-calendar .rdp-caption {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0 0 12px 0;
          border-bottom: 1px solid #dde8dc;
          margin-bottom: 8px;
        }
        .mh-calendar .rdp-caption_label {
          font-size: 15px;
          font-weight: 600;
          color: #3b5c42;
          letter-spacing: 0.01em;
        }

        /* Nav buttons */
        .mh-calendar .rdp-nav {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .mh-calendar .rdp-nav_button {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e8f0e5;
          color: #4a7055;
          transition: background 0.18s, color 0.18s;
        }
        .mh-calendar .rdp-nav_button:hover {
          background: #c8dfc4;
          color: #2e5035;
        }
        .mh-calendar .rdp-nav_button_previous {
          position: absolute;
          left: 0;
        }
        .mh-calendar .rdp-nav_button_next {
          position: absolute;
          right: 0;
        }

        /* Table */
        .mh-calendar .rdp-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 2px 2px;
        }

        /* Weekday headers */
        .mh-calendar .rdp-head_row {
          display: flex;
          margin-bottom: 4px;
        }
        .mh-calendar .rdp-head_cell {
          width: 40px;
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #8aad8e;
          padding: 6px 0;
        }

        /* Rows */
        .mh-calendar .rdp-row {
          display: flex;
          width: 100%;
          margin-top: 2px;
        }

        /* Day cells */
        .mh-calendar .rdp-cell {
          width: 40px;
          height: 40px;
          text-align: center;
          position: relative;
        }

        /* Day buttons */
        .mh-calendar .rdp-day {
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 13.5px;
          color: #3b4a3e;
          transition: background 0.15s, color 0.15s, transform 0.1s;
          font-weight: 450;
        }
        .mh-calendar .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_disabled) {
          background: #e0eddd;
          color: #2e5035;
          transform: scale(1.08);
        }

        /* Today */
        .mh-calendar .rdp-day_today:not(.rdp-day_selected) {
          background: #f0f7ee;
          color: #4a7055;
          font-weight: 600;
          box-shadow: inset 0 0 0 1.5px #8fc49a;
        }

        /* Selected */
        .mh-calendar .rdp-day_selected,
        .mh-calendar .rdp-day_selected:hover {
          background: linear-gradient(135deg, #5e9c6a, #4a7a5a);
          color: #ffffff !important;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(78, 140, 95, 0.35);
          transform: scale(1.05);
        }

        /* Outside days */
        .mh-calendar .rdp-day_outside {
          color: #bfcfc1;
          opacity: 0.7;
        }

        /* Disabled */
        .mh-calendar .rdp-day_disabled {
          color: #cdd8ce;
          cursor: not-allowed;
          opacity: 0.5;
        }

        /* Range */
        .mh-calendar .rdp-day_range_middle {
          border-radius: 0;
          background: #d8eddb;
          color: #3b5c42;
        }
        .mh-calendar .rdp-day_range_start,
        .mh-calendar .rdp-day_range_end {
          background: linear-gradient(135deg, #5e9c6a, #4a7a5a);
          color: #fff !important;
        }

        /* Months layout */
        .mh-calendar .rdp-months {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 480px) {
          .mh-calendar .rdp-months {
            flex-direction: row;
          }
        }
      `}</style>

      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("mh-calendar", className)}
        classNames={{
          months: "rdp-months",
          month: "rdp-month",
          caption: "rdp-caption",
          caption_label: "rdp-caption_label",
          nav: "rdp-nav",
          nav_button: "rdp-nav_button",
          nav_button_previous: "rdp-nav_button_previous",
          nav_button_next: "rdp-nav_button_next",
          table: "rdp-table",
          head_row: "rdp-head_row",
          head_cell: "rdp-head_cell",
          row: "rdp-row",
          cell: "rdp-cell",
          day: "rdp-day",
          day_today: "rdp-day_today",
          day_selected: "rdp-day_selected",
          day_outside: "rdp-day_outside",
          day_disabled: "rdp-day_disabled",
          day_range_start: "rdp-day_range_start",
          day_range_end: "rdp-day_range_end",
          day_range_middle: "rdp-day_range_middle",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          Chevron: (props) => {
            if (props.orientation === "left") {
              return <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />;
            }
            return <ChevronRight className="h-4 w-4" strokeWidth={2.2} />;
          },
        }}
        {...props}
      />
    </>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };