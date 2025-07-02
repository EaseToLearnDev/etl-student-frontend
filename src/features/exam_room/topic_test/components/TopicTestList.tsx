import type { TopicTestType } from "../../../shared/types";
import TopicTest from "./TopicTest";

type TopicTestListProps = {
  tests: TopicTestType[];
  infoClickHandler?: () => void;
};

const TopicTestList = ({ tests, infoClickHandler }: TopicTestListProps) => {
  return tests.map((test, index) => (
    <TopicTest key={index} test={test} infoClickHandler={infoClickHandler} />
  ));
};

export default TopicTestList;
