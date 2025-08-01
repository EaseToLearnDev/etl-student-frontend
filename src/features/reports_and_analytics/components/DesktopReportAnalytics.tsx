import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import PerformanceReport from "./PerformanceReport";
import RecentTestScores from "./RecentTestScores";
import SubjectReport from "./SubjectReport";

const DesktopReportAnalytics = ({ data }: any) => {
  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex w-full gap-5 overflow-x-hidden">
        <h3 className="!font-bold p-5 md:w-[60%] lg:w-[70%] xl:w-[75%]">
          Overview
        </h3>
        <h3 className="!font-bold p-5 md:w-[40%] lg:w-[30%] xl:w-[25%]">
          Subjects
        </h3>
      </div>
      <div className="mt-5 h-full overflow-y-auto">
        <DesktopChildLayout
          primaryContent={
            <div>
              <div className="max-w-[700px]">
                <PerformanceReport
                  percentage={75}
                  description={`
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti sed fuga amet 
        nostrum eligendi explicabo accusantium error ut itaque cum optio 
        iure dolore doloremque asperiores repudiandae repellendus inventore
        rem, aperiam beatae numquam dicta obcaecati assumenda. Molestiae rerum, 
        maiores labore sequi, quam accusantium dolorem corporis pariatur temporibus
         dolor perferendis incidunt.`}
                />
              </div>
              <RecentTestScores testScores={data.recentTests} />
            </div>
          }
          secondaryContent={
            <div className="flex flex-col gap-5">
              {data.subjectReports.map((item: any, index: number) => (
                <SubjectReport
                  key={index}
                  subject={item.subject}
                  description={item.description}
                  progress={item.progress}
                  strengths={item.strengths}
                  areas_of_improvement={item.areas_of_improvement}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DesktopReportAnalytics;
