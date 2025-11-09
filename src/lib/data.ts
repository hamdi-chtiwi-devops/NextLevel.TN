import type { User, Course, ForumPost, LearningPath } from './types';
import { findImage } from './placeholder-images';

export const mockUser: User = {
  id: 'user-123',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatar: findImage('profile-avatar'),
  role: 'Student',
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Full-Stack Web Development with React & Firebase',
    description: 'Master modern web development by building a real-world application from scratch. Learn React, TypeScript, Firebase, and more.',
    category: 'Web Development',
    instructor: 'Jane Smith',
    instructorId: 'inst-1',
    price: 99.99,
    thumbnail: findImage('course-1'),
    duration: '12 weeks',
    rating: 4.8,
    enrolledStudents: 1250,
    lessons: [
      { id: 'l1-1', title: 'Introduction to React', duration: 25, content: 'Deep dive into React fundamentals...' },
      { id: 'l1-2', title: 'State Management with Hooks', duration: 35, content: 'Learn useState, useEffect, and useContext...' },
      { id: 'l1-3', title: 'Firebase Authentication', duration: 45, content: 'Integrate secure authentication into your app...' },
    ],
  },
  {
    id: '2',
    title: 'Advanced UI/UX Design Principles',
    description: 'Elevate your design skills with advanced principles of user interface and experience. Learn prototyping, user testing, and design systems.',
    category: 'UI/UX Design',
    instructor: 'John Doe',
    instructorId: 'inst-2',
    price: 79.99,
    thumbnail: findImage('course-2'),
    duration: '8 weeks',
    rating: 4.9,
    enrolledStudents: 3400,
    lessons: [
      { id: 'l2-1', title: 'The Psychology of Design', duration: 30, content: 'Understand user behavior...' },
      { id: 'l2-2', title: 'Advanced Prototyping in Figma', duration: 60, content: 'Create interactive prototypes...' },
    ],
  },
  {
    id: '3',
    title: 'Data Science & Machine Learning Bootcamp',
    description: 'A comprehensive guide to data science. Learn Python, Pandas, Scikit-learn and build predictive models.',
    category: 'Data Science',
    instructor: 'Emily White',
    instructorId: 'inst-3',
    price: 149.99,
    thumbnail: findImage('course-3'),
    duration: '20 weeks',
    rating: 4.7,
    enrolledStudents: 850,
    lessons: [
      { id: 'l3-1', title: 'Python for Data Science', duration: 50, content: 'Master Python libraries for data analysis...' },
      { id: 'l3-2', title: 'Building a Recommendation Engine', duration: 75, content: 'Use machine learning to create recommendations...' },
    ],
  },
  {
    id: '4',
    title: 'The Complete Digital Marketing Course',
    description: 'Learn SEO, social media marketing, content marketing, and Google Analytics to grow any business.',
    category: 'Marketing',
    instructor: 'Michael Brown',
    instructorId: 'inst-4',
    price: 49.99,
    thumbnail: findImage('course-4'),
    duration: '6 weeks',
    rating: 4.6,
    enrolledStudents: 5600,
    lessons: [
      { id: 'l4-1', title: 'SEO Fundamentals', duration: 40, content: 'Optimize your website for search engines...' },
    ],
  },
  {
    id: '5',
    title: 'Advanced JavaScript: The Next Level',
    description: 'Dive deep into modern JavaScript, including asynchronous patterns, performance optimization, and advanced concepts.',
    category: 'Web Development',
    instructor: 'Sarah Johnson',
    instructorId: 'inst-5',
    price: 129.99,
    thumbnail: findImage('course-5'),
    duration: '10 weeks',
    rating: 4.8,
    enrolledStudents: 2100,
    lessons: [
      { id: 'l5-1', title: 'Async/Await and Promises', duration: 45, content: 'Master asynchronous JavaScript...' },
    ],
  },
  {
    id: '6',
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Learn to think like a hacker to defend your systems. A practical, hands-on approach to cybersecurity.',
    category: 'Cybersecurity',
    instructor: 'David Wilson',
    instructorId: 'inst-6',
    thumbnail: findImage('course-6'),
    duration: '14 weeks',
    rating: 4.9,
    enrolledStudents: 4200,
    price: 199.99,
    lessons: [
      { id: 'l6-1', title: 'Basics of Cryptography', duration: 55, content: 'Understand encryption and hashing algorithms...' },
    ],
  },
  {
    id: '7',
    title: 'DevOps Essentials: CI/CD with Jenkins & Docker',
    description: 'Automate your development pipeline. Learn how to build, test, and deploy applications seamlessly.',
    category: 'DevOps',
    instructor: 'Linda Green',
    instructorId: 'inst-7',
    price: 119.99,
    thumbnail: findImage('course-7'),
    duration: '10 weeks',
    rating: 4.7,
    enrolledStudents: 1800,
    lessons: [
      { id: 'l7-1', title: 'Introduction to CI/CD', duration: 40, content: 'Learn the core concepts of Continuous Integration...' },
    ],
  },
  {
    id: '8',
    title: 'Cloud Native with Kubernetes',
    description: 'Master container orchestration with Kubernetes. Deploy, scale, and manage containerized applications like a pro.',
    category: 'DevOps',
    instructor: 'James Lee',
    instructorId: 'inst-8',
    thumbnail: findImage('course-8'),
    duration: '16 weeks',
    rating: 4.8,
    enrolledStudents: 2300,
    price: 179.99,
    lessons: [
      { id: 'l8-1', title: 'Kubernetes Architecture', duration: 60, content: 'Understand the components of a Kubernetes cluster...' },
    ],
  },
  {
    id: '9',
    title: 'Python for Everybody',
    description: 'A beginner-friendly introduction to Python programming. No prior experience required.',
    category: 'Development',
    instructor: 'Charles Severance',
    instructorId: 'inst-9',
    thumbnail: findImage('course-9'),
    duration: '12 weeks',
    rating: 4.9,
    enrolledStudents: 10500,
    lessons: [
      { id: 'l9-1', title: 'Your First Python Program', duration: 30, content: 'Write and run your first lines of Python code...' },
    ],
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Chris Green',
    authorId: 'user-456',
    authorAvatar: findImage('avatar-2'),
    timestamp: '2 days ago',
    content: "I'm having trouble with the Firebase security rules for the final project. Can anyone share an example of how they structured theirs?",
    likes: 12,
    replies: [
      {
        id: 'reply-1',
        author: 'Jane Smith',
        authorId: 'inst-1',
        authorAvatar: findImage('avatar-3'),
        timestamp: '2 days ago',
        content: "Great question, Chris! The key is to separate read/write rules based on user roles. I've posted a snippet in the lesson resources. Let me know if that helps!",
        likes: 8,
        replies: [],
      },
      {
        id: 'reply-2',
        author: 'Alex Doe',
        authorId: 'user-123',
        authorAvatar: findImage('profile-avatar'),
        timestamp: '1 day ago',
        content: "Thanks, Jane! That was super helpful. I was trying to do it all in one rule.",
        likes: 3,
        replies: [],
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Sarah Lee',
    authorId: 'user-789',
    authorAvatar: findImage('avatar-4'),
    timestamp: '5 days ago',
    content: "Just finished the course! The final project was challenging but so rewarding. Highly recommend this to anyone looking to get into web dev.",
    likes: 25,
    replies: [],
  },
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'lp-1',
    title: 'Become a Front-End Developer',
    description: 'Master the core technologies of front-end web development with these curated playlists.',
    category: 'Web Development',
    playlists: [
      {
        id: 'pl-1-1',
        title: 'HTML & CSS Crash Course',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbP-K8Y6k22v',
        duration: '11 hours'
      },
      {
        id: 'pl-1-2',
        title: 'JavaScript for Beginners',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbk2qB-R0qkl_z2h-HkO7_AC',
        duration: '10 hours'
      },
      {
        id: 'pl-1-3',
        title: 'React Full Course',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        duration: '12 hours'
      }
    ]
  },
  {
    id: 'lp-2',
    title: 'Cybersecurity Analyst Path',
    description: 'Learn the fundamentals of cybersecurity, from networking to ethical hacking.',
    category: 'Cybersecurity',
    playlists: [
      {
        id: 'pl-2-1',
        title: 'CompTIA Network+ Full Course',
        author: 'Professor Messer',
        url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnkF_6K7sVmmF5Yg3L5iI3sO',
        duration: '22 hours'
      },
      {
        id: 'pl-2-2',
        title: 'Ethical Hacking Full Course',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=Z5AZaYI2b5c',
        duration: '15 hours'
      }
    ]
  },
   {
    id: 'lp-3',
    title: 'DevOps Engineering Path',
    description: 'Master the tools and practices to bridge the gap between development and operations.',
    category: 'DevOps',
    playlists: [
      {
        id: 'pl-3-1',
        title: 'Docker for Beginners',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
        duration: '4 hours'
      },
      {
        id: 'pl-3-2',
        title: 'Kubernetes Course',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
        duration: '8 hours'
      },
      {
        id: 'pl-3-3',
        title: 'Jenkins Full Course',
        author: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=FX322r_G-6k',
        duration: '5 hours'
      }
    ]
  }
];
