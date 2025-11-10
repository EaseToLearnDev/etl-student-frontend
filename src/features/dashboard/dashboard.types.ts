export interface JumpBackInCardType {
  subject: string;
  topicTitle: string;
}

export interface WeekClassScheduleList {
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

export interface DashBoardFilterMenuList {
  id: string;
  name: string;
  href?: string;
  parentId?: string;
  [key: string]: any;
}
