import { Theme } from "../../../../utils/colors";

interface Remark {
  theme?: Theme;
  text?: string;
}
export const generateRemark = (score: number): Remark => {
  let remark: Remark = {};
  if (score >= 80) {
    remark.theme = Theme.GreenHaze;
    remark.text = "Excellent";
  } else if (score < 80 && score >= 70) {
    remark.theme = Theme.Sunglow;
    remark.text = "Good";
  } else {
    remark.theme = Theme.Valencia;
    remark.text = "Need Improvement";
  }
  return remark;
};
