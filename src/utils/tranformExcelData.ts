export type FinancialSummaryData = {
  planType: string
  budget: number
  expenditureSO: number
  expenditureIFMS: number
  percent: number
}

export type SchemeBudgetData = {
  vertical: string
  scheme: string
  budget: number
  expenditureSO: number | null
  expenditureIFMS: number | null
  percent: number | null
}

export type KPIData = {
  scheme: string
  kpi: string
  status: string | number | null
  numerator: string | number | null
  denominator: string | number | null
  remarks: string | null
}

export type TransformedData = {
  financial: FinancialSummaryData[]
  schemes: SchemeBudgetData[]
  kpis: KPIData[]
}

export function transformExcelData(
  sheets: Record<string, unknown[]>,
  mockData: TransformedData | null
): TransformedData | null {

  if (!sheets) return mockData

  try {

    const financialRaw =
      (sheets["Financial Progress 2025-26 (In "] || []) as Record<string, unknown>[]

    const schemesRaw =
      (sheets["Scheme-wise Budget vs Expenditu"] || []) as Record<string, unknown>[]

    const kpiRaw =
      (sheets["Scheme  Outcome based Key Perfo"] || []) as Record<string, unknown>[]

    const financial: FinancialSummaryData[] = financialRaw
      .filter((r) => r["Plan Type"] && r["Budget Estimate \n2025-26"])
      .map((r) => ({
        planType: r["Plan Type"] as string,
        budget: Number(r["Budget Estimate \n2025-26"]),
        expenditureSO: Number(r["Expenditure as on 20.12.2025"]) || 0,
        expenditureIFMS: Number(r["__EMPTY"]) || 0,
        percent: Number(r["__EMPTY_1"]) || 0
      }))

    const schemes: SchemeBudgetData[] = schemesRaw
      .filter((r) => typeof r["#"] === "number")
      .map((r) => ({
        vertical: (r["Verticals"] as string) || "",
        scheme: r["Name of the Scheme"] as string,
        budget: Number(r["Budget 2025-26\n(cr.)"]) || 0,
        expenditureSO: r["Expenditure"]
          ? Number(r["Expenditure"])
          : null,
        expenditureIFMS: r["__EMPTY"]
          ? Number(r["__EMPTY"])
          : null,
        percent: r["__EMPTY_1"]
          ? Number(r["__EMPTY_1"])
          : null
      }))

    let currentScheme = ""

    const kpis: KPIData[] = kpiRaw
      .filter((r) => r["KPIs"])
      .map((r) => {

        if (r["SCHEMES / SERVICES / INITIATIVE"]) {
          currentScheme = r["SCHEMES / SERVICES / INITIATIVE"] as string
        }

        return {
          scheme: currentScheme,
          kpi: r["KPIs"] as string,
          status: r["Status"] as string | number | null,
          numerator: r["Unit"] as string | number | null,
          denominator: r["Unit_1"] as string | number | null,
          remarks: r["Remarks"] as string | null
        }
      })

    const result = {
      financial,
      schemes,
      kpis
    }

    if (
      financial.length === 0 &&
      schemes.length === 0 &&
      kpis.length === 0
    ) {
      return mockData
    }

    return result

  } catch (err) {
    console.error("Excel transform failed", err)
    return mockData
  }
}