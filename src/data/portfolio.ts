export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'Facebook' | 'Instagram' | 'TikTok';
  url: string;
  handle: string;
}

export interface HighlightItem {
  label: string;
  title: string;
  detail: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  filterGroup: 'web-apps' | 'commissioned' | 'tools-concepts';
  format: string;
  role?: string;
  status?: string;
  featured: boolean;
  liveUrl?: string;
  summary: string;
  purpose: string;
  approach: string;
  features: string[];
  technologies: string[];
  image: string;
  secondaryImage?: string;
  imageCaption?: string;
  imageNote?: string;
  isPortraitMedia?: boolean;
}

export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  tools: { name: string; note?: string }[];
}

export interface EducationItem {
  period: string;
  program: string;
  school: string;
  current?: boolean;
}

export interface CertificationItem {
  year: string;
  title: string;
  issuer: string;
  kind: 'Certification' | 'Training' | 'Award';
}

/**
 * Portfolio Source of Truth
 * Assets are located in /public/assets/aistudio/ (or swap paths to /images/profile/ and /images/projects/).
 */
export const PORTFOLIO_PROFILE = {
  name: 'John Benedict Salazar',
  shortName: 'Benedict',
  nickname: 'Ben',
  role: 'Developer',
  roleTitle: 'Web & Mobile Developer',
  tagline: 'Practical web experiences. Thoughtfully built.',
  location: 'Valenzuela City, Metro Manila, Philippines',
  email: 'benedictsalazar64@gmail.com',
  phone: '0963 652 7633',
  phoneHref: 'tel:+639636527633',
  gmailComposeUrl:
    'https://mail.google.com/mail/?view=cm&fs=1&to=benedictsalazar64@gmail.com',
  portrait: '/assets/aistudio/Natural_creator_portrait_on_charcoal_gradient_1fd595dc.png',
  portraitAlt: 'Portrait of John Benedict Salazar',
  ogImage: '/assets/aistudio/og_00c62b9f.png',
  resumeUrl: null as string | null,
  heroIntro:
    'I’m a fourth-year IT student and web and mobile developer. I build practical web experiences and interactive applications, with foundational knowledge of networking and computer hardware.',
  aboutHeading: 'Good technology. A clear purpose.',
  aboutParagraphs: [
    "I'm interested in the space where thoughtful design meets useful technology. My work spans web development, interactive applications, UI/UX design, and system development. I'm comfortable working independently or collaborating with a team, and I've contributed to projects involving system design, documentation, and technical problem-solving.",
    'Beyond development, I have hands-on experience in computer assembly, basic hardware and software troubleshooting, printer setup, and Microsoft Office. My networking foundation includes subnetting, routing, and port forwarding, with Cisco Packet Tracer among the tools I use. I also hold a TESDA Computer Systems Servicing NC II certification.',
    "I'm currently a fourth-year Bachelor of Science in Information Technology student at Our Lady of Lourdes College, continuously expanding my knowledge in web and mobile development, networking, and emerging technologies.",
  ],
  highlights: [
    {
      label: 'Building experiences',
      title: 'Web & Mobile Development',
      detail: 'Interfaces, interactive web apps, and mobile tools',
    },
    {
      label: 'Connecting systems',
      title: 'Networking',
      detail: 'Subnetting, routing, port forwarding, Packet Tracer',
    },
    {
      label: 'Solving problems',
      title: 'IT Support',
      detail: 'Computer assembly, troubleshooting, TESDA CSS NC II',
    },
  ] as HighlightItem[],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/bensalazarrr',
      handle: 'github.com/bensalazarrr',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/john-benedict-salazar-45379b444/',
      handle: 'John Benedict Salazar',
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/szzzz.beneddd/',
      handle: 'szzzz.beneddd',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/benneverbeena.10/',
      handle: '@benneverbeena.10',
    },
    {
      platform: 'TikTok',
      url: 'https://www.tiktok.com/@notbnddd',
      handle: '@notbnddd',
    },
  ] as SocialLink[],
};

