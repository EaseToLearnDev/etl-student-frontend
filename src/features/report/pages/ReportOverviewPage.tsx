// React
import { useEffect } from "react";

// Hooks
import { useReportOverviewStore } from "../hooks/useReportOverviewStore";

// Services
import { loadDashboardData } from "../services/loadDashboardData";

// Components
import BorderedCard from "../../../components/BorderedCard";
import PerformanceBarChart from "../components/PerformanceBarChart";
import PerformancePieChart from "../components/PerformancePieChart";
import EmptyState from "../../../components/EmptyState";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { ReportOverviewSkeleton } from "../../../components/ReportOverviewSkeleton";
import { LuFileChartColumnIncreasing, LuFileQuestion, LuFileScan, LuFileSearch, LuFileSearch2, LuFileText } from "react-icons/lu";
import { usePageTracking } from "../../../hooks/usePageTracking";
import { gtmEvents } from "../../../utils/gtm-events";

const ReportOverviewPage = () => {
  const overviewData = useReportOverviewStore((s) => s.overviewData);
  const setOverviewData = useReportOverviewStore((s) => s.setOverviewData);
  const reset = useReportOverviewStore((s) => s.reset);
  const loading = useLoadingStore((s) => s.loading);

  usePageTracking(gtmEvents.report_overview_page_visit)

  // useEffects
  useEffect(() => {
    reset();
    const fetchData = async () => {
      const list = await loadDashboardData();
      if (list) {
        setOverviewData(list);
      }
    };
    fetchData();
  }, [setOverviewData]);

  // Helper: transform report array into values for chart
  const parseReportValues = (reportArr: any[]) =>
    reportArr?.map((report) => {
      const sliceIndex = report?.name?.indexOf(":");
      if (sliceIndex === -1) return null;

      const slicedValue = report?.name?.slice(sliceIndex + 1).trim();
      const numbers = slicedValue?.split("/");

      return {
        value: Number(numbers?.[0]) || 0,
        display: slicedValue, // "4/20"
        toolTip: String(report?.y), // % value
      };
    }) || [];

  if (loading) return <ReportOverviewSkeleton />;

  if (!parseReportValues || !overviewData)
    return (
      <EmptyState
        title="No overview data available"
        description="No overview data is available yet. Start engaging with courses, tests, or activities to see your summary here!"
        icon={<LuFileSearch className="w-24 h-24" />}
        className="max-w-md"
      />
    );

  return (
    <div className="px-5 pb-5 h-full flex flex-col flex-grow scrollbar-hide overflow-y-auto">
      {overviewData?.map((section, idx) => {
        const lastReportValues = parseReportValues(
          section?.testLastReport
        )?.filter((r) => r !== null);
        const accuracyValues = parseReportValues(section?.testAccuracy)?.filter(
          (r) => r !== null
        );

        return (
          <div className="mt-7" key={idx}>
            <h5>{section.testType}</h5>
            <div className="mt-4 w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Last Performance (Bar Chart) */}
              {section.testLastTestsX?.length > 0 ? (
                <BorderedCard className="min-h-[400px] flex flex-col gap-2">
                  <div>
                    <h6>{section?.lastPerformance}</h6>
                  </div>
                  <PerformanceBarChart
                    labels={section.testLastTestsX || []}
                    values={section.testLastTestsY?.map((t) => t.y) || []}
                    displayValues={
                      section.testLastTestsY?.map((t) => `${t.y}%`) || []
                    }
                    color="#6956e5"
                  />
                </BorderedCard>
              ) : (
                <></>
              )}

              {/* Last Report (Pie Chart) */}
              {lastReportValues?.length > 0 ? (
                <BorderedCard className="min-h-[400px] flex flex-col gap-2">
                  <div>
                    <h6>Last Report</h6>
                    <p className="text-[var(--text-tertiary)]">
                      {section?.testLastTopic}
                    </p>
                  </div>
                  <PerformancePieChart
                    labels={["Correct", "Incorrect", "Un-Attempted"]}
                    values={lastReportValues.map((r) => r.value)}
                    displayValues={lastReportValues.map((r) => r.display)}
                    tooltipValues={lastReportValues.map((r) => r.toolTip)}
                    colors={["#6956e5", "#fb896b", "#f8c07f"]}
                  />
                </BorderedCard>
              ) : (
                <></>
              )}

              {/* Accuracy (Pie Chart) */}
              {accuracyValues?.length > 0 ? (
                <BorderedCard className="min-h-[400px]  flex flex-col gap-2">
                  <div>
                    <h6>Accuracy Of Attempted Questions</h6>
                    <p className="text-[var(--text-tertiary)]">
                      {section?.testLastTopic}
                    </p>
                  </div>
                  <PerformancePieChart
                    labels={["Correct", "Incorrect"]}
                    values={accuracyValues
                      .filter((r) => r !== null)
                      .map((r) => r.value)}
                    displayValues={accuracyValues
                      .filter((r) => r !== null)
                      .map((r) => r.display)}
                    colors={["#6956e5", "#fb896b"]}
                  />
                </BorderedCard>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportOverviewPage;
