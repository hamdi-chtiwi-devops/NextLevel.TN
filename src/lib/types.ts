export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Student' | 'Instructor';
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: 'Student';
}

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  instructorId: string;
  price?: number;
  thumbnail: string;
  duration: string;
  rating: number;
  lessons: Lesson[];
  enrolledStudents: number;
};

export type Lesson = {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl?: string;
  content: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type ForumPost = {
  id: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  replies: ForumPost[];
  likes: number;
};

export type StudentProgress = {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  quizScores: { lessonId: string; score: number }[];
};

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: Course[];
};

export type YouTubePlaylist = {
  id: string;
  title: string;
  author: string;
  url: string;
  duration: string;
};
