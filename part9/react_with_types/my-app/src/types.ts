interface CourseTypes {
  name: string;
  exerciseCount: number;
}

export interface ContentTypes {
  courseContents: Array<CourseTypes>;
}

export interface HeaderTypes {
  title: string;
}
