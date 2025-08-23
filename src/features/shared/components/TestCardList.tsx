// Types
import type { MockTest, TopicTest } from "../types";

// Utils
import {
  normalizeTestData,
  type NormalizedTest,
} from "../utils/normalizeTestData";

// Components
import TestCard from "./TestCard";

type TestCardListProps = {
  tests: MockTest[] | TopicTest[];
  infoClickHandler?: () => void;
  onClickHandler?: (test: NormalizedTest) => void;
};

const TestCardList = ({
  tests,
  infoClickHandler,
  onClickHandler,
}: TestCardListProps) => {
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
