import TestScore from "./TestScore/TestScore";

const RecentTestScores = ({ testScores }: any) => {
  return (
    <div>
      <h5 className="p-5 !font-semibold text-center md:text-left">Recent Test Scores</h5>
      <div className="flex flex-col gap-3">
        {testScores.map((item: any, index: number) => (
          <TestScore
            key={index}
            name={item.name}
            type={item.type}
            score={item.score}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTestScores;
