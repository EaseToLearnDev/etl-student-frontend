import type { NavigateFunction } from "react-router";
import { toQueryString } from "../../../../utils";

interface HandleStartTestParams {
  navigate: NavigateFunction;
  testId: number | null;
  testType: number | null;
}
export const handleStartTest = async ({
  navigate,
  testId,
  testType,
}: HandleStartTestParams) => {
  if (!testId || !testType) return;

  let params = {
    testId: String(testId),
    testType: String(testType),
  };
  const queryString = toQueryString(params);
  navigate(`/test-simulator?${queryString}`);
};
