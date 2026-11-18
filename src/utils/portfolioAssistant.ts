import {
  CERTIFICATIONS,
  EDUCATION,
  PORTFOLIO_PROFILE,
  PROJECTS,
  STACK_GROUPS,
  type Project,
} from '../data/portfolio';

export type AssistantTopic =
  | 'project'
  | 'tool'
  | 'github'
  | 'socials'
  | 'contact'
  | 'resume'
  | 'projects-list'
  | 'stack'
  | 'education'
  | 'bio'
  | 'unknown';

export interface AssistantLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Carries the previous answer's topic so follow-ups like "tell me more" work. */
export interface AssistantContext {
  topic?: AssistantTopic;
  projectSlug?: string;
}

export interface AssistantResponse {
  text: string;
  links?: AssistantLink[];
  topic: AssistantTopic;
  projectSlug?: string;
}

export const SUGGESTED_QUESTIONS: string[] = [
  'Who is Benedict?',
  'What projects has he built?',
  'Does he know Java & React?',
  'How can I contact him?',
];

const MISS_STORAGE_KEY = 'portfolio-assistant-misses';
const MAX_MISSES = 50;

export interface MissEntry {
  query: string;
  count: number;
  lastSeen: number;
}

/**
 * Unanswered questions stay in the visitor's own browser — nothing is sent
 * anywhere. Inspect them from the console with getAssistantMisses().
 */
