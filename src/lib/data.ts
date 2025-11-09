
import type { User, Course, ForumPost, LearningPath, Project } from './types';
import { findImage } from './placeholder-images';
import { Code, ShieldCheck, Database, Server } from 'lucide-react';

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
    title: 'Become a Full-Stack Web Developer',
    description: 'Master the core technologies of front-end and back-end web development.',
    category: 'Web Development',
    steps: [
        mockCourses.find(c => c.id === '9')!, // Python for Everybody
        mockCourses.find(c => c.id === '5')!, // Advanced JavaScript
        mockCourses.find(c => c.id === '1')!, // Full-Stack with React & Firebase
    ]
  },
  {
    id: 'lp-2',
    title: 'Cybersecurity Analyst Path',
    description: 'Learn the fundamentals of cybersecurity, from networking to ethical hacking.',
    category: 'Cybersecurity',
    steps: [
        mockCourses.find(c => c.id === '6')!, // Ethical Hacking
    ]
  },
   {
    id: 'lp-3',
    title: 'DevOps Engineering Path',
    description: 'Master the tools and practices to bridge the gap between development and operations.',
    category: 'DevOps',
    steps: [
        mockCourses.find(c => c.id === '7')!, // DevOps Essentials
        mockCourses.find(c => c.id === '8')!, // Cloud Native with Kubernetes
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'To-Do List App with React',
    description: 'A classic beginner project to master React state management and component lifecycle.',
    category: 'Web Development',
    thumbnail: findImage('project-1'),
    difficulty: 'Beginner',
    technologies: ['React', 'CSS', 'JavaScript'],
    steps: [
      { title: 'Setup Your React Environment', content: 'Use `create-react-app` to initialize your project. This will give you a solid foundation without worrying about webpack or babel configurations.' },
      { title: 'Create the Main App Component', content: 'Structure your main `App.js` component. This will hold your state and be the parent for all other components.' },
      { title: 'Build the To-Do Item Component', content: 'Create a reusable `TodoItem.js` component that takes a to-do as a prop and displays it. Include a checkbox and a delete button.' },
      { title: 'Manage State with `useState`', content: 'In `App.js`, use the `useState` hook to manage the list of to-do items. Create functions to add, toggle completion, and delete to-dos.' },
      { title: 'Add a Form for New To-Dos', content: 'Create a `TodoForm.js` component with an input field and a submit button. When submitted, it should call the add function in your `App.js` component.' },
      { title: 'Styling Your Application', content: 'Use CSS to make your application look clean and professional. Focus on layout, typography, and user-friendly interactions.' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Weather App with a Public API',
    description: 'Learn to fetch and display data from a third-party API to create a real-world application.',
    category: 'Web Development',
    thumbnail: findImage('project-2'),
    difficulty: 'Beginner',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    steps: [
        { title: 'Find a Free Weather API', content: 'Sign up for a free weather API like OpenWeatherMap or WeatherAPI to get an API key.' },
        { title: 'Structure Your HTML', content: 'Create the basic HTML structure with a search input for the city, a submit button, and a container to display the weather information.' },
        { title: 'Fetch Data with JavaScript', content: 'Write a JavaScript function using `fetch` to make a request to the weather API with the user-provided city and your API key.' },
        { title: 'Display the Weather Data', content: 'Once you receive the data, parse the JSON and dynamically update your HTML to show the temperature, weather condition (e.g., sunny, cloudy), and an icon.' },
        { title: 'Handle Errors Gracefully', content: 'Implement error handling for cases where the city is not found or the API fails, showing a user-friendly message.' },
        { title: 'Add Some Style', content: 'Use CSS to style your weather app. You could even change the background based on the weather condition!' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Portfolio Website with Next.js',
    description: 'Build a fast, SEO-friendly portfolio to showcase your projects using the power of Next.js.',
    category: 'Web Development',
    thumbnail: findImage('project-3'),
    difficulty: 'Intermediate',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    steps: [
        { title: 'Initialize a Next.js App', content: 'Use `create-next-app` to start your project. Choose the App Router and Tailwind CSS options during setup.' },
        { title: 'Create Your Page Structure', content: 'Design your pages: a homepage, an about page, a projects page, and a contact page.' },
        { title: 'Build a Reusable Header and Footer', content: 'Create layout components for your header and footer to ensure a consistent look and feel across all pages.' },
        { title: 'Showcase Your Projects', content: 'On the projects page, create a grid of project cards. Each card should link to a more detailed page (or a live demo).' },
        { title: 'Implement a Contact Form', content: 'On the contact page, build a form. While you can\'t process it without a backend, you can build the UI and validation.' },
        { title: 'Deploy Your Portfolio', content: 'Deploy your static portfolio to a service like Vercel or Netlify for free and share it with the world.' }
    ]
  },
  {
    id: 'proj-4',
    title: 'Real-time Chat App with Socket.IO',
    description: 'Explore the world of WebSockets by building a chat application where messages appear instantly.',
    category: 'Web Development',
    thumbnail: findImage('project-4'),
    difficulty: 'Intermediate',
    technologies: ['Node.js', 'Express', 'Socket.IO'],
    steps: [
      { title: 'Set up the Server', content: 'Create a simple Node.js server with Express. Integrate Socket.IO and listen for connections.' },
      { title: 'Build the Client UI', content: 'Create an HTML page with a message input, a send button, and a list to display chat messages.' },
      { title: 'Establish Connection', content: 'On the client-side, connect to the Socket.IO server. Handle connection and disconnection events.' },
      { title: 'Emit and Receive Messages', content: 'When a user sends a message, emit a "chat message" event to the server. The server then broadcasts this message to all other connected clients.' },
      { title: 'Display Messages', content: 'When the client receives a "chat message" event, dynamically create a new list item and append it to the message list.' },
      { title: 'Add "User is typing" Feature', content: 'Emit an event when a user starts typing and another when they stop. Display a notification to other users.' }
    ]
  },
  {
    id: 'proj-5',
    title: 'Blog with Firebase and Next.js',
    description: 'Build a fully functional blog with a real database using Firebase Firestore for data storage.',
    category: 'Web Development',
    thumbnail: findImage('project-5'),
    difficulty: 'Intermediate',
    technologies: ['Next.js', 'Firebase', 'React'],
    steps: [
      { title: 'Set up Firebase', content: 'Create a new Firebase project and set up Firestore. Enable read/write access in your security rules for development.' },
      { title: 'Connect Next.js to Firebase', content: 'Install the Firebase SDK in your Next.js app and initialize it with your project configuration.' },
      { title: 'Create the Blog Post Page', content: 'Build a dynamic route in Next.js (`/posts/[postId]`) to display individual blog posts.' },
      { title: 'Fetch and Display Posts', content: 'Use `getStaticProps` and `getStaticPaths` to pre-render your blog posts from Firestore, making your site fast and SEO-friendly.' },
      { title: 'Create an Admin Page', content: 'Build a simple password-protected admin page where you can create, edit, and delete posts in Firestore.' },
      { title: 'Add Comments (Optional)', content: 'Allow users to add comments to blog posts, storing them in a sub-collection in Firestore.' }
    ]
  },
  {
    id: 'proj-6',
    title: 'Dockerizing a Node.js Application',
    description: 'Learn the fundamentals of Docker by containerizing a simple Node.js web server.',
    category: 'DevOps',
    thumbnail: findImage('project-6'),
    difficulty: 'Intermediate',
    technologies: ['Docker', 'Node.js', 'Express'],
    steps: [
      { title: 'Create a Simple Node.js App', content: 'Write a basic Express server that responds with "Hello, Docker!" on the root route.' },
      { title: 'Write a Dockerfile', content: 'Create a `Dockerfile` that specifies the base Node image, copies your app files, installs dependencies, and defines the start command.' },
      { title: 'Build the Docker Image', content: 'Use the `docker build` command to create a Docker image from your Dockerfile. Give it a memorable name.' },
      { title: 'Run the Docker Container', content: 'Use the `docker run` command to start a container from your newly created image. Map a port to access your app from your browser.' },
      { title: 'Optimize Your Dockerfile', content: 'Learn to use `.dockerignore` to exclude unnecessary files and optimize layer caching to speed up future builds.' },
      { title: 'Push to Docker Hub', content: 'Create a Docker Hub account and push your image so you can pull and run it anywhere.' }
    ]
  },
  {
    id: 'proj-7',
    title: 'CI/CD Pipeline with Jenkins',
    description: 'Automate the testing and deployment of a simple web app using Jenkins.',
    category: 'DevOps',
    thumbnail: findImage('project-7'),
    difficulty: 'Advanced',
    technologies: ['Jenkins', 'Docker', 'Git'],
    steps: [
      { title: 'Install Jenkins', content: 'Set up a Jenkins server. You can run it in a Docker container for easy setup.' },
      { title: 'Create a Simple Web App', content: 'Have a simple Node.js or Python web application ready in a Git repository (e.g., on GitHub).' },
      { title: 'Create a New Jenkins Job', content: 'Create a new "Pipeline" job in Jenkins and configure it to pull from your Git repository.' },
      { title: 'Write a Jenkinsfile', content: 'Create a `Jenkinsfile` in your repository with stages for Build, Test, and Deploy.' },
      { title: 'Build Stage', content: 'In the build stage, your Jenkinsfile should run commands to install dependencies and build your application (e.g., `npm install`).' },
      { title: 'Test and Deploy Stages', content: 'Add a stage to run your tests (e.g., `npm test`). For deployment, you could build a Docker image and push it to a registry.' }
    ]
  },
  {
    id: 'proj-8',
    title: 'Basic Network Scanner with Python',
    description: 'A beginner-friendly cybersecurity project to learn about network scanning and Python scripting.',
    category: 'Cybersecurity',
    thumbnail: findImage('project-8'),
    difficulty: 'Beginner',
    technologies: ['Python', 'Scapy'],
    steps: [
      { title: 'Setup Your Environment', content: 'Install Python and the Scapy library (`pip install scapy`).' },
      { title: 'Understand ARP', content: 'Learn what an ARP request is and how it\'s used to discover devices on a local network.' },
      { title: 'Craft an ARP Request', content: 'Use Scapy to create an ARP packet that asks "who has" a specific IP address.' },
      { title: 'Create an Ethernet Frame', content: 'Wrap your ARP packet in an Ethernet frame and set the broadcast MAC address as the destination.' },
      { title: 'Send the Packet and Receive Responses', content: 'Use Scapy\'s `srp` function to send the packet and capture any responses from active devices on the network.' },
      { title: 'Parse and Display Results', content: 'Iterate through the answered and unanswered responses to print a list of all IP and MAC addresses found on the network.' }
    ]
  },
  {
    id: 'proj-9',
    title: 'URL Shortener with Node.js',
    description: 'Build your own URL shortening service like Bitly or TinyURL.',
    category: 'Web Development',
    thumbnail: findImage('project-9'),
    difficulty: 'Intermediate',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    steps: [
      { title: 'Setup Node.js and Database', content: 'Initialize a Node.js project and connect it to a MongoDB database (local or cloud).' },
      { title: 'Create the API Endpoint', content: 'Build a POST endpoint that accepts a long URL. Generate a unique short code for it.' },
      { title: 'Store the URL Mapping', content: 'Save the mapping between the short code and the original long URL in your MongoDB database.' },
      { title: 'Create the Redirect Endpoint', content: 'Build a GET endpoint that takes a short code (e.g., `/aB1cD2e`).' },
      { title: 'Look up and Redirect', content: 'In the GET endpoint, look up the short code in the database. If found, redirect the user to the original long URL. If not, return a 404 error.' },
      { title: 'Build a Simple Frontend', content: 'Create a simple HTML form to allow users to paste a long URL and get their shortened URL back.' }
    ]
  },
  {
    id: 'proj-10',
    title: 'E-commerce Frontend with React',
    description: 'Build the frontend for an e-commerce site, focusing on product display and a shopping cart.',
    category: 'Web Development',
    thumbnail: findImage('project-10'),
    difficulty: 'Intermediate',
    technologies: ['React', 'React Router', 'Context API'],
    steps: [
      { title: 'Project Setup', content: 'Initialize a new React project using `create-react-app` and install `react-router-dom` for routing.' },
      { title: 'Create Pages', content: 'Set up routes and components for the main pages: a product listing page, a product detail page, and a shopping cart page.' },
      { title: 'Product Listing Page', content: 'Create mock product data (or use a fake store API). Map over the data to display a grid of product cards.' },
      { title: 'Product Detail Page', content: 'When a user clicks on a product, navigate them to a page showing more details about that specific product.' },
      { title: 'Shopping Cart with Context API', content: 'Use React\'s Context API to create a global state for the shopping cart. Create functions to add items, remove items, and update quantities.' },
      { title: 'Display the Cart', content: 'On the cart page, display the items from the context, showing the total price and allowing users to adjust their order.' }
    ]
  }
];