// Types
import type { MockTestCategoryType, TopicTestType } from "../types";

// Utils
import { normalizeTestData } from "../utils/normalizeTestData";

// Components
import TestCard from "./TestCard";

type TestCardListProps = {
  tests: MockTestCategoryType | TopicTestType[];
  infoClickHandler?: () => void;
};

const TestCardList = ({ tests, infoClickHandler }: TestCardListProps) => {
  return (
    (tests as MockTestCategoryType)?.testList
      ? (tests as MockTestCategoryType)?.testList
      : (tests as TopicTestType[])
  ).map((test, index) => {
    const normalized = normalizeTestData(test);
    return (
      <TestCard
        key={index}
        test={normalized}
        infoClickHandler={infoClickHandler}
      />
    );
  });
};

export default TestCardList;
