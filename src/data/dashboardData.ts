// Complete HUDD Dashboard Data - 52nd Dashboard Meeting (29th December 2025)

export interface FinancialProgress {
  planType: string;
  budgetEstimate: number;
  soOrder: number;
  ifmsOrder: number;
  percentage: number;
}

export interface SchemeFinancial {
  id: number;
  vertical: string;
  schemeName: string;
  budget: number;
  soExpenditure: number | null;
  ifmsExpenditure: number | null;
  percentage: number | null;
  sourceSystem: string;
}

export interface KPI {
  id: string;
  kpiName: string;
  status: string;
  numeratorValue?: number | string;
  numeratorUnit?: string;
  denominatorValue?: number | string;
  denominatorUnit?: string;
  remarks?: string;
}

export interface Scheme {
  id: number;
  name: string;
  shortName: string;
  nodal: string;
  sourceSystem: string;
  responsibleInstitution: string;
  dataFrequency: string;
  kpis: KPI[];
}

export interface ActionItem {
  id: number;
  actionItem: string;
  actionBy: string;
  timeline: string;
  status: string;
}

// Financial Progress Summary
export const financialProgressSummary: FinancialProgress[] = [
  { planType: "State Sector Scheme", budgetEstimate: 4365.00, soOrder: 2689.25, ifmsOrder: 2311.57, percentage: 52.96 },
  { planType: "Centrally Sponsored Scheme", budgetEstimate: 2164.00, soOrder: 1196.57, ifmsOrder: 752.56, percentage: 34.78 },
  { planType: "Central Sector Scheme", budgetEstimate: 0, soOrder: 0, ifmsOrder: 0, percentage: 0 },
];

export const transferFromState: FinancialProgress[] = [
  { planType: "State Finance Commission", budgetEstimate: 1489.78, soOrder: 1237.71, ifmsOrder: 1237.71, percentage: 83.08 },
  { planType: "Union Finance Commission", budgetEstimate: 1069.66, soOrder: 60.41, ifmsOrder: 60.41, percentage: 5.65 },
  { planType: "Other Transfer (Stamp Duty)", budgetEstimate: 130.19, soOrder: 129.68, ifmsOrder: 97.64, percentage: 75.00 },
];

export const totalBudgetSummary = {
  totalSchemes: 6529.00,
  totalTransfer: 2664.63,
  adminExpenditure: 688.93,
  totalBudget: 9882.56,
  totalExpenditure: 4796.84,
  overallPercentage: 48.54
};

