export type LeadStatus = "New" | "Pending" | "In Negotiation" | "Closed" | "Rejected";

export const websiteTrafficSources = {
  total: 2450,
  sources: [
    { label: "SEO / Organic Search", value: 1036, pct: 42, color: "#2F6FE4" },
    { label: "Digital Business Card", value: 686, pct: 28, color: "#2F6F18" },
    { label: "Direct Web Page", value: 294, pct: 12, color: "#7C5CD1" },
    { label: "Social Media", value: 245, pct: 10, color: "#E07A1F" },
    { label: "BrandUpMe Search", value: 122, pct: 5, color: "#D1418E" },
    { label: "Other Sources", value: 67, pct: 3, color: "#B0BAB4" },
  ],
};

export const leads: {
  id: string;
  name: string;
  interest: string;
  source: string;
  phone: string;
  email: string;
  receivedOn: string;
  status: LeadStatus;
}[] = [
  { id: "L-00086", name: "Rajesh Kumar", interest: "Company Formation in Dubai", source: "WhatsApp (Digital Card)", phone: "+971 50 123 4567", email: "rajesh.kumar@email.com", receivedOn: "18 Aug 2026, 11:48 AM", status: "New" },
  { id: "L-00085", name: "Priya Sharma", interest: "PRO Services", source: "Instagram (Digital Card)", phone: "+971 55 987 6543", email: "priya.sharma@email.com", receivedOn: "18 Aug 2026, 10:42 AM", status: "Pending" },
  { id: "L-00084", name: "Ahmed Al Mansoori", interest: "Bank Account Opening", source: "SEO / Google", phone: "+971 56 765 4321", email: "ahmed.mansoori@email.com", receivedOn: "18 Aug 2026, 09:15 AM", status: "Pending" },
  { id: "L-00083", name: "John Smith", interest: "VAT Registration", source: "Direct Web Page", phone: "+971 52 345 6789", email: "john.smith@email.com", receivedOn: "18 Aug 2026, 08:30 AM", status: "In Negotiation" },
  { id: "L-00082", name: "Fatima Ali", interest: "Business Setup in Free Zone", source: "Facebook (Digital Card)", phone: "+971 58 234 5678", email: "fatima.ali@email.com", receivedOn: "17 Aug 2026, 06:20 PM", status: "Closed" },
  { id: "L-00081", name: "Mohammed Yousuf", interest: "Trade License Renewal", source: "BrandUpMe Search", phone: "+971 50 111 2233", email: "mohammed.yousuf@email.com", receivedOn: "17 Aug 2026, 04:10 PM", status: "Closed" },
  { id: "L-00080", name: "Sara Khan", interest: "Corporate Structuring", source: "SEO / Google", phone: "+971 55 222 3344", email: "sara.khan@email.com", receivedOn: "17 Aug 2026, 02:45 PM", status: "Rejected" },
  { id: "L-00079", name: "Omar Hassan", interest: "Company Formation in Dubai", source: "Direct Web Page", phone: "+971 52 333 4455", email: "omar.hassan@email.com", receivedOn: "16 Aug 2026, 12:30 PM", status: "Closed" },
];

export const leadOverview = {
  total: 86,
  new: 7,
  pending: 9,
  negotiation: 3,
  closed: 15,
  rejected: 4,
  changeVsLastWeek: { total: 18.6, new: 16.7, pending: 12.5, negotiation: 20, closed: 25, rejected: -11.1 },
  sourceAnalytics: [
    { label: "WhatsApp", value: 36, pct: 42.4, color: "#3E8130" },
    { label: "SEO / Google", value: 19, pct: 22.4, color: "#2F6FE4" },
    { label: "Instagram", value: 12, pct: 14.1, color: "#E07A1F" },
    { label: "Facebook", value: 8, pct: 9.4, color: "#7C5CD1" },
    { label: "Direct Web Page", value: 6, pct: 7.1, color: "#1D8F82" },
    { label: "Others", value: 5, pct: 4.6, color: "#B0BAB4" },
  ],
};

export type CallStatus = "Upcoming" | "Pending" | "Rescheduled" | "Completed" | "Rejected";

