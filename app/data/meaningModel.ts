export const meaningModel = {
  title: "Conversion Dashboard",

  intent: "Help users identify conversion drop-off and export reports.",

  metrics: [
    {
      label: "Conversion Rate",
      value: "42%",
    },
    {
      label: "Visitors",
      value: "12,481",
    },
    {
      label: "Signups",
      value: "5,242",
    },
  ],

  dateRange: "Last 30 Days",

  primaryAction: "Export Report",

  pagePurpose: "Analyze conversion performance",

  availableActions: ["Export Report", "Change Date Range"],

  entities: ["conversionRate", "visitors", "signups", "dateRange", "report"],

  actions: ["exportReport", "changeDateRange"],
};