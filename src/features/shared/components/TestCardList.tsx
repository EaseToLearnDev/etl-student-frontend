import type { MockTestCategoryType, TopicTestType } from "../types";
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
  ).map((test, index) => (
    <TestCard key={index} test={test} infoClickHandler={infoClickHandler} />
  ));
};

export default TestCardList;
