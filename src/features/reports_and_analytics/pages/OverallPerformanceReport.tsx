import { useState } from "react";
import Select from "../../../components/Select";
import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import ScoreCard from "../components/ScoreCard";
import { MdArrowBack } from "react-icons/md";
import { colors, Theme } from "../../../utils/colors";
import { useNavigate } from "react-router";
import cn from "../../../utils/classNames";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import TopicProgress from "../components/TopicProgress";
import SubjectProgress from "../components/SubjectProgress";
import Badge from "../../../components/Badge";

// Base data structure
const dummyData = {
  latestReport: [
    {
      title: "Total Questions",
      value: 90,
    },
    {
      title: "Correct Answers",
      value: 60,
      trend: 4,
    },
    {
      title: "In-Correct Answers",
      value: 20,
      trend: -2,
    },
    {
      title: "Un Attempted",
      value: 10,
      trend: 10,
    },
  ],
  weekly: [
    {
      week: "Week 1",
      timeSpend: 30,
      avg: 60,
      classAvg: 50,
    },
    {
      week: "Week 2",
      timeSpend: 40,
      avg: 50,
      classAvg: 70,
    },
    {
      week: "Week 3",
      timeSpend: 35,
      avg: 55,
      classAvg: 65,
    },
    {
      week: "Week 4",
      timeSpend: 45,
      avg: 62,
      classAvg: 68,
    },
    {
      week: "Week 5",
      timeSpend: 38,
      avg: 58,
      classAvg: 60,
    },
  ],
  strengths: [
    "Human Physiology",
    "Ecology",
    "Genetics",
    "Cell Biology",
    "Evolution",
  ],
  weakness: [
    "Molecular Biology",
    "Genetics",
    "Biochemistry",
    "Microbiology",
    "Immunology",
  ],
  subjectProgress: 76,
  topicProgressList: [
    { topicName: "Human Physiology", total: 70, completed: 55 },
    { topicName: "Ecology", total: 100, completed: 85 },
    { topicName: "Genetics", total: 100, completed: 60 },
    { topicName: "Cell Biology", total: 100, completed: 75 },
    { topicName: "Evolution", total: 100, completed: 80 },
    { topicName: "Molecular Biology", total: 100, completed: 55 },
    { topicName: "Biochemistry", total: 100, completed: 65 },
    { topicName: "Microbiology", total: 100, completed: 50 },
  ],
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

  // Generate lines and legends for the performance trends chart
  const lines = [
    { dataKey: "avg", stroke: chartColors[0], strokeWidth: 2 },
    { dataKey: "classAvg", stroke: chartColors[1], strokeWidth: 2 },
  ];

  const legends = [
    { color: chartColors[0], label: "Your Average Score", dataKey: "avg" },
    { color: chartColors[1], label: "Class Average", dataKey: "classAvg" },
  ];

  const weeklyChartData = dummyData.weekly.map((item, index) => ({
    week: `Week ${index + 1}`,
    avg: item.avg,
    classAvg: item.classAvg,
  }));

  const latestCardsThemes = [
    Theme.Ocean,
    Theme.GreenHaze,
    Theme.Valencia,
    Theme.Neutral,
  ];
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
                  {dummyData.latestReport.map((item, index) => {
                    const sign = (item.trend || 0) > 0 ? "+" : "";
                    const trend = item?.trend ? `${sign}${item.trend}%` : "";
                    const theme = latestCardsThemes[index];
                    return (
                      <ScoreCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        description={trend}
                        theme={theme}
                        showBgColor={false}
                        className="w-full"
                      />
                    );
                  })}
                </div>
              </div>
              {/* Average Score In Tests Sections */}
              <div className="mt-5">
                {/* Bar Chart Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:flex-[0.7] xl:flex-[0.75]">
                    <h5 className="!font-semibold">Average Scores in Tests</h5>
                    <div className="min-w-0">
                      <BarChart
                        data={dummyData.weekly}
                        xDataKey="week"
                        yDataKey="timeSpend"
                        xAxisLabel="Weeks"
                        yAxisLabel="Time"
                        barSize={70}
                        className="w-full"
                        height="350px"
                      />
                    </div>
                  </div>
                  <div className="flex lg:flex-[0.3] xl:flex-[0.25] flex-col gap-5 max-h-[350px]">
                    <SubjectProgress progress={dummyData.subjectProgress} />
                    <TopicProgress topics={dummyData.topicProgressList} />
                  </div>
                </div>
              </div>

              {/* Performance Trends Section */}
              <div className="mt-5">
                {/* Bar Chart Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:flex-[0.7] xl:flex-[0.75]">
                    <h5 className="!font-semibold">Average Scores in Tests</h5>
                    <div className="min-w-0">
                      <LineChart
                        data={weeklyChartData}
                        lines={lines}
                        legends={legends}
                        xDataKey="week"
                        xAxisLabel="Weeks"
                        yAxisLabel="Time"
                        height="350px"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex lg:flex-[0.3] xl:flex-[0.25] flex-col gap-5 max-h-[350px]">
                    <div className="flex flex-col gap-5">
                      <h6>Strengths</h6>
                      <div className="flex flex-wrap gap-2">
                        {dummyData.strengths.map((strength, index) => (
                          <Badge
                            key={index}
                            theme={Theme.Sakura}
                            style="filled"
                          >
                            <span>{strength}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <h6>Areas for Improvement</h6>
                      <div className="flex flex-wrap gap-2">
                        {dummyData.weakness.map((weakness, index) => (
                          <Badge
                            key={index}
                            theme={Theme.Pumpkin}
                            style="filled"
                          >
                            <span>{weakness}</span>
                          </Badge>
                        ))}
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
