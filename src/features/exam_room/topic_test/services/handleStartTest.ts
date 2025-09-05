import type { NavigateFunction } from "react-router";
import { toQueryString } from "../../../../utils";

interface HandleStartTestParams {
  navigate: NavigateFunction;
  testId: number | string | null;
  testType: number | null;
  classTestId?: string;
}
export const handleStartTest = async ({
  navigate,
  testId,
  testType,
  classTestId,
}: HandleStartTestParams) => {
  if (!testId || !testType) return;

  let params: { testId: string; testType: string; classTestId?: string } = {
    testId: String(testId),
    testType: String(testType),
  };
  if (classTestId !== undefined) params.classTestId = classTestId;
  const queryString = toQueryString(params);
  navigate(`/test-simulator?${queryString}`);
};