export const PROJECTS: Project[] = [
  {
    index: '01',
    slug: 'hds-e',
    title: 'HDS-E',
    subtitle: 'A Property Management Simulation',
    category: 'Web application · Simulation',
    filterGroup: 'web-apps',
    format: 'Interactive web application',
    role: 'Project Leader / Full Stack Developer',
    featured: true,
    liveUrl: 'https://hdse.lol',
    summary:
      'An interactive web application that brings hotel front-desk operations and property-management workflows into a learning environment.',
    purpose:
      'Give students a way to become familiar with hotel front-desk operations through a property management simulation.',
    approach:
      'Built the frontend and backend, including database integration. Brings hotel workflows into an interactive web application for the OLLC Hospitality Management Program, with separate student, instructor, and administrator roles.',
    features: [
      'Reservations and guest management',
      'Check-in and check-out workflows',
      'Housekeeping and billing',
      'Role-based access for students and instructors',
    ],
    technologies: [],
    image: '/assets/aistudio/hdse_bcfa32eb.webp',
    imageCaption:
      'HDS-E public sign-in screen with role selection for its property management simulation',
    imageNote:
      'Public welcome screen. Authenticated workflows were not accessed.',
  },
  {
    index: '02',
    slug: 'in7sight',
    title: 'In7Sight: CBAS Learning Hub',
    subtitle: 'A research-based cloud accounting learning hub',
    category: 'Commissioned website · Education',
    filterGroup: 'commissioned',
    format: 'Research-based educational website',
    featured: true,
    liveUrl: 'https://learn-cbas.vercel.app/',
    summary:
      'A research-based digital showcase of how Cloud-Based Accounting Systems support organized records, reliable financial reporting, and regulatory compliance.',
    purpose:
      'Explain how cloud-based accounting supports organized records, reliable financial reporting, and regulatory compliance, while emphasizing accurate data and responsible human verification.',
    approach:
      'Created as part of the first professional client commission; presents cloud accounting research through an educational website and connects visitors to 7nCloud, its companion accounting system.',
    features: [
      'Cloud-based accounting overview',
      'Financial reporting quality and regulatory compliance topics',
      'Emphasis on accurate data and human verification',
      'Connection to the companion 7nCloud accounting system',
    ],
    technologies: [],
    image: '/assets/aistudio/in7sight_f356347c.webp',
    imageCaption:
      'In7Sight CBAS Learning Hub homepage introducing cloud-based accounting',
  },
  {
    index: '03',
    slug: 'orbit',
    title: 'Orbit',
    subtitle: 'One profile. A connected personal workspace.',
    category: 'Personal workspace · In development',
    filterGroup: 'web-apps',
    format: 'Personal workspace application',
    status: 'In development',
    featured: false,
    liveUrl: 'https://orbit.benworks.workers.dev',
    summary:
      'A personal workspace bringing projects, learning, career, and freelance work together around one profile, with a résumé generator and AI assistant.',
    purpose:
      'Bring personal projects, learning, career planning, and freelance work into one connected workspace.',
    approach:
      'Developing Orbit around a shared profile, with spaces for projects, tasks, goals, learning, career history, and freelance work. Includes a résumé generator and AI assistant, and it is online while development continues.',
    features: [
      'Projects, tasks, goals, and learning',
      'Career history and job applications',
      'Freelance clients, proposals, and invoices',
      'Résumé generator and AI assistant',
    ],
    technologies: [],
    image: '/assets/aistudio/orbit_2bdb636f.webp',
    imageCaption:
      'Orbit workspace overview with projects, learning, career, freelance, and AI assistant navigation',
  },
  {
    index: '04',
    slug: '7ncloud',
    title: '7nCloud',
    subtitle: 'Cloud accounting companion to In7Sight',
    category: 'Commissioned application · Accounting',
    filterGroup: 'commissioned',
    format: 'Cloud-based accounting system',
    featured: false,
    liveUrl: 'https://in7sight-cbass.vercel.app/',
    summary:
      'A cloud-based accounting system linked to In7Sight: CBAS Learning Hub, connecting its educational content with an interactive accounting experience.',
    purpose:
      'Provide a companion cloud-based accounting experience for the In7Sight learning hub.',
    approach:
      '7nCloud and In7Sight were developed as part of the first professional client commission. The accounting system is linked to the learning hub to support its introduction to cloud-based accounting.',
    features: [
      'Companion system linked to In7Sight',
      'Cloud accounting experience',
      'Public sign-in and sample-company entry points',
    ],
    technologies: [],
    image: '/assets/aistudio/7ncloud_102c70c3.webp',
    imageCaption:
      '7nCloud public sign-in screen introducing its cloud accounting experience',
    imageNote:
      'Public welcome screen. Authenticated account workflows were not accessed.',
  },
  {
    index: '05',
    slug: 'portfolio-v2',
    title: 'Portfolio V2',
    subtitle: 'A bolder take on this portfolio',
    category: 'Personal website · Design',
    filterGroup: 'web-apps',
    format: 'Personal portfolio website',
    featured: false,
    liveUrl: 'https://portfoliov2.benbuilds.workers.dev',
    summary:
      'A second take on this portfolio, built around bold color, heavy type, and card-based sections that place work, capability, and contact next to each other.',
    purpose:
      'Present the same body of work in a more expressive visual direction than the minimal edition.',
    approach:
      'Reorganizes the site into a bold, card-led layout: an introduction, a profile card, current work, specialty, and project count, with clear paths to work, capability, journey, and contact.',
    features: [
      'Bold, card-based layout',
      'Work, capability, journey, and contact sections',
      'Profile, specialty, and current-work highlights',
      'Responsive web experience',
    ],
    technologies: [],
    image: '/assets/aistudio/Portfoliov2_65ca2930.JPG',
    imageCaption:
      'Portfolio V2 homepage with bold, colorful cards introducing Benedict, his specialty, and current work',
  },
  {
    index: '06',
    slug: 'kislap',
    title: 'Kislap',
    subtitle: 'One QR code, one shared event album',
    category: 'Web application · Events',
    filterGroup: 'web-apps',
    format: 'Event photo-sharing web application',
    featured: false,
    liveUrl: 'https://kislap.benbuilds.workers.dev',
    summary:
      'A web app where event guests scan one QR code and drop their photos into one shared album, with no sign-up.',
    purpose:
      'Keep the photos from an event in one place. Guests scan a QR code at the event and add their pictures to a shared album, instead of photos being scattered across group chats and phones while the host chases everyone for copies.',
    approach:
      'Built around a single QR code: guests scan it at the event, add their photos to one shared album, and each guest gets a folder for their own shots. Made for weddings, birthdays, graduations, org events, and casual celebrations, and contributing needs no sign-up.',
    features: [
      'One QR code guests scan at the event',
      'A single shared album for the whole event',
      'A folder for each guest',
      'No sign-up to contribute',
      'Made for weddings, birthdays, graduations, org events, and casual celebrations',
    ],
    technologies: [],
    image: '/assets/aistudio/kislap_cffdb5ab.JPG',
    imageCaption:
      'Kislap landing page with the headline Scan. Share. Kislap. and an event album preview',
  },
  {
    index: '07',
    slug: 'petcha',
    title: 'Petcha',
    subtitle: 'Personal Deadline & Life Admin App',
    category: 'Mobile application · Testing',
    filterGroup: 'web-apps',
    format: 'Personal deadline & life-admin application',
    status: 'Testing',
    featured: false,
    summary:
      'A personal deadline and life-admin app for organizing responsibilities, tracking important dates, and managing reminders. Currently in testing.',
    purpose:
      'Keep everyday responsibilities, important dates, and reminders organized in one place.',
    approach:
      'Brings upcoming deadlines, recurring reminders, and personal tasks into a mobile interface. Previously called Petsa de Putcha; now in its testing phase.',
    features: [
      'Upcoming deadlines and completion overview',
      'Recurring reminders with categories',
      'Timeline and calendar views',
      'Personal task organization',
    ],
    technologies: [],
    image: '/assets/aistudio/petcha_01750d86.webp',
    secondaryImage: '/assets/aistudio/petcha-reminders_b039c06b.webp',
    imageCaption: 'Petcha mobile home and reminders timeline screens',
    isPortraitMedia: true,
  },
  {
    index: '08',
    slug: 'panitikan-quest',
    title: 'Panitikan Quest',
    subtitle: 'Baybayin mo, Baybayin ko!',
    category: 'Web application · Education',
    filterGroup: 'web-apps',
    format: 'Interactive educational web application',
    role: 'Lead Developer',
    featured: false,
    liveUrl: 'https://panitikanquest.netlify.app/',
    summary:
      'An interactive educational experience that helps students explore and understand Baybayin.',
    purpose:
      'Make learning about Baybayin an interactive experience for students.',
    approach:
      'An educational web application centered on learning Baybayin, pairing the subject with an interactive format.',
    features: [
      'A focus on Baybayin learning',
      'An interactive, browser-based educational experience',
    ],
    technologies: [],
    image: '/assets/aistudio/panitikan_a2705ec1.webp',
    imageCaption:
      'Panitikan Quest homepage with the introduction Our stories. Our script. Your next quest. and illustrated Baybayin cards',
  },
  {
    index: '09',
    slug: 'viral-frame',
    title: 'Viral Frame',
    subtitle: 'A local timestamp clipper',
    category: 'Local tool · Video',
    filterGroup: 'tools-concepts',
    format: 'Local video clipping tool',
    status: 'Completed',
    featured: false,
    summary:
      'A completed local video tool for turning selected timestamps from longer recordings into clips.',
    purpose:
      'Make it easier to select a useful segment from a longer recording and export it as a clip.',
    approach:
      'Users choose the start and end of a recording and export the selection as a vertical video. The local workspace brings source input, processing, results, and saved clips together.',
    features: [
      'Video URL or MP4 upload input',
      'Start and end timestamp selection',
      'Vertical video export',
      'Local processing and clip management',
    ],
    technologies: [],
    image: '/assets/aistudio/viral-frame_93100a59.webp',
    imageCaption: 'Viral Frame local video clipping workspace dashboard',
  },
  {
    index: '10',
    slug: 'sample-auto',
    title: 'Sample Auto',
    subtitle: 'Automotive business website concept',
    category: 'Sample website · Automotive',
    filterGroup: 'tools-concepts',
    format: 'Sample business website',
    status: 'Portfolio demonstration',
    featured: false,
    liveUrl: 'https://sample-auto.vercel.app/',
    summary:
      'A sample website for a local automotive business, presenting workshop services, an auto-parts catalog, and contact information.',
    purpose:
      'Explore how a local automotive business can introduce its services and parts online.',
    approach:
      'Service information, a demonstration parts catalog, and pathways to booking and contact information. A portfolio concept for a fictional business.',
    features: [
      'Workshop service information',
      'Demonstration auto-parts catalog',
      'About and contact pages',
    ],
    technologies: [],
    image: '/assets/aistudio/sample-auto_aa489f2b.webp',
    imageCaption: 'Sample Auto automotive workshop concept landing page',
  },
  {
    index: '11',
    slug: 'sample-coffeeshop',
    title: 'Sample Café',
    subtitle: 'Local coffee shop website concept',
    category: 'Sample website · Coffee shop',
    filterGroup: 'tools-concepts',
    format: 'Sample business website',
    status: 'Portfolio demonstration',
    featured: false,
    liveUrl: 'https://sample-coffeeshop.vercel.app/',
    summary:
      'A sample website for a neighborhood café, with a drinks menu, café story, and visit information.',
    purpose:
      'Explore how a local coffee shop can introduce its identity and offerings online.',
    approach:
      'A fictional neighborhood coffee shop concept, bringing its menu, story, and sample visit details into a business website.',
    features: [
      'Food and drinks menu presentation',
      'Café story and imagery',
      'Sample location and opening hours',
    ],
    technologies: [],
    image: '/assets/aistudio/sample-coffeeshop_32b31f15.webp',
    imageCaption: 'Sample Café specialty coffee website concept',
  },
];