export function getAssistantMisses(): MissEntry[] {
  try {
    const raw = localStorage.getItem(MISS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MissEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearAssistantMisses(): void {
  try {
    localStorage.removeItem(MISS_STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing to clear.
  }
}

function recordMiss(query: string): void {
  try {
    const entries = getAssistantMisses();
    const existing = entries.find((entry) => entry.query === query);

    if (existing) {
      existing.count += 1;
      existing.lastSeen = Date.now();
    } else {
      entries.unshift({ query, count: 1, lastSeen: Date.now() });
    }

    localStorage.setItem(
      MISS_STORAGE_KEY,
      JSON.stringify(entries.slice(0, MAX_MISSES))
    );
  } catch {
    // Storage unavailable or full — logging is best-effort.
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Whole-word match, so "java" does not fire inside "javascript". */
function hasPhrase(query: string, phrase: string): boolean {
  const pattern = new RegExp(
    `(^|[^a-z0-9])${escapeRegExp(phrase)}([^a-z0-9]|$)`,
    'i'
  );
  return pattern.test(query);
}

function countKeywordHits(
  query: string,
  keywords: Record<string, number>
): number {
  let score = 0;
  for (const [keyword, weight] of Object.entries(keywords)) {
    if (hasPhrase(query, keyword)) {
      score += weight;
    }
  }
  return score;
}

interface ToolMatch {
  toolName: string;
  groupName: string;
  note?: string;
  description: string;
}

function findMentionedTool(query: string): ToolMatch | null {
  for (const group of STACK_GROUPS) {
    for (const tool of group.tools) {
      if (hasPhrase(query, tool.name.toLowerCase())) {
        return {
          toolName: tool.name,
          groupName: group.category,
          note: tool.note,
          description: group.description,
        };
      }
    }
  }
  return null;
}

const PROJECT_ALIASES: Record<string, string> = {
  hdse: 'hds-e',
  'hds-e': 'hds-e',
  hotel: 'hds-e',
  in7sight: 'in7sight',
  'in7sight cbas': 'in7sight',
  cbas: 'in7sight',
  orbit: 'orbit',
  '7ncloud': '7ncloud',
  'portfolio v2': 'portfolio-v2',
  kislap: 'kislap',
  petcha: 'petcha',
  'petsa de putcha': 'petcha',
  panitikan: 'panitikan-quest',
  baybayin: 'panitikan-quest',
  'viral frame': 'viral-frame',
  'sample auto': 'sample-auto',
  automotive: 'sample-auto',
  'sample cafe': 'sample-coffeeshop',
  'sample café': 'sample-coffeeshop',
  coffeeshop: 'sample-coffeeshop',
  'coffee shop': 'sample-coffeeshop',
};

function findMentionedProject(query: string): Project | null {
  for (const [alias, slug] of Object.entries(PROJECT_ALIASES)) {
    if (hasPhrase(query, alias)) {
      const match = PROJECTS.find((project) => project.slug === slug);
      if (match) {
        return match;
      }
    }
  }

  for (const project of PROJECTS) {
    if (hasPhrase(query, project.title.toLowerCase())) {
      return project;
    }
  }

  return null;
}

function projectLinks(project: Project): AssistantLink[] {
  const links: AssistantLink[] = [
    { label: `View ${project.title} details`, href: `/projects/${project.slug}` },
  ];

  if (project.liveUrl) {
    links.push({
      label: 'Open live project',
      href: project.liveUrl,
      external: true,
    });
  }

  return links;
}

function formatProjectSummary(project: Project): AssistantResponse {
  const details: string[] = [
    `${project.title} — ${project.subtitle}.`,
    project.summary,
  ];

  if (project.role) {
    details.push(`Role: ${project.role}.`);
  }
  if (project.status) {
    details.push(`Status: ${project.status}.`);
  }

  details.push(`Purpose: ${project.purpose}`);

  return {
    text: details.join(' '),
    links: projectLinks(project),
    topic: 'project',
    projectSlug: project.slug,
  };
}

/** Longer version served when the visitor asks to hear more about a project. */
function formatProjectDetail(project: Project): AssistantResponse {
  const details = [
    `${project.title} — ${project.subtitle}.`,
    project.purpose,
    project.approach,
    project.features.length > 0
      ? `It brings together: ${project.features.join('; ')}.`
      : '',
  ].filter(Boolean);

  return {
    text: details.join(' '),
    links: projectLinks(project),
    topic: 'project',
    projectSlug: project.slug,
  };
}

function toolResponse(match: ToolMatch): AssistantResponse {
  const noteSuffix = match.note ? ` (${match.note})` : '';
  return {
    text: `Yes — ${match.toolName}${noteSuffix} is listed in his portfolio under "${match.groupName}" (${match.description}).`,
    topic: 'tool',
  };
}

function githubResponse(): AssistantResponse {
  const gh = PORTFOLIO_PROFILE.socials.find(
    (social) => social.platform === 'GitHub'
  );

  return {
    text: `You can view ${PORTFOLIO_PROFILE.nickname}'s GitHub profile at ${gh?.url}.`,
    links: gh
      ? [{ label: 'Open GitHub', href: gh.url, external: true }]
      : undefined,
    topic: 'github',
  };
}

function socialsResponse(): AssistantResponse {
  return {
    text: `${PORTFOLIO_PROFILE.shortName} is active on GitHub, LinkedIn, Facebook, Instagram, and TikTok.`,
    links: PORTFOLIO_PROFILE.socials.map((social) => ({
      label: social.platform,
      href: social.url,
      external: true,
    })),
    topic: 'socials',
  };
}

function contactResponse(): AssistantResponse {
  return {
    text: `${PORTFOLIO_PROFILE.name} is based in ${PORTFOLIO_PROFILE.location}. You can reach him by email at ${PORTFOLIO_PROFILE.email} or by phone at ${PORTFOLIO_PROFILE.phone}.`,
    links: [
      {
        label: 'Compose Email',
        href: PORTFOLIO_PROFILE.gmailComposeUrl,
        external: true,
      },
      { label: `Call ${PORTFOLIO_PROFILE.phone}`, href: PORTFOLIO_PROFILE.phoneHref },
    ],
    topic: 'contact',
  };
}

function resumeResponse(): AssistantResponse {
  return {
    text: `There is currently no downloadable résumé file linked in this portfolio. However, his Orbit workspace includes a résumé generator in development, and you can review his education, certifications, and projects right here.`,
    links: [{ label: 'Explore Orbit', href: '/projects/orbit' }],
    topic: 'resume',
  };
}

function projectsListResponse(deep = false): AssistantResponse {
  const featured = PROJECTS.filter((project) => project.featured);
  const others = PROJECTS.filter((project) => !project.featured);

  if (deep) {
    return {
      text: `The full collection, in order: ${PROJECTS.map(
        (project, index) => `${project.index}. ${project.title} (${project.subtitle})`
      ).join('; ')}.`,
      links: [
        { label: `Browse all ${PROJECTS.length} projects`, href: '/projects' },
      ],
      topic: 'projects-list',
    };
  }

  return {
    text: `His portfolio includes ${PROJECTS.length} projects. Featured on the home page are ${featured
      .map((project) => `${project.title} (${project.subtitle})`)
      .join(' and ')}. The full collection also includes ${others
      .map((project) => project.title)
      .join(', ')}.`,
    links: [{ label: `View all ${PROJECTS.length} projects`, href: '/projects' }],
    topic: 'projects-list',
  };
}

function projectKindsResponse(): AssistantResponse {
  return {
    text: `He builds practical web applications, interactive educational simulations and games, commissioned cloud accounting platforms, personal productivity/mobile apps, local media tools, and business website concepts.`,
    links: [{ label: `Browse all ${PROJECTS.length} projects`, href: '/projects' }],
    topic: 'projects-list',
  };
}

function stackResponse(deep = false): AssistantResponse {
  if (deep) {
    return {
      text: `In full: ${STACK_GROUPS.map(
        (group) =>
          `${group.category} — ${group.tools
            .map((tool) => (tool.note ? `${tool.name} (${tool.note})` : tool.name))
            .join(', ')}`
      ).join('. ')}.`,
      topic: 'stack',
    };
  }

  const summary = STACK_GROUPS.map(
    (group) => `${group.category}: ${group.tools.map((tool) => tool.name).join(', ')}`
  ).join(' · ');

  return {
    text: `${PORTFOLIO_PROFILE.shortName}'s stack spans ${STACK_GROUPS.length} areas — ${summary}.`,
    topic: 'stack',
  };
}

function educationResponse(deep = false): AssistantResponse {
  const currentEdu = EDUCATION[0];
  const certs = CERTIFICATIONS.map(
    (cert) => `${cert.title} (${cert.issuer}, ${cert.year})`
  ).join('; ');

  if (deep) {
    const timeline = EDUCATION.map(
      (item) => `${item.period}: ${item.program}, ${item.school}`
    ).join(' · ');

    return {
      text: `His education, most recent first — ${timeline}. Certifications and awards: ${certs}.`,
      topic: 'education',
    };
  }

  return {
    text: `${PORTFOLIO_PROFILE.name} is a fourth-year ${currentEdu.program} student at ${currentEdu.school} (${currentEdu.period}). He previously studied BS Electrical Engineering at Pamantasan ng Lungsod ng Valenzuela (2023–2024) and TVL-ICT at Sitero Francisco Memorial National High School (2021–2023). Beyond development, he has hands-on IT support and networking foundations (subnetting, routing, Cisco Packet Tracer) and holds certifications/awards including: ${certs}.`,
    topic: 'education',
  };
}

function bioResponse(): AssistantResponse {
  return {
    text: `${PORTFOLIO_PROFILE.name} (${PORTFOLIO_PROFILE.nickname}) is a fourth-year IT student and web and mobile developer based in ${PORTFOLIO_PROFILE.location}. ${PORTFOLIO_PROFILE.heroIntro}`,
    links: [{ label: 'See his projects', href: '/projects' }],
    topic: 'bio',
  };
}

/** Nothing matched a known tool, but the question was about experience. */
function unknownToolResponse(): AssistantResponse {
  const documentedStack = STACK_GROUPS.map(
    (group) =>
      `${group.category} (${group.tools.map((tool) => tool.name).join(', ')})`
  ).join(', ');

  return {
    text: `I don't have information confirming that in ${PORTFOLIO_PROFILE.shortName}'s portfolio data. His documented tools cover ${documentedStack}.`,
    topic: 'stack',
  };
}

interface Scorer {
  topic: AssistantTopic;
  keywords: Record<string, number>;
  respond: (query: string) => AssistantResponse;
}

/**
 * Weights reflect how ambiguous a keyword is. "code" is worth little because
 * "Visual Studio Code" is a tool, not a request for the GitHub repo; "number"
 * is worth little because "number of projects" is about projects.
 */
const SCORERS: Scorer[] = [
  {
    topic: 'contact',
    keywords: {
      email: 3,
      mail: 3,
      contact: 3,
      reach: 2,
      phone: 3,
      call: 2,
      hire: 3,
      message: 2,
      location: 2,
      based: 2,
      where: 1,
      live: 1,
      number: 1,
    },
    respond: contactResponse,
  },
  {
    topic: 'resume',
    keywords: { resume: 4, 'résumé': 4, cv: 4 },
    respond: resumeResponse,
  },
  {
    topic: 'socials',
    keywords: {
      linkedin: 3,
      social: 2,
      instagram: 3,
      facebook: 3,
      tiktok: 3,
    },
    respond: socialsResponse,
  },
  {
    topic: 'github',
    keywords: {
      github: 4,
      'git hub': 4,
      repo: 3,
      repositories: 3,
      code: 1,
    },
    respond: githubResponse,
  },
  {
    topic: 'projects-list',
    keywords: {
      project: 3,
      projects: 3,
      built: 2,
      build: 2,
      work: 1,
      portfolio: 3,
      apps: 2,
      websites: 2,
    },
    respond: (query) =>
      /\b(kind|type|types)\b/.test(query)
        ? projectKindsResponse()
        : projectsListResponse(),
  },
  {
    topic: 'stack',
    keywords: {
      tech: 2,
      stack: 3,
      skill: 3,
      skills: 3,
      tools: 2,
      language: 2,
      languages: 2,
      framework: 2,
      database: 2,
      backend: 2,
      frontend: 2,
      network: 2,
      networking: 3,
    },
    respond: () => stackResponse(),
  },
  {
    topic: 'education',
    keywords: {
      background: 1,
      education: 3,
      school: 3,
      college: 3,
      degree: 3,
      study: 2,
      studying: 2,
      student: 2,
      tesda: 3,
      cert: 3,
      certification: 3,
      award: 3,
      scholarship: 3,
      journey: 2,
      'it support': 3,
      hardware: 2,
    },
    respond: () => educationResponse(),
  },
  {
    topic: 'bio',
    keywords: {
      who: 2,
      ben: 2,
      benedict: 2,
      salazar: 2,
      about: 1,
      'does he do': 2,
      introduce: 2,
      bio: 3,
    },
    respond: bioResponse,
  },
  {
    topic: 'unknown',
    keywords: {
      'does he': 3,
      'has he': 3,
      'experience with': 3,
      know: 3,
      use: 1,
    },
    respond: unknownToolResponse,
  },
];

const FOLLOW_UP_PATTERN =
  /^(more|tell me more|say more|and\?|what else|anything else|go on|continue|keep going|details?|elaborate|why|how so|and (its|his|the|their)|what about)\b/;

function expandTopic(
  topic: AssistantTopic,
  projectSlug?: string
): AssistantResponse {
  switch (topic) {
    case 'project': {
      const project = projectSlug
        ? PROJECTS.find((entry) => entry.slug === projectSlug)
        : undefined;
      return project ? formatProjectDetail(project) : projectsListResponse();
    }
    case 'projects-list':
      return projectsListResponse(true);
    case 'stack':
      return stackResponse(true);
    case 'tool':
      return stackResponse(true);
    case 'education':
      return educationResponse(true);
    case 'contact':
      return contactResponse();
    case 'socials':
      return socialsResponse();
    case 'github':
      return githubResponse();
    case 'resume':
      return resumeResponse();
    case 'bio':
      return bioResponse();
    default:
      return projectsListResponse();
  }
}

export function answerPortfolioQuestion(
  rawInput: string,
  context: AssistantContext = {}
): AssistantResponse {
  const query = rawInput.trim().toLowerCase();

  if (!query) {
    return {
      text: `Ask me about ${PORTFOLIO_PROFILE.shortName}'s projects, technologies, background, education, or contact details.`,
      topic: 'unknown',
    };
  }

  // Follow-ups reuse the previous answer's topic instead of starting over.
  if (
    FOLLOW_UP_PATTERN.test(query) &&
    context.topic &&
    context.topic !== 'unknown'
  ) {
    return expandTopic(context.topic, context.projectSlug);
  }

  // Only treat it as a greeting when the message is essentially just one.
  if (
    query.split(/\s+/).length <= 4 &&
    /^(hi|hello|hey|yo|good morning|good afternoon|good evening)\b/.test(query)
  ) {
    return {
      text: `Hi! I'm ${PORTFOLIO_PROFILE.nickname}'s portfolio assistant. You can ask about his projects, skills and tools, education, certifications, or how to get in touch.`,
      topic: 'bio',
    };
  }

  const matches: {
    score: number;
    order: number;
    build: () => AssistantResponse;
  }[] = [];

  // Naming a project or tool is a strong signal, so it outranks generic intent.
  const project = findMentionedProject(query);
  if (project) {
    matches.push({
      score: 95,
      order: -3,
      build: () => formatProjectSummary(project),
    });
  }

  const tool = findMentionedTool(query);
  if (tool) {
    matches.push({ score: 80, order: -2, build: () => toolResponse(tool) });
  }

  SCORERS.forEach((scorer, index) => {
    const score = countKeywordHits(query, scorer.keywords);
    if (score > 0) {
      matches.push({
        score,
        order: index,
        build: () => scorer.respond(query),
      });
    }
  });

  if (matches.length === 0) {
    recordMiss(query);
    return {
      text: `That information isn't included in ${PORTFOLIO_PROFILE.shortName}'s portfolio data, so I can't answer it accurately. You can ask me about his bio, ${PROJECTS.length} projects, tech stack, education & certifications, or contact details.`,
      topic: 'unknown',
    };
  }

  // Highest score wins; array order only breaks ties.
  matches.sort((a, b) => b.score - a.score || a.order - b.order);
  return matches[0].build();
}
