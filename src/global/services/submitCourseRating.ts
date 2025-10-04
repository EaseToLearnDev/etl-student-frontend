import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { ToastType } from "../../features/shared/types";
import { RatingCreate } from "../api/ratingCreate.api";
import { useRatingCourseStore } from "../hooks/useRatingCourseStore";
import { useToastStore } from "../hooks/useToastStore";

export const submitCourseRating = async () => {
  const { rating, remarks } = useRatingCourseStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setToast } = useToastStore.getState();

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
      setToast({
        title:
          "You have already submitted your experience with us for this course.",
        type: ToastType.WARNING,
        duration: 5000,
      });
    } else if (response.responseTxt === "failed") {
      setToast({
        title: "Rating Could not be saved.",
        type: ToastType.DANGER,
        duration: 5000,
      });
    } else {
      setToast({
        title: "Thanks for sharing your experience with us.",
        type: ToastType.SUCCESS,
        duration: 5000,
      });
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
    setToast({
      title: "Something went wrong. Please try again later.",
      type: ToastType.DANGER,
      duration: 5000,
    });
  }
};
