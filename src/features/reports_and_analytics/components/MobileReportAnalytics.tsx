import MobileChildLayout from "../../../layouts/child-layout/components/MobileChildLayout";
import PerformanceReport from "./PerformanceReport";
import RecentTestScores from "./RecentTestScores";
import SubjectReport from "./SubjectReport";

const MobileReportAnalytics = ({ data }: any) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="!font-bold">Overall Report</h3>
      <div className="mt-2">
        <MobileChildLayout
          primaryContent={
            <div className="w-full flex flex-col gap-5">
              <PerformanceReport
                percentage={75}
                description={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Laudantium excepturi quis enim quia quam vitae quod, commodi non?
  Tenetur, sit.`}
              />
              <div className="flex flex-col gap-4">
                <h5 className="text-center !font-semibold">Subjects</h5>
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                  {data.subjectReports.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 snap-start px-2"
                    >
                      <SubjectReport
                        subject={item.subject}
                        description={item.description}
                        progress={item.progress}
                        strengths={item.strengths}
                        areas_of_improvement={item.areas_of_improvement}
                      />
                    </div>
                  ))}
                </div>
                <div className="pb-4">
                  <RecentTestScores testScores={data.recentTests} />
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

export default MobileReportAnalytics;