export const STACK_GROUPS: SkillGroup[] = [
  {
    id: 'web-mobile',
    category: 'Web & mobile',
    description:
      'Building interfaces for the web and mobile. Expo is a tool currently being learned and developed with.',
    tools: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'React Native' },
      { name: 'Expo', note: 'Learning' },
    ],
  },
  {
    id: 'programming',
    category: 'Programming',
    description: 'Languages for working through problems and data.',
    tools: [{ name: 'Java' }, { name: 'C' }, { name: 'SQL' }],
  },
  {
    id: 'database-backend',
    category: 'Database & backend',
    description: 'Connecting applications, services, and data.',
    tools: [
      { name: 'PostgreSQL' },
      { name: 'Supabase' },
      { name: 'Firebase' },
      { name: 'MariaDB' },
      { name: 'Node.js' },
      { name: 'Prisma' },
      { name: 'GraphQL' },
    ],
  },
  {
    id: 'dev-tools',
    category: 'Development tools',
    description: 'Version control, local development, and deployment.',
    tools: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'XAMPP' },
      { name: 'Vercel' },
      { name: 'Netlify' },
    ],
  },
  {
    id: 'web-platforms',
    category: 'Web platforms',
    description: 'Creating and maintaining business websites.',
    tools: [{ name: 'WordPress' }, { name: 'Wix' }],
  },
  {
    id: 'networking',
    category: 'Networking',
    description: 'A foundation in subnetting, routing, and port forwarding.',
    tools: [{ name: 'Cisco Packet Tracer' }],
  },
  {
    id: 'ai-assisted',
    category: 'AI-assisted development',
    description:
      'Tools that support the development and problem-solving workflow.',
    tools: [
      { name: 'ChatGPT' },
      { name: 'Codex' },
      { name: 'Claude' },
      { name: 'Claude Code' },
      { name: 'Gemini' },
      { name: 'DeepSeek' },
    ],
  },
  {
    id: 'other-tools',
    category: 'Other tools',
    description:
      'Organizing knowledge, understanding projects, and everyday productivity.',
    tools: [
      { name: 'Obsidian' },
      { name: 'Graphify' },
      { name: 'Microsoft Office' },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    period: '2024 — Present',
    program: 'BS Information Technology',
    school: 'Our Lady of Lourdes College',
    current: true,
  },
  {
    period: '2023 — 2024',
    program: 'BS Electrical Engineering',
    school: 'Pamantasan ng Lungsod ng Valenzuela',
  },
  {
    period: '2021 — 2023',
    program: 'Information and Communication Technology (TVL-ICT)',
    school: 'Sitero Francisco Memorial National High School',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    year: '2026',
    title: 'Introduction to Software Testing',
    issuer: 'Simplilearn SkillUp',
    kind: 'Training',
  },
  {
    year: '2025',
    title: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    kind: 'Training',
  },
  {
    year: '2025',
    title: 'Introduction to Packet Tracer Exam',
    issuer: 'Cisco Networking Academy',
    kind: 'Training',
  },
  {
    year: '2024',
    title: 'Dr. Pio Valenzuela Scholarship Program',
    issuer: 'Scholarship recipient',
    kind: 'Award',
  },
  {
    year: '2023',
    title: 'Computer Systems Servicing NC II',
    issuer: 'TESDA',
    kind: 'Certification',
  },
  {
    year: '2023',
    title: 'Best in ICT',
    issuer: 'TVL-ICT',
    kind: 'Award',
  },
];
