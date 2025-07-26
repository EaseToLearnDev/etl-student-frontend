import { useState } from "react";
import Select from "../../../components/Select";
import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import ScoreCards from "../components/ScoreCards";
import { MdArrowBack, MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { colors, Theme } from "../../../utils/colors";
import { useNavigate } from "react-router";
import cn from "../../../utils/classNames";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

// Base data structure
const baseData = {
  overallCards: [
    {
      title: "Average Score",
      value: 73,
      description: (
        <div>
          <p>5%</p>
          <MdTrendingUp size={16} />
        </div>
      ),
    },
    {
      title: "Test Completed",
      value: 36,
      description: <p>Out of 50</p>,
    },
    {
      title: "Hour Studied",
      value: "48h",
      description: (
        <div>
          <p>2%</p>
          <MdTrendingUp size={16} />
        </div>
      ),
    },
    {
      title: "Courses Attempted",
      value: 3,
      description: (
        <div>
          <p>50%</p>
          <MdTrendingUp size={16} />
        </div>
      ),
    },
  ],
  testTypes: [
    {
      title: "Topic Test",
      dataKey: "topictest",
      currentScore: 85,
      trend: 8,
      weeklyData: [99, 70, 40, 80, 85],
    },
    {
      title: "Mock Test",
      dataKey: "mockTest", 
      currentScore: 20,
      trend: -5,
      weeklyData: [60, 75, 30, 99, 20],
    },
    {
      title: "Learning Mode",
      dataKey: "learningMode",
      currentScore: 70,
      trend: -9,
      weeklyData: [60, 55, 50, 65, 70],
    },
    {
      title: "Competitive Mode",
      dataKey: "compMode",
      currentScore: 89,
      trend: 10,
      weeklyData: [70, 65, 95, 75, 89],
    },
  ],
};

// Generate derived data
const dummyData = {
  overallCards: baseData.overallCards,
  // Generate average scores for bar chart and cards
  averageScores: baseData.testTypes.map(test => ({
    title: test.title,
    marks: test.currentScore,
    trend: test.trend,
  })),
  // Generate trends data
  trends: {
    chartData: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map((week, index) => ({
      week,
      ...baseData.testTypes.reduce((acc, test) => ({
        ...acc,
        [test.dataKey]: test.weeklyData[index]
      }), {})
    })),
    cards: baseData.testTypes.map(test => ({
      title: test.title,
      marks: test.currentScore,
      trend: test.trend,
    })),
  },
};

const OverallPerformanceReport = () => {
  const [isSelectOption, setIsSelectOpen] = useState(false);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const mockSubjectsList = ["Chemistry", "Biology", "Physics"];

  const navigate = useNavigate();
  
  // Define color palette for charts
  const chartColors = [
    colors.ocean.bg.active,
    colors.greenHaze.bg.active,
    colors.sunglow.bg.active,
    colors.sakura.bg.active,
  ];
  
  // Generate lines and legends from base data with assigned colors
  const lines = baseData.testTypes.map((test, index) => ({
    dataKey: test.dataKey,
    stroke: chartColors[index % chartColors.length],
    strokeWidth: 2,
  }));
  
  const legends = baseData.testTypes.map((test, index) => ({
    color: chartColors[index % chartColors.length],
    label: test.title,
    dataKey: test.dataKey,
  }));
  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 px-5">
        <div className="w-full flex items-center gap-4">
          <div
            onClick={() => navigate(-1)}
            className={cn(
              "w-[34px] h-[34px] aspect-square flex justify-center items-center cursor-pointer",
              "border-1 border-[var(--border-primary)] rounded-full hover:bg-[var(--surface-bg-secondary)]"
            )}
          >
            <MdArrowBack size={20} className="text-[var(--text-primary)]" />
          </div>
          <h3 className="!font-bold items-end">Overall Performance Report</h3>
        </div>
        <div className="w-full md:w-fit flex justify-end items-center gap-4">
          <Select
            items={mockSubjectsList}
            isOpen={isSelectOption}
            type="Subject"
            onSelect={setSubjectIndex}
            onToggle={() => setIsSelectOpen((prev) => !prev)}
            selectedIndex={subjectIndex}
            className="w-[150px]"
            dropdownClassName="w-[150px]"
          />
          <span className="text-nowrap">Last 30 days</span>
        </div>
      </div>

      {/* Body */}
      <div className="mt-5 h-full overflow-y-auto overflow-x-hidden">
        <DesktopChildLayout
          primaryContent={
            <div className="flex flex-col gap-5 p-5 max-w-full">
              <div className="flex flex-col gap-5">
                {/* Overall Performance Cards */}
                <h5 className="!font-semibold">Key Notes</h5>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-3">
                  {dummyData.overallCards.map((item, index) => (
                    <ScoreCards
                      key={index}
                      title={item.title}
                      value={item.value}
                      description={item.description}
                      theme={Theme.Ocean}
                      showBgColor={false}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
              {/* Average Score In Tests Sections */}
              <div className="mt-5">
                <div className="flex flex-col items-start gap-5 min-w-0">
                  {/* Bar Chart Section */}
                  <div className="w-full flex flex-col lg:flex-row gap-5 min-w-0">
                    <div className="w-full lg:flex-[0.7] xl:flex-[0.8]">
                      <h5 className="!font-semibold">
                        Average Scores in Tests
                      </h5>
                      <div className="min-w-0">
                        <BarChart
                          data={dummyData.averageScores}
                          xDataKey="title"
                          yDataKey="marks"
                          xAxisLabel="Test Types"
                          yAxisLabel="Marks"
                          barSize={70}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:flex-[0.3] xl:flex-[0.2] lg:max-h-[280px] overflow-x-auto lg:overflow-y-auto lg:pr-2 snap-x snap-mandatory">
                      <div className="flex lg:flex-col gap-4 min-w-max pb-2">
                        {dummyData.averageScores.map((item, index) => {
                          const sign = item.trend > 0 ? "+" : "";
                          return (
                            <div className="min-w-[300px] lg:min-w-full max-w-[350px] lg:max-w-full border-1 border-[var(--border-secondary)] rounded-lg snap-center flex-shrink-0">
                              <ScoreCards
                                key={index}
                                title={item.title}
                                description={
                                  <p className="flex gap-1 items-center">
                                    {`${sign}${item.trend}%`}
                                    {sign === "+" ? (
                                      <MdTrendingUp size={16} />
                                    ) : (
                                      <MdTrendingDown size={16} />
                                    )}
                                  </p>
                                }
                                value={item.marks}
                                showBgColor={false}
                                showBorder={false}
                                className="w-full"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Trends Section */}
              <div className="mt-5">
                <div className="flex flex-col items-start gap-5 min-w-0">
                  {/* Bar Chart Section */}
                  <div className="w-full flex flex-col lg:flex-row gap-5 min-w-0">
                    <div className="w-full lg:flex-[0.7] xl:flex-[0.8]">
                      <h5 className="!font-semibold">Performance Trends</h5>
                      <div className="min-w-0">
                        <LineChart
                          data={dummyData.trends.chartData}
                          lines={lines}
                          legends={legends}
                          xDataKey="week"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:flex-[0.3] xl:flex-[0.2] lg:max-h-[280px] overflow-x-auto lg:overflow-y-auto lg:pr-2 snap-x snap-mandatory">
                      <div className="flex lg:flex-col gap-4 min-w-max pb-2">
                        {dummyData.trends.cards.map((item, index) => {
                          const sign = item.trend > 0 ? "+" : "";
                          const trend = `${sign}${item.trend}%`
                          return (
                            <div className="min-w-[300px] lg:min-w-full max-w-[350px] lg:max-w-full border-1 border-[var(--border-secondary)] rounded-lg snap-center flex-shrink-0">
                              <ScoreCards
                                key={index}
                                title={item.title}
                                description={
                                  <p className="flex gap-1 items-center">
                                    Since last 30 days
                                  </p>
                                }
                                value={trend}
                                showBgColor={false}
                                showBorder={false}
                                className="w-full"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          isSecondaryHidden={true}
        />
      </div>
    </div>
  );
};

export default OverallPerformanceReport;
