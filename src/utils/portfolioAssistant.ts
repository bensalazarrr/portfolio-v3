import {
  CERTIFICATIONS,
  EDUCATION,
  PORTFOLIO_PROFILE,
  PROJECTS,
  STACK_GROUPS,
  type Project,
} from '../data/portfolio';

export interface AssistantResponse {
  text: string;
  links?: { label: string; href: string; external?: boolean }[];
}

export const SUGGESTED_QUESTIONS: string[] = [
  'Who is Benedict?',
  'What projects has he built?',
  'Does he know Java & React?',
  'How can I contact him?',
];

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

  const links: AssistantResponse['links'] = [
    { label: `View ${project.title} details`, href: `/projects/${project.slug}` },
  ];
  if (project.liveUrl) {
    links.push({
      label: 'Open live project',
      href: project.liveUrl,
      external: true,
    });
  }

  return {
    text: details.join(' '),
    links,
  };
}

function findMentionedTool(query: string): { toolName: string; groupName: string; note?: string; description: string } | null {
  const normalized = query.toLowerCase();
  for (const group of STACK_GROUPS) {
    for (const tool of group.tools) {
      const escaped = tool.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
      if (pattern.test(normalized)) {
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

function findMentionedProject(query: string): Project | null {
  const normalized = query.toLowerCase();
  const aliasMap: Record<string, string> = {
    hdse: 'hds-e',
    'hds-e': 'hds-e',
    in7sight: 'in7sight',
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
    'sample cafe': 'sample-coffeeshop',
    'sample café': 'sample-coffeeshop',
    coffeeshop: 'sample-coffeeshop',
  };

  for (const [alias, slug] of Object.entries(aliasMap)) {
    if (normalized.includes(alias)) {
      return PROJECTS.find((p) => p.slug === slug) ?? null;
    }
  }

  for (const project of PROJECTS) {
    if (normalized.includes(project.title.toLowerCase())) {
      return project;
    }
  }

  return null;
}

export function answerPortfolioQuestion(rawInput: string): AssistantResponse {
  const q = rawInput.trim().toLowerCase();

  if (!q) {
    return {
      text: `Ask me about ${PORTFOLIO_PROFILE.shortName}'s projects, technologies, background, education, or contact details.`,
    };
  }

  // Greeting
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(q)) {
    return {
      text: `Hi! I'm ${PORTFOLIO_PROFILE.nickname}'s portfolio assistant. You can ask about his projects, skills and tools, education, certifications, or how to get in touch.`,
    };
  }

  // Specific project inquiry
  const matchedProject = findMentionedProject(q);
  if (matchedProject) {
    return formatProjectSummary(matchedProject);
  }

  // Specific tool / technology inquiry (e.g. "Does he have experience with Java?")
  const matchedTool = findMentionedTool(q);
  if (matchedTool) {
    const noteSuffix = matchedTool.note ? ` (${matchedTool.note})` : '';
    return {
      text: `Yes — ${matchedTool.toolName}${noteSuffix} is listed in his portfolio under "${matchedTool.groupName}" (${matchedTool.description}).`,
    };
  }

  // GitHub / LinkedIn / Social links
  if (/\b(github|git hub|repo|repositories|code)\b/.test(q)) {
    const gh = PORTFOLIO_PROFILE.socials.find((s) => s.platform === 'GitHub');
    return {
      text: `You can view ${PORTFOLIO_PROFILE.nickname}'s GitHub profile at ${gh?.url}.`,
      links: gh ? [{ label: 'Open GitHub', href: gh.url, external: true }] : undefined,
    };
  }

  if (/\b(linkedin|social|instagram|facebook|tiktok)\b/.test(q)) {
    return {
      text: `${PORTFOLIO_PROFILE.shortName} is active on GitHub, LinkedIn, Facebook, Instagram, and TikTok.`,
      links: PORTFOLIO_PROFILE.socials.map((s) => ({
        label: s.platform,
        href: s.url,
        external: true,
      })),
    };
  }

  // Contact / Location / Email / Phone
  if (/\b(contact|reach|email|mail|phone|number|call|hire|message|location|where|based|live)\b/.test(q)) {
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
    };
  }

  // Resume / CV
  if (/\b(resume|résumé|cv)\b/.test(q)) {
    return {
      text: `There is currently no downloadable résumé file linked in this portfolio. However, his Orbit workspace includes a résumé generator in development, and you can review his education, certifications, and projects right here.`,
      links: [{ label: 'Explore Orbit', href: '/projects/orbit' }],
    };
  }

  // Projects list / What has he built
  if (/\b(project|projects|built|build|work|portfolio|apps|websites)\b/.test(q)) {
    if (/\b(what kind|type|types)\b/.test(q)) {
      return {
        text: `He builds practical web applications, interactive educational simulations and games, commissioned cloud accounting platforms, personal productivity/mobile apps, local media tools, and business website concepts.`,
        links: [{ label: `Browse all ${PROJECTS.length} projects`, href: '/projects' }],
      };
    }

    const featuredTitles = PROJECTS.filter((p) => p.featured)
      .map((p) => `${p.title} (${p.subtitle})`)
      .join(' and ');
    const others = PROJECTS.filter((p) => !p.featured)
      .map((p) => p.title)
      .join(', ');

    return {
      text: `His portfolio includes ${PROJECTS.length} projects. Featured on the home page are ${featuredTitles}. The full collection also includes ${others}.`,
      links: [{ label: 'View all 11 projects', href: '/projects' }],
    };
  }

  // Technologies / Skills / Stack
  if (/\b(tech|stack|skill|skills|tools|language|languages|framework|database|backend|frontend|network|networking)\b/.test(q)) {
    const summary = STACK_GROUPS.map(
      (g) => `${g.category}: ${g.tools.map((t) => t.name).join(', ')}`
    ).join(' · ');
    return {
      text: `${PORTFOLIO_PROFILE.shortName}'s stack spans 8 areas — ${summary}.`,
    };
  }

  // Education / Certifications / Background / IT Support
  if (/\b(background|education|school|college|degree|study|studying|student|tesda|cert|certification|award|scholarship|journey|it support|hardware)\b/.test(q)) {
    const currentEdu = EDUCATION[0];
    const certs = CERTIFICATIONS.map((c) => `${c.title} (${c.issuer}, ${c.year})`).join('; ');
    return {
      text: `${PORTFOLIO_PROFILE.name} is a fourth-year ${currentEdu.program} student at ${currentEdu.school} (${currentEdu.period}). He previously studied BS Electrical Engineering at Pamantasan ng Lungsod ng Valenzuela (2023–2024) and TVL-ICT at Sitero Francisco Memorial National High School (2021–2023). Beyond development, he has hands-on IT support and networking foundations (subnetting, routing, Cisco Packet Tracer) and holds certifications/awards including: ${certs}.`,
    };
  }

  // Who is Ben / About him
  if (/\b(who|ben|benedict|salazar|about|does he do|introduce|bio)\b/.test(q)) {
    return {
      text: `${PORTFOLIO_PROFILE.name} (${PORTFOLIO_PROFILE.nickname}) is a fourth-year IT student and web and mobile developer based in ${PORTFOLIO_PROFILE.location}. ${PORTFOLIO_PROFILE.heroIntro}`,
      links: [{ label: 'See his projects', href: '/projects' }],
    };
  }

  // Question asking if he knows an unlisted technology (e.g. "Does he know Rust / Swift / Ruby?")
  if (/\b(does he|has he|experience with|know|use)\b/.test(q)) {
    return {
      text: `I don't have information confirming that in ${PORTFOLIO_PROFILE.shortName}'s portfolio data. His documented tools cover Web & Mobile (HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, React Native, Expo), Programming (Java, C, SQL), Databases & Backend (PostgreSQL, Supabase, Firebase, MariaDB, Node.js, Prisma, GraphQL), Dev Tools (Git, GitHub, Docker, XAMPP, Vercel, Netlify), WordPress/Wix, and Cisco Packet Tracer.`,
    };
  }

  // Strict fallback — never invent or hallucinate
  return {
    text: `That information isn't included in ${PORTFOLIO_PROFILE.shortName}'s portfolio data, so I can't answer it accurately. You can ask me about his bio, 11 projects, tech stack, education & certifications, or contact details.`,
  };
}