// Scheme-wise Financial Data
export const schemeFinancialData: SchemeFinancial[] = [
  // SUJALA
  { id: 1, vertical: "SUJALA", schemeName: "24x7 Water Supply from Tap (WATCO)", budget: 265, soExpenditure: 200.00, ifmsExpenditure: 149.69, percentage: 56.49, sourceSystem: "Manual Entry" },
  { id: 2, vertical: "SUJALA", schemeName: "OWSC Other Revenue Expenditure", budget: 388, soExpenditure: 341.00, ifmsExpenditure: 257.07, percentage: 66.26, sourceSystem: "Manual Entry" },
  { id: 3, vertical: "SUJALA", schemeName: "OWSC Grant in Aid Salaries", budget: 19, soExpenditure: 19.00, ifmsExpenditure: 15.67, percentage: 82.47, sourceSystem: "Manual Entry" },
  { id: 4, vertical: "SUJALA", schemeName: "BASUDHA (Works)", budget: 100, soExpenditure: null, ifmsExpenditure: 46.72, percentage: 46.72, sourceSystem: "Manual Entry" },
  { id: 5, vertical: "SUJALA", schemeName: "Efficiency measures of Urban Water Supply", budget: 10, soExpenditure: null, ifmsExpenditure: 5.31, percentage: 53.10, sourceSystem: "Manual Entry" },
  { id: 6, vertical: "SUJALA", schemeName: "Payment of Decretal Dues", budget: 1, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  
  // Swachha Odisha
  { id: 7, vertical: "Swachha Odisha", schemeName: "Solid Waste Management", budget: 211, soExpenditure: 148.25, ifmsExpenditure: 148.25, percentage: 70.26, sourceSystem: "Manual Entry" },
  { id: 8, vertical: "Swachha Odisha", schemeName: "Liquid Waste Management", budget: 100, soExpenditure: 73.05, ifmsExpenditure: 73.05, percentage: 73.05, sourceSystem: "Manual Entry" },
  { id: 9, vertical: "Swachha Odisha", schemeName: "GARIMA", budget: 0.0001, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  
  // MSBY
  { id: 10, vertical: "MSBY", schemeName: "Infrastructure Development", budget: 850, soExpenditure: 553.44, ifmsExpenditure: 447.52, percentage: 52.65, sourceSystem: "Manual Entry" },
  { id: 11, vertical: "MSBY", schemeName: "Urban Wage Employment", budget: 200, soExpenditure: 123.31, ifmsExpenditure: 123.31, percentage: 61.66, sourceSystem: "Manual Entry" },
  { id: 12, vertical: "MSBY", schemeName: "Development of Water Bodies", budget: 75, soExpenditure: 45.00, ifmsExpenditure: 45.00, percentage: 60.00, sourceSystem: "Manual Entry" },
  { id: 13, vertical: "MSBY", schemeName: "Animal Welfare Programme", budget: 75, soExpenditure: 65.46, ifmsExpenditure: 65.46, percentage: 87.28, sourceSystem: "Manual Entry" },
  { id: 14, vertical: "MSBY", schemeName: "Storm Water Drainage", budget: 330, soExpenditure: 273.96, ifmsExpenditure: 273.96, percentage: 83.02, sourceSystem: "Manual Entry" },
  
  // Capacity Building
  { id: 15, vertical: "Capacity Building", schemeName: "Capacity Building (SUDA)", budget: 20, soExpenditure: 5.00, ifmsExpenditure: 5.00, percentage: 25.00, sourceSystem: "Manual Entry" },
  { id: 16, vertical: "Capacity Building", schemeName: "Resource Management", budget: 20, soExpenditure: 17.00, ifmsExpenditure: 17.00, percentage: 85.00, sourceSystem: "Manual Entry" },
  { id: 17, vertical: "Capacity Building", schemeName: "IEC", budget: 5, soExpenditure: 3.09, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 18, vertical: "Capacity Building", schemeName: "Rural Urban Transition", budget: 100, soExpenditure: 10.00, ifmsExpenditure: 10.00, percentage: 10.00, sourceSystem: "Manual Entry" },
  
  // AAHAAR
  { id: 19, vertical: "AAHAAR", schemeName: "AAHAAR", budget: 65, soExpenditure: 50.00, ifmsExpenditure: 50.00, percentage: 76.92, sourceSystem: "Manual Entry" },
  
  // Urban Mobility
  { id: 20, vertical: "Urban Mobility", schemeName: "Urban Road Transport (CRUT)", budget: 330, soExpenditure: 189.08, ifmsExpenditure: 189.08, percentage: 57.30, sourceSystem: "Manual Entry" },
  { id: 21, vertical: "Urban Mobility", schemeName: "Odisha Metro Rail Transport (OMRT)", budget: 0.0003, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 22, vertical: "Urban Mobility", schemeName: "OMRT A & S Charges", budget: 5, soExpenditure: 1.25, ifmsExpenditure: 1.25, percentage: 25.00, sourceSystem: "Manual Entry" },
  
  // Samruddha Sahara
  { id: 23, vertical: "Samruddha Sahara", schemeName: "Town Planning (BDA)", budget: 306, soExpenditure: 150.00, ifmsExpenditure: 150.00, percentage: 49.02, sourceSystem: "Manual Entry" },
  { id: 24, vertical: "Samruddha Sahara", schemeName: "Cities as Growth Hub", budget: 102.29, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 25, vertical: "Samruddha Sahara", schemeName: "New City Development", budget: 10, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 26, vertical: "Samruddha Sahara", schemeName: "Sewerage & Drainage Project", budget: 300, soExpenditure: 300.00, ifmsExpenditure: 124.05, percentage: 41.35, sourceSystem: "Manual Entry" },
  { id: 27, vertical: "Samruddha Sahara", schemeName: "Water Front Development", budget: 150, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 28, vertical: "Samruddha Sahara", schemeName: "ULB Governance", budget: 150, soExpenditure: 71.36, ifmsExpenditure: 63.94, percentage: 42.63, sourceSystem: "Manual Entry" },
  { id: 29, vertical: "Samruddha Sahara", schemeName: "Housing Facilities (OUHM)", budget: 100, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 30, vertical: "Samruddha Sahara", schemeName: "EAP assisted by KFW German (OUIDF)", budget: 50, soExpenditure: 50.00, ifmsExpenditure: 50.00, percentage: 100.00, sourceSystem: "Manual Entry" },
  
  // Centrally Sponsored Schemes
  { id: 31, vertical: "CSS", schemeName: "Swachha Bharat Mission", budget: 362, soExpenditure: 101.81, ifmsExpenditure: 36.49, percentage: 10.08, sourceSystem: "SBM Portal (National)" },
  { id: 32, vertical: "CSS", schemeName: "PMAY", budget: 795.59, soExpenditure: 304.56, ifmsExpenditure: 81.06, percentage: 10.19, sourceSystem: "PMAY-Urban Portal (National)" },
  { id: 33, vertical: "CSS", schemeName: "AMRUT 2.0", budget: 949.31, soExpenditure: 765.95, ifmsExpenditure: 620.65, percentage: 65.38, sourceSystem: "Manual Entry" },
  { id: 34, vertical: "CSS", schemeName: "NULM", budget: 6, soExpenditure: null, ifmsExpenditure: null, percentage: null, sourceSystem: "Manual Entry" },
  { id: 35, vertical: "CSS", schemeName: "D-JAY (S)", budget: 4.0015, soExpenditure: 4.00, ifmsExpenditure: 4.00, percentage: 100.00, sourceSystem: "Manual Entry" },
  { id: 36, vertical: "CSS", schemeName: "PM e-Bus Sewa", budget: 39.05, soExpenditure: 20.25, ifmsExpenditure: 10.12, percentage: 25.92, sourceSystem: "Manual Entry" },
];

// Complete KPI-based Schemes Data
export const schemesData: Scheme[] = [
  {
    id: 1,
    name: "BCPPER (Bhubaneswar-Cuttack-Puri-Paradip Economic Region)",
    shortName: "BCPPER",
    nodal: "AS-SK, VC-BDA",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "BDA (Bhubaneswar Development Authority), HUDD – Reforms Section",
    dataFrequency: "Weekly",
    kpis: [
      { id: "bcpper-1", kpiName: "Onboarding of experts to build a comprehensive economic plan", status: "Done", remarks: "Done" },
      { id: "bcpper-2", kpiName: "Preparation and finalization of the BCPPER Vision Plan", status: "Done", remarks: "The same is being finalized" },
      { id: "bcpper-3", kpiName: "Publication Plan of the Vision", status: "In Progress", remarks: "Work in progress" },
      { id: "bcpper-4", kpiName: "Statutory Enacted Framework", status: "In Progress", remarks: "Work in Progress" },
      { id: "bcpper-5", kpiName: "Governance Framework Draft Prepared", status: "In Progress", remarks: "Work in Progress" },
      { id: "bcpper-6", kpiName: "Roles and Responsibilities Defined", status: "In Progress", remarks: "Work in Progress" },
      { id: "bcpper-7", kpiName: "Governance Approved Framework", status: "No", remarks: "No" },
    ]
  },
  {
    id: 2,
    name: "Ring Road",
    shortName: "Ring Road",
    nodal: "AS-SK, VC-BDA",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "BDA (Planning & Land Section), HUDD (Reforms / Urban Strategy)",
    dataFrequency: "Weekly",
    kpis: [
      { id: "rr-1", kpiName: "% of land identification completed", status: "23.54%", numeratorValue: 137.88, numeratorUnit: "Acres identified", denominatorValue: 585.62, denominatorUnit: "Acres required", remarks: "Out of 39.50 KM (585.62 Acres), land for 9.30 KM identified through TP Schemes" },
      { id: "rr-2", kpiName: "% of land Demarcation completed", status: "17.24%", numeratorValue: 6.81, numeratorUnit: "Acres demarcated", denominatorValue: 585.62, denominatorUnit: "Acres required", remarks: "Out of 39.50 KM, land for 6.81 KM demarcated through TP Schemes" },
      { id: "rr-3", kpiName: "% of tenders awarded for ring road", status: "100%", numeratorValue: 2, numeratorUnit: "Tenders awarded", denominatorValue: 2, denominatorUnit: "Total tenders", remarks: "6.538 KM, 2 tenders awarded" },
      { id: "rr-4", kpiName: "% of land acquired", status: "-", remarks: "Data pending" },
      { id: "rr-5", kpiName: "% of road completed", status: "9%", numeratorValue: 6.538, numeratorUnit: "KM completed", denominatorValue: 39.5, denominatorUnit: "Total planned KM" },
      { id: "rr-6", kpiName: "% of Amount Utilized so far", status: "32.30%", numeratorValue: 37.5, numeratorUnit: "Cr spent", denominatorValue: 116.1, denominatorUnit: "Total project cost Cr" },
    ]
  },
  {
    id: 3,
    name: "Riverfront Development",
    shortName: "Riverfront Dev",
    nodal: "AS-SK/VC-BDA",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "BDA (Urban Design & Planning), HUDD – Urban Strategy / OUDH Support Team",
    dataFrequency: "Weekly",
    kpis: [
      { id: "rf-1", kpiName: "SPV or ULB-led authority for long-term riverfront management", status: "Pending" },
      { id: "rf-2", kpiName: "Agency on boarded for preparing DPR", status: "Pending", remarks: "OUDH Team to facilitate" },
      { id: "rf-3", kpiName: "Detailed project designs completed", status: "Pending" },
    ]
  },
  {
    id: 4,
    name: "Brownfield Cities – Keonjhar & Rayagada",
    shortName: "Brownfield Cities",
    nodal: "DMA/AS-SK",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "DMA (Directorate of Municipal Administration), HUDD – Reforms Section",
    dataFrequency: "Weekly",
    kpis: [
      { id: "bf-1", kpiName: "% of ULBs covered with SPV for brownfield cities", status: "In Progress", remarks: "The SPV formation file is being initiated from Reforms Section" },
      { id: "bf-2", kpiName: "Agency onboarded for preparation of Economic Plans", status: "In Progress", remarks: "The same is being finalized" },
      { id: "bf-3", kpiName: "Economic Plans for Keonjhar and Rayagada prepared", status: "Pending", remarks: "Taskforce Team after onboarding will develop the Economic Plan" },
    ]
  },
  {
    id: 5,
    name: "Liveable Cities Mission (More than 25k cities - 45 ULBs)",
    shortName: "Liveable Cities",
    nodal: "DMA/AS-SR",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "DMA, DUDA (post-restructuring), HUDD – Reforms Section",
    dataFrequency: "Weekly",
    kpis: [
      { id: "lc-1", kpiName: "Form State Mission Cell & Empowered Group", status: "Consultation", remarks: "At Consultation stage" },
      { id: "lc-2", kpiName: "District / ULB Cells", status: "Pending", remarks: "After Restructuring of DUDA proposal" },
      { id: "lc-3", kpiName: "Draft institutional & operational frameworks", status: "Consultation", remarks: "At Consultation stage" },
      { id: "lc-4", kpiName: "Define roles / reporting systems", status: "Consultation", remarks: "At Consultation stage" },
      { id: "lc-5", kpiName: "Design Liveability Index parameters", status: "Pending" },
    ]
  },
  {
    id: 6,
    name: "Task Force Committee",
    shortName: "Task Force",
    nodal: "DMA, FA-SB",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "DMA (Urban Governance & Reforms), Finance Dept. (FA-SB)",
    dataFrequency: "Weekly",
    kpis: [
      { id: "tf-1", kpiName: "Formation of Investment Task Force Committee", status: "Consultation", remarks: "Consultation Stage. Inputs of the Task force team needed" },
      { id: "tf-2", kpiName: "Onboard core team & secretariat", status: "In Progress", remarks: "The onboarding is being finalised" },
      { id: "tf-3", kpiName: "Prepare State Investment Plan", status: "Pending", remarks: "Action Plan will be sought from the Taskforce Team after onboarding" },
      { id: "tf-4", kpiName: "Identify key corporate & institutional partners", status: "Pending" },
      { id: "tf-5", kpiName: "Conduct stakeholder consultations", status: "Pending" },
    ]
  },
  {
    id: 7,
    name: "SUJOG",
    shortName: "SUJOG",
    nodal: "DMA-AD",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "DMA Digital (SUJOG Division), HUDD – Digital Governance Cell",
    dataFrequency: "Weekly",
    kpis: [
      { id: "suj-1", kpiName: "Grievances resolved (%)", status: "14%", numeratorValue: 196, numeratorUnit: "Resolved", denominatorValue: 1396, denominatorUnit: "Total registered" },
      { id: "suj-2", kpiName: "Service delivery request resolved (%)", status: "148%", numeratorValue: 127775, numeratorUnit: "Resolved", denominatorValue: 86167, denominatorUnit: "Received", remarks: "Backlog of previous FY resolved" },
      { id: "suj-3", kpiName: "% Service delivery resolved within timeline", status: "Pending" },
    ]
  },
  {
    id: 9,
    name: "PMAY-U (Housing)",
    shortName: "PMAY-U",
    nodal: "AS-SM",
    sourceSystem: "Offline-Manual from PMAY-Urban portal (National)",
    responsibleInstitution: "OUHM (Odisha Urban Housing Mission), HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "pmay-1", kpiName: "Houses sanctioned against application received", status: "15%", numeratorValue: "20,492", numeratorUnit: "Sanctioned (AHP: 2,736 + BLC: 17,756)", denominatorValue: "1,36,927", denominatorUnit: "Applications received" },
      { id: "pmay-2", kpiName: "Houses Completed", status: "1.47%", numeratorValue: 65, numeratorUnit: "Completed", denominatorValue: 4423, denominatorUnit: "Grounded" },
      { id: "pmay-3", kpiName: "Number of AHP projects taken", status: "3", numeratorValue: 3, numeratorUnit: "Projects (2763 units)" },
      { id: "pmay-4", kpiName: "Fund Utilization (%)", status: "0.40%", numeratorValue: 4.899, numeratorUnit: "Cr utilized", denominatorValue: 99.97, denominatorUnit: "Cr received" },
    ]
  },
  {
    id: 10,
    name: "Water Supply (SUJALA)",
    shortName: "SUJALA",
    nodal: "MD-WATCO, EIC-PHEO",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "WATCO (Water Corporation of Odisha), PHEO, HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "ws-1", kpiName: "Household water Supply coverage (%)", status: "98.29%", numeratorValue: "10,97,677", numeratorUnit: "HH with tap connections", denominatorValue: "11,16,750", denominatorUnit: "Total HH in project area" },
      { id: "ws-2", kpiName: "% of Household Water Meters installed", status: "81.64%", numeratorValue: "8,84,362", numeratorUnit: "Meters installed", denominatorValue: "10,83,133", denominatorUnit: "Sanctioned" },
      { id: "ws-3", kpiName: "Cities covered with DFT facilities", status: "90%", numeratorValue: "26 Cities (325 Zones)", denominatorUnit: "29 Cities (516 Zones) targeted" },
      { id: "ws-4", kpiName: "Quality Compliance (%)", status: "97.46%", numeratorValue: "7,21,243", numeratorUnit: "Tests meeting standards", denominatorValue: "7,40,045", denominatorUnit: "Total tests" },
      { id: "ws-5", kpiName: "Grievance Redressal Efficiency (%)", status: "80.21%", numeratorValue: 405, numeratorUnit: "Resolved", denominatorValue: 482, denominatorUnit: "Total registered" },
    ]
  },
  {
    id: 11,
    name: "GARIMA (Sanitation Workers Safety & Welfare)",
    shortName: "GARIMA",
    nodal: "JS-MNS",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "JS-MNS (Jal Shakti – Mission Nirmal Sambal), HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "gar-1", kpiName: "Core Sanitation Workers Covered (%)", status: "97%", numeratorValue: 9075, numeratorUnit: "Workers covered", denominatorValue: 9363, denominatorUnit: "Total identified" },
      { id: "gar-2", kpiName: "Insurance & Health Benefits Coverage", status: "Pending", denominatorValue: 1350, denominatorUnit: "Workers identified" },
      { id: "gar-3", kpiName: "Housing facility provided (PMAY-U convergence)", status: "7%", numeratorValue: 627, numeratorUnit: "Obtained housing", denominatorValue: 9363, denominatorUnit: "Total identified" },
      { id: "gar-4", kpiName: "Procurement of PPE", status: "66%", numeratorValue: 76, numeratorUnit: "ULBs equipped", denominatorValue: 115, denominatorUnit: "Total ULBs", remarks: "Delivery in progress" },
      { id: "gar-5", kpiName: "Procurement of Safety devices", status: "66%", numeratorValue: 77, numeratorUnit: "ERSUs equipped", denominatorValue: 116, denominatorUnit: "Total ERSUs" },
      { id: "gar-6", kpiName: "Distribution of mobile Phone to CSWs (Grade-I)", status: "In Progress", denominatorValue: 895, denominatorUnit: "CSWs to receive", remarks: "Delivery completed in 60 ULBs, SIM activation in 50 ULBs" },
    ]
  },
  {
    id: 12,
    name: "SBM (Swachha Bharat Mission)",
    shortName: "SBM",
    nodal: "AS-BKD",
    sourceSystem: "Offline-Manual from SBM portal (National)",
    responsibleInstitution: "SBM Cell, HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "sbm-1", kpiName: "Sanitation Facility Coverage (%)", status: "58%", numeratorValue: "46,48,811", numeratorUnit: "Population with toilet access", denominatorValue: "80,23,521", denominatorUnit: "Projected population" },
      { id: "sbm-2", kpiName: "Open Defecation Free (ODF) status", status: "99%", numeratorValue: 114, numeratorUnit: "ULBs declared ODF", denominatorValue: 115, denominatorUnit: "Total ULBs" },
      { id: "sbm-3", kpiName: "% of IHHL Constructed", status: "31%", numeratorValue: "26,500", numeratorUnit: "IHHLs constructed", denominatorValue: "84,587", denominatorUnit: "Sanctioned" },
      { id: "sbm-4", kpiName: "% of Community Toilets (seats) constructed", status: "24%", numeratorValue: 919, numeratorUnit: "Seats constructed", denominatorValue: 3701, denominatorUnit: "Sanctioned" },
      { id: "sbm-5", kpiName: "% of Public Toilets (Ordinary) constructed", status: "13%", numeratorValue: 622, numeratorUnit: "Seats constructed", denominatorValue: 4716, denominatorUnit: "Sanctioned" },
      { id: "sbm-6", kpiName: "% of Public Toilets (Aspirational) constructed", status: "35%", numeratorValue: 650, numeratorUnit: "Seats constructed", denominatorValue: 1664, denominatorUnit: "Sanctioned" },
      { id: "sbm-7", kpiName: "% of new Wealth Centres work started (MCC & MRF)", status: "36%", numeratorValue: 20, numeratorUnit: "Work started", denominatorValue: 56, denominatorUnit: "Targeted" },
      { id: "sbm-8", kpiName: "% of new Wealth Centres completed", status: "61%", numeratorValue: 34, numeratorUnit: "Completed", denominatorValue: 56, denominatorUnit: "Targeted" },
      { id: "sbm-9", kpiName: "Door-to-door waste collection coverage", status: "99%", numeratorValue: 2037, numeratorUnit: "Wards covered", denominatorValue: 2055, denominatorUnit: "Total wards" },
      { id: "sbm-10", kpiName: "Segregation at source coverage", status: "99%", numeratorValue: 2030, numeratorUnit: "Wards covered", denominatorValue: 2055, denominatorUnit: "Total wards" },
      { id: "sbm-11", kpiName: "Waste processed out of collected", status: "96%", numeratorValue: 1660.48, numeratorUnit: "MT/day processed", denominatorValue: 1721.71, denominatorUnit: "MT/day generated" },
    ]
  },
  {
    id: 14,
    name: "Urban Mobility",
    shortName: "Urban Mobility",
    nodal: "MD-CRUT",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "CRUT (Capital Region Urban Transport), HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "um-1", kpiName: "Sustainable transportation (%)", status: "43%", numeratorValue: 290, numeratorUnit: "Electric Buses", denominatorValue: 670, denominatorUnit: "Total Fleet" },
      { id: "um-2", kpiName: "Ama Bus Ridership (10% YoY increase target)", status: "1%", numeratorValue: "3,12,567", numeratorUnit: "Avg daily (Nov 2025)", denominatorValue: "3,09,760", denominatorUnit: "Avg daily (Nov 2024)" },
      { id: "um-3", kpiName: "Electric Bus Depot Construction completed", status: "45.40%", numeratorValue: 5, numeratorUnit: "Completed", denominatorValue: 11, denominatorUnit: "Started" },
      { id: "um-4", kpiName: "Buses delivered under PM eBus Seva", status: "Pending", denominatorValue: 400, denominatorUnit: "To be delivered", remarks: "Agreement executed with operators" },
      { id: "um-5", kpiName: "Dash camera installed for safety", status: "Pending", denominatorValue: 530, denominatorUnit: "Targeted buses", remarks: "Meeting with ARAI to be scheduled" },
      { id: "um-6", kpiName: "Digital Transaction", status: "42%", numeratorValue: "₹1,26,68,206", numeratorUnit: "Digital", denominatorValue: "₹3,03,14,482", denominatorUnit: "Total transactions" },
      { id: "um-7", kpiName: "Grievance Redressal Efficiency", status: "100%", numeratorValue: 5808, numeratorUnit: "Resolved (Nov 25)", denominatorValue: 5808, denominatorUnit: "Received (Nov 25)" },
      { id: "um-8", kpiName: "Odisha Yatri Ridership (5K target by 2026)", status: "39%", numeratorValue: 1960, numeratorUnit: "Daily avg rides", denominatorValue: 5000, denominatorUnit: "Target" },
      { id: "um-9", kpiName: "Avg kilometers per bus per day", status: "235.38 km", numeratorValue: "1,40,120", numeratorUnit: "Total KM", denominatorValue: 595, denominatorUnit: "Buses operated" },
      { id: "um-10", kpiName: "Avg passengers per kilometer", status: "2", numeratorValue: "3,09,431", numeratorUnit: "Passengers", denominatorValue: "1,40,120", denominatorUnit: "KM operated" },
      { id: "um-11", kpiName: "% of Women Guides & Captains in CRUT", status: "19%", numeratorValue: 506, numeratorUnit: "Women engaged", denominatorValue: 2666, denominatorUnit: "Total engaged" },
    ]
  },
  {
    id: 15,
    name: "MSBY (Mukhyamantri Sahari Vikas Yojana)",
    shortName: "MSBY",
    nodal: "AS-RKS",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "MSBY Cell, HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "msby-1", kpiName: "% of Project completed", status: "22%", numeratorValue: 91, numeratorUnit: "Completed", denominatorValue: 405, denominatorUnit: "Started" },
      { id: "msby-2", kpiName: "Infrastructure Development Projects Completed", status: "23%", numeratorValue: 65, numeratorUnit: "Completed", denominatorValue: 284, denominatorUnit: "Started" },
      { id: "msby-3", kpiName: "Urban Wage Employment Projects Completed", status: "22%", numeratorValue: 21, numeratorUnit: "Completed", denominatorValue: 96, denominatorUnit: "Started" },
      { id: "msby-4", kpiName: "Water Bodies Projects Completed", status: "19%", numeratorValue: 3, numeratorUnit: "Completed", denominatorValue: 16, denominatorUnit: "Started" },
      { id: "msby-5", kpiName: "Animal Welfare Projects Completed", status: "22%", numeratorValue: 2, numeratorUnit: "Completed", denominatorValue: 9, denominatorUnit: "Started" },
      { id: "msby-6", kpiName: "% of Expenditure incurred", status: "62%", numeratorValue: 681.29, numeratorUnit: "Cr spent", denominatorValue: 1100, denominatorUnit: "Cr approved" },
    ]
  },
  {
    id: 16,
    name: "LED Street Light",
    shortName: "LED Street Light",
    nodal: "DMA",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "DMA, HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "led-1", kpiName: "Brownfield Retrofitting Completed (110 ULB)", status: "79%", numeratorValue: "1,20,770", numeratorUnit: "Retrofitted", denominatorValue: "1,52,531", denominatorUnit: "Planned" },
      { id: "led-2", kpiName: "New Streetlights Installed (Green Field)", status: "47%", numeratorValue: "25,984", numeratorUnit: "Installed", denominatorValue: "55,041", denominatorUnit: "Planned" },
      { id: "led-3", kpiName: "% Functional Street Light across ULBs", status: "Pending" },
    ]
  },
  {
    id: 17,
    name: "Sewerage",
    shortName: "Sewerage",
    nodal: "EIC-OWSSB-BB",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "OWSSB (Sewerage Section), HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "sew-1", kpiName: "% of Sewerage project started", status: "100%", numeratorValue: 1, numeratorUnit: "Started", denominatorValue: 1, denominatorUnit: "Taken" },
      { id: "sew-2", kpiName: "% of Sewerage line Completed in KM", status: "0%", numeratorValue: 0, numeratorUnit: "KM completed" },
    ]
  },
  {
    id: 18,
    name: "Storm Water Drainage",
    shortName: "Storm Drainage",
    nodal: "AS-cum-CE-BM",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "CE-cum-AS (Chief Engineer & Additional Secretary Office), HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "swd-1", kpiName: "% of ULBs engaged agency to prepare DPR", status: "80%", numeratorValue: 92, numeratorUnit: "ULBs engaged", denominatorValue: 115, denominatorUnit: "Total ULBs" },
      { id: "swd-2", kpiName: "% of ULBs finalized their DPR", status: "0%", numeratorValue: 0, numeratorUnit: "Finalized", denominatorValue: 115, denominatorUnit: "Total ULBs" },
      { id: "swd-3", kpiName: "% of ULBs whose DPR is approved", status: "0%", numeratorValue: 0, numeratorUnit: "Approved", denominatorValue: 115, denominatorUnit: "Total ULBs" },
      { id: "swd-4", kpiName: "% of ULBs that started work", status: "80%", numeratorValue: 92, numeratorUnit: "Started", denominatorValue: 115, denominatorUnit: "Total ULBs" },
      { id: "swd-5", kpiName: "% Drainage Completed in KM", status: "0%", remarks: "DPR under preparation" },
    ]
  },
  {
    id: 19,
    name: "FSTP (Faecal Sludge Treatment Plant)",
    shortName: "FSTP",
    nodal: "JS-MNS / EIC-OWSSB-BB",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "OWSSB (Odisha Water Supply & Sewerage Board), HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "fstp-1", kpiName: "Installed FSTP capacity vs sludge generated", status: "175%", numeratorValue: 2.087, numeratorUnit: "MLD installed", denominatorValue: 1.268, denominatorUnit: "MLD generated", remarks: "Installed capacity exceeds generation" },
      { id: "fstp-2", kpiName: "Treated wastewater reused/recycled", status: "100%", numeratorValue: 0.61, numeratorUnit: "MLD reused", denominatorValue: 0.61, denominatorUnit: "MLD generated (120 FSTPs)" },
      { id: "fstp-3", kpiName: "% of functional cesspool vehicle", status: "89%", numeratorValue: 381, numeratorUnit: "Functional (ULB owned)", denominatorValue: 428, denominatorUnit: "Available (ULB owned)" },
      { id: "fstp-4", kpiName: "% of FSTP managed by MSG/TSG", status: "99.1%", numeratorValue: 119, numeratorUnit: "Managed by MSG/TSG", denominatorValue: 120, denominatorUnit: "Total FSTPs" },
    ]
  },
  {
    id: 20,
    name: "SAHAJOG",
    shortName: "SAHAJOG",
    nodal: "AS-SR",
    sourceSystem: "Offline-manual - SAHAJOG App",
    responsibleInstitution: "SAHAJOG Cell, HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "shj-1", kpiName: "Household Profiling Completed", status: "27.16%", numeratorValue: "4,12,099", numeratorUnit: "HH profiled", denominatorValue: "15,17,073", denominatorUnit: "Target (Census 2011)" },
      { id: "shj-2", kpiName: "Eligible beneficiaries with applications", status: "1.01%", numeratorValue: "11,622", numeratorUnit: "Applications submitted", denominatorValue: "11,45,765", denominatorUnit: "Eligible beneficiaries", remarks: "Final figure post 31st Dec after merging pilot data" },
      { id: "shj-3", kpiName: "Eligible beneficiaries linked with govt schemes", status: "11.45%", numeratorValue: 1331, numeratorUnit: "Linked", denominatorValue: 11622, denominatorUnit: "Applications submitted" },
      { id: "shj-4", kpiName: "Beneficiaries Linked with PMAY Scheme", status: "Pending", denominatorValue: "1,75,305", denominatorUnit: "Eligible for PMAY" },
    ]
  },
  {
    id: 21,
    name: "Capacity Building",
    shortName: "Capacity Building",
    nodal: "Dir-OUA, AS-SS",
    sourceSystem: "Offline-Manual",
    responsibleInstitution: "OUA (Odisha Urban Academy)",
    dataFrequency: "Weekly",
    kpis: [
      { id: "cb-1", kpiName: "Annual Action Plan Approved", status: "Yes" },
      { id: "cb-2", kpiName: "% of Training Programme completed", status: "27%", numeratorValue: 18, numeratorUnit: "Sessions conducted", denominatorValue: 66, denominatorUnit: "Sessions planned" },
      { id: "cb-3", kpiName: "% of Personnel Obtained Training", status: "37%", numeratorValue: 2014, numeratorUnit: "Personnel trained", denominatorValue: 5340, denominatorUnit: "Targeted" },
      { id: "cb-4", kpiName: "% of TULIP Interns Engaged", status: "17%", numeratorValue: 86, numeratorUnit: "Engaged", denominatorValue: 500, denominatorUnit: "Target" },
      { id: "cb-5", kpiName: "TULIP Interns with Mentorship", status: "Pending", remarks: "No Mentorship. Only assigned in ULBs and parastatal body" },
    ]
  },
  {
    id: 23,
    name: "Grievances",
    shortName: "Grievances",
    nodal: "AS-SR",
    sourceSystem: "Offline-Manual - Janasunani / Sahar Sathi",
    responsibleInstitution: "GA & PG dept., HUDD",
    dataFrequency: "Weekly",
    kpis: [
      { id: "gr-1", kpiName: "% of grievance resolved", status: "98%", numeratorValue: 406, numeratorUnit: "Resolved", denominatorValue: 414, denominatorUnit: "Received" },
      { id: "gr-2", kpiName: "% of Grievance pending", status: "2%", numeratorValue: 8, numeratorUnit: "Pending", denominatorValue: 414, denominatorUnit: "Received" },
    ]
  },
];

