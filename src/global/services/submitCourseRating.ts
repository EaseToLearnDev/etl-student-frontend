import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { RatingCreate } from "../api/ratingCreate.api";
import { useRatingCourseStore } from "../hooks/useRatingCourseStore";

export const submitCourseRating = async () => {
  const { rating, remarks, setError } = useRatingCourseStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const { courseId, organisationName } = activeCourse;

  try {
    const data = new FormData();
    data.append("courseId", courseId.toString());
    data.append("courseName", organisationName);
    data.append("rating", rating.toString());
    data.append("remarks", remarks);
    const response = await RatingCreate({ loginId, token, data });

    if (response.responseTxt === "given") {
      setError("You have already given a rating for this course.");
      return null;
    }
    setError(null);
    return response ?? null;
  } catch (error) {
    console.error("Error submitting rating:", error);
    setError("Something went wrong. Please try again later.");
  }
};
