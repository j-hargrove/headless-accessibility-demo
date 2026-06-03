export const meaningModel = {
  title: "Conversion Dashboard",

  intent: "Help users identify conversion drop-off and export reports.",

  conversionRate: "42%",

  dateRange: "Last 30 Days",

  primaryAction: "Export Report",

  pagePurpose: "Analyze conversion performance",

  availableActions: ["Export Report"],

  entities: [
    "conversionRate",
    "dateRange",
    "report"
  ],

  actions: [
    "exportReport"
  ]
};