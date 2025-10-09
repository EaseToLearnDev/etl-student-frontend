// Types
import { LuFile } from "react-icons/lu";
import EmptyState from "../../../components/EmptyState";
import type { MockTest, TopicTest } from "../types";

// Utils
import {
  normalizeTestData,
  type NormalizedTest,
} from "../utils/normalizeTestData";

// Components
import TestCard from "./TestCard";

type TestCardListProps = {
  tests?: MockTest[] | TopicTest[];
  infoClickHandler?: () => void;
  onClickHandler?: (test: NormalizedTest) => void;
};

const TestCardList = ({
  tests,
  infoClickHandler,
  onClickHandler,
}: TestCardListProps) => {
  if(!tests) return (
    <EmptyState
      title="No test data available"
      description="No tests are available at the moment. Check back later or explore available activities to get started!"
      icon={<LuFile className="w-24 h-24" />}
      className="max-w-md"
    />
  )

  return (
    <div className="flex flex-col gap-4">
      {tests?.map((test, index) => {
        const normalized = normalizeTestData(test);
        return (
          <TestCard
            key={index}
            test={normalized}
            infoClickHandler={infoClickHandler}
            onClickHandler={onClickHandler}
          />
        );
      })}
    </div>
  );
};

export default TestCardList;