export const videoCalls: {
  id: string;
  customerName: string;
  purpose: string;
  requestedOn: string;
  preferredDateTime: string;
  status: CallStatus;
}[] = [
  { id: "VC-0024", customerName: "Rajesh Kumar", purpose: "Discussion about Company Formation", requestedOn: "18 Aug 2026, 11:48 AM", preferredDateTime: "19 Aug 2026, 04:00 PM", status: "Upcoming" },
  { id: "VC-0023", customerName: "Priya Sharma", purpose: "PRO Services Consultation", requestedOn: "18 Aug 2026, 10:42 AM", preferredDateTime: "20 Aug 2026, 11:00 AM", status: "Upcoming" },
  { id: "VC-0022", customerName: "Ahmed Al Mansoori", purpose: "Bank Account Opening", requestedOn: "18 Aug 2026, 09:15 AM", preferredDateTime: "19 Aug 2026, 10:30 AM", status: "Pending" },
  { id: "VC-0021", customerName: "John Smith", purpose: "VAT Registration Discussion", requestedOn: "18 Aug 2026, 08:30 AM", preferredDateTime: "18 Aug 2026, 02:00 PM", status: "Completed" },
  { id: "VC-0020", customerName: "Fatima Ali", purpose: "Free Zone Business Setup", requestedOn: "17 Aug 2026, 06:20 PM", preferredDateTime: "17 Aug 2026, 03:00 PM", status: "Completed" },
  { id: "VC-0019", customerName: "Mohammed Yousuf", purpose: "Trade License Renewal", requestedOn: "17 Aug 2026, 04:10 PM", preferredDateTime: "16 Aug 2026, 01:00 PM", status: "Rescheduled" },
  { id: "VC-0018", customerName: "Sara Khan", purpose: "Corporate Structuring", requestedOn: "17 Aug 2026, 02:45 PM", preferredDateTime: "16 Aug 2026, 11:00 AM", status: "Rejected" },
];

export const callOverview = {
  total: 24,
  upcoming: 2,
  pending: 3,
  rescheduled: 1,
  completed: 16,
  rejected: 2,
  changeVsLastWeek: { total: 14.2, upcoming: 100, pending: -25, rescheduled: 50, completed: 14.3, rejected: -33.3 },
  purposes: [
    { label: "Company Formation", value: 9, pct: 37.5 },
    { label: "PRO Services", value: 5, pct: 20.8 },
    { label: "Bank Account Opening", value: 4, pct: 16.7 },
    { label: "VAT Registration", value: 3, pct: 12.5 },
    { label: "Others", value: 3, pct: 12.5 },
  ],
};

export type DealStage = "Pending" | "In Negotiation" | "Closed Won" | "Closed Lost";

export const deals: {
  id: string;
  customerName: string;
  interest: string;
  value: number;
  stage: DealStage;
  closingDate: string;
  owner: string;
}[] = [
  { id: "D-00016", customerName: "Rajesh Kumar", interest: "Company Formation in Dubai", value: 120000, stage: "In Negotiation", closingDate: "28 Aug 2026", owner: "You" },
  { id: "D-00015", customerName: "Priya Sharma", interest: "PRO Services", value: 35000, stage: "Pending", closingDate: "25 Aug 2026", owner: "You" },
  { id: "D-00014", customerName: "Ahmed Al Mansoori", interest: "Bank Account Opening", value: 45000, stage: "In Negotiation", closingDate: "30 Aug 2026", owner: "You" },
  { id: "D-00013", customerName: "John Smith", interest: "VAT Registration", value: 25000, stage: "Closed Won", closingDate: "15 Aug 2026", owner: "You" },
  { id: "D-00012", customerName: "Fatima Ali", interest: "Free Zone Business Setup", value: 60000, stage: "Closed Won", closingDate: "12 Aug 2026", owner: "You" },
  { id: "D-00011", customerName: "Mohammed Yousuf", interest: "Trade License Renewal", value: 18000, stage: "Closed Won", closingDate: "10 Aug 2026", owner: "You" },
  { id: "D-00010", customerName: "Sara Khan", interest: "Corporate Structuring", value: 52000, stage: "Closed Lost", closingDate: "8 Aug 2026", owner: "You" },
];

export const dealOverview = {
  total: 16,
  pending: 4,
  negotiation: 3,
  closedWon: 7,
  closedLost: 2,
  totalValue: 285000,
  changeVsLastWeek: { total: 23.1, pending: 33.3, negotiation: 20, closedWon: 16.7, closedLost: -33.3, totalValue: 18.6 },
  byStage: [
    { label: "Closed Won", value: 175000, pct: 61.4, color: "#3E8130" },
    { label: "In Negotiation", value: 65000, pct: 22.8, color: "#7C5CD1" },
    { label: "Pending", value: 30000, pct: 10.5, color: "#E07A1F" },
    { label: "Closed Lost", value: 15000, pct: 5.3, color: "#D51F1F" },
  ],
};
