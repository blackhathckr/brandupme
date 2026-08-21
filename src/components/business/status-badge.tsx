const STATUS_STYLES: Record<string, string> = {
  New: "bg-[#EFF4FF] text-[#2F6FE4]",
  Upcoming: "bg-[#EFF4FF] text-[#2F6FE4]",
  Pending: "bg-[#FDF3E4] text-[#B87A17]",
  "In Negotiation": "bg-[#F1EEFC] text-[#6D5FD1]",
  Rescheduled: "bg-[#F1EEFC] text-[#6D5FD1]",
  Closed: "bg-[#EAF6DF] text-[#2F6F18]",
  "Closed Won": "bg-[#EAF6DF] text-[#2F6F18]",
  Completed: "bg-[#EAF6DF] text-[#2F6F18]",
  Rejected: "bg-[#FDECEC] text-[#D51F1F]",
  "Closed Lost": "bg-[#FDECEC] text-[#D51F1F]",
  "Rejected / Cancelled": "bg-[#FDECEC] text-[#D51F1F]",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={"inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold " + (STATUS_STYLES[status] ?? "bg-[#F1F2F4] text-[#5F6570]")}>
      {status}
    </span>
  );
}
