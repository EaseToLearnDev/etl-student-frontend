export interface JumpBackInCardType {
  subject: string;
  topicTitle: string;
}

export interface WeekClassTestsList {
  id: number;
  topicTitle: string;
  topicId: number;
  schoolName: string;
  schoolId: number;
  className: string;
  classId: number;
  subject: string;
  subjectId: number;
  teacherId: number;
  teacherName: string;
  classDateName: Date;
  createdDateTime: Date;
}