// Key Action Items from Dashboard Meetings
export const actionItems: ActionItem[] = [
  { id: 1, actionItem: "EFC for Housing, ULB Governance, Rural Urban Transition to be expedited", actionBy: "FA-SB", timeline: "22nd August 2025", status: "EFC meeting held. Draft Minutes submitted for approval." },
  { id: 2, actionItem: "Housing Cabinet meeting Note to be prepared", actionBy: "SS-GN, AS-SR", timeline: "22nd August 2025", status: "SFC to be done. Meeting under PS chairmanship to be organised." },
  { id: 3, actionItem: "Road connecting to OUA to be upgraded with WRI support", actionBy: "EIC-OWSSB/Director-OUA", timeline: "31st July 2025", status: "Assigned to BDA. Estimates Rs. 5.76 Cr prepared. DPR by 30.11.2025." },
  { id: 4, actionItem: "Approach road near Bagchi Cancer Centre to be improved", actionBy: "VC-BDA/AS-RKS", timeline: "31st July 2025", status: "BDA yet to submit proposal. Discussed with stakeholders." },
  { id: 5, actionItem: "Rural Urban Transition Policy - Guidelines to be finalized", actionBy: "AS-SK", timeline: "10th August 2025", status: "Finalized. To be approved." },
  { id: 6, actionItem: "Water front Development - DPR review and tender for Mahanadi", actionBy: "AS-SK", timeline: "12th August 2025", status: "Concept Note prepared. DPR review in progress. Tender to be floated." },
  { id: 7, actionItem: "Restructuring of DUDA to be finalised", actionBy: "AS-RKS", timeline: "4th Aug 2025", status: "File with Finance Department for Concurrence." },
  { id: 8, actionItem: "Training Policy to be developed and finalized", actionBy: "Director-OUA", timeline: "30th Oct 2025", status: "Draft Prepared. Under scrutiny." },
  { id: 9, actionItem: "Greater Bhubaneswar modalities to be finalized with Janaagraha", actionBy: "AS-SK", timeline: "22nd Oct 2025", status: "In Progress" },
  { id: 10, actionItem: "All ULBs to have high-end VC Management System", actionBy: "DMA", timeline: "20th Oct 2025", status: "Letter to OCAC issued. VC setup in 115 ULBs by Dec 2025." },
  { id: 11, actionItem: "WATCO and PHEO to ensure 60% Expenditure by Dec 2025", actionBy: "AS-SM", timeline: "31st December 2025", status: "PHEO: 45.68%, WATCO: 54% achieved" },
  { id: 12, actionItem: "80% Expenditure under MSBY to be ensured", actionBy: "AS-RKS", timeline: "22nd December 2025", status: "Action plan being developed" },
  { id: 13, actionItem: "DUDA and Municipal Corporations - Dedicated Tender Cell", actionBy: "AS-RKS", timeline: "14th January 2026", status: "Orientation programme to be organised" },
  { id: 14, actionItem: "AAHAAR - Extending facilities to SVNIRTAR, Olatpur", actionBy: "AS-RKS", timeline: "30th January 2026", status: "In Progress" },
  { id: 15, actionItem: "Ensure mandatory grievance hearing every Monday", actionBy: "AS-SR", timeline: "Ongoing", status: "Directive issued" },
  { id: 16, actionItem: "Achieve 100% fund release. Monthly monitoring required.", actionBy: "FA-SB", timeline: "20th Jan 2026", status: "In Progress" },
];

// Vertical Groupings
export const verticals = [
  { name: "SUJALA", fullName: "Water Supply", color: "bg-blue-500" },
  { name: "Swachha Odisha", fullName: "Sanitation", color: "bg-green-500" },
  { name: "MSBY", fullName: "Mukhyamantri Sahari Vikas Yojana", color: "bg-amber-500" },
  { name: "Urban Mobility", fullName: "Transport & Metro", color: "bg-purple-500" },
  { name: "Samruddha Sahara", fullName: "Urban Development", color: "bg-indigo-500" },
  { name: "Capacity Building", fullName: "Training & Development", color: "bg-teal-500" },
  { name: "CSS", fullName: "Centrally Sponsored Schemes", color: "bg-orange-500" },
];
