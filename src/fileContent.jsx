/**
 * fileContent.jsx
 * Per-file panel content components.
 * Each export matches a label in the fileSheets array in App.jsx.
 */

export function AboutContent() {
  return (
    <div className="mt-6 flex flex-col gap-5 overflow-y-auto pr-1 text-stone-800/80" style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.875rem)', lineHeight: '1.75' }}>

      <p>
        I'm Ayoub, a fullstack software engineer based in Sousse, Tunisia. I've spent
        the past two years building web products end-to-end, and the last year of that
        leading a small team: reviewing code, keeping quality high, and making sure
        things actually ship.
      </p>

      <p>
        My day-to-day stack is Next.js and Supabase, though honestly the tools
        matter less than the problem in front of me. I like understanding the full picture,
        from the database schema to the thing a user clicks on,
        and making sure everything in between is clean and deliberate.
      </p>

      <p>
        Outside of work, I watch football more than I probably should,
        and I share my office with a cat who has strong opinions about my keyboard.
      </p>

      <p>
        I'm open to both full-time roles and freelance projects.
        If you're building something that needs a thoughtful engineer who cares about the craft,
        I'd genuinely like to hear about it.
      </p>

    </div>
  )
}

const projects = [
  {
    name: 'Git-Wiz',
    description: 'Rust CLI that reads your staged diff and generates Conventional Commits via Gemini, Claude, or OpenAI — with an interactive TUI to confirm, edit, or regenerate.',
    stack: ['Rust', 'Tokio', 'cliclack', 'OpenAI', 'Gemini', 'Claude'],
    repo: 'https://github.com/AyoubAchour/Git-Wiz',
  },
  {
    name: 'HypeHub',
    description: 'Scrapes your product URL and generates ready-to-post X and Reddit launch content using GPT-4o-mini, with one-click OAuth posting to X.',
    stack: ['Next.js', 'Convex', 'Clerk', 'OpenAI', 'X API', 'TypeScript'],
    repo: 'https://github.com/AyoubAchour/hypehub',
  },
  {
    name: 'Almindhar Experience',
    description: 'Full-stack platform for exploring Tunisian cultural heritage — bookings, a rewards and badges system, 3D scenes, and an embedded Phaser game.',
    stack: ['Next.js', 'Supabase', 'Three.js', 'Phaser', 'TypeScript'],
    repo: 'https://github.com/AyoubAchour/almindhar-experience',
  },
  {
    name: 'CV System',
    description: 'Parses CVs from PDF with OCR fallback for scanned documents, estimates years of experience from real-world date formats, and ranks candidates with an explainable score breakdown.',
    stack: ['Next.js', 'Tesseract.js', 'PDF.js', 'TypeScript'],
    repo: 'https://github.com/AyoubAchour/cv-system',
  },
]

// Inline GitHub icon — no external library
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[0.9em] w-[0.9em]">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function ProjectsContent() {
  return (
    <div className="mt-5 flex flex-col gap-0 overflow-y-auto pr-1">
      {projects.map((project, i) => (
        <div key={project.name}>
          {/* Divider between items */}
          {i > 0 && <div className="h-px w-full bg-stone-900/8 my-4" />}

          <div className="flex flex-col gap-[0.55em]">
            {/* Name + GitHub link on same row */}
            <div className="flex items-center justify-between gap-3">
              <span
                className="font-semibold text-stone-900/82 leading-tight"
                style={{ fontSize: 'clamp(0.75rem, 1.15vw, 0.92rem)' }}
              >
                {project.name}
              </span>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.4em] text-stone-900/38 hover:text-stone-900/65 transition-colors shrink-0"
                style={{ fontSize: 'clamp(0.6rem, 0.88vw, 0.7rem)' }}
              >
                <GitHubIcon />
                <span className="uppercase tracking-[0.1em]">Repo</span>
              </a>
            </div>

            {/* Description */}
            <p
              className="text-stone-800/68 leading-relaxed"
              style={{ fontSize: 'clamp(0.68rem, 1vw, 0.8rem)' }}
            >
              {project.description}
            </p>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-[0.4em] mt-[0.2em]">
              {project.stack.map(tag => (
                <span
                  key={tag}
                  className="rounded-[2px] border border-stone-900/10 bg-stone-900/4 px-[0.55em] py-[0.15em] text-stone-900/50"
                  style={{ fontSize: 'clamp(0.55rem, 0.8vw, 0.65rem)', letterSpacing: '0.06em' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const workExperience = [
  {
    role: 'Team Lead',
    company: 'Almindhar',
    period: 'Feb 2024 – Present',
    bullets: [
      'Plan feature execution and architecture across the team, translating requirements into clear, actionable work.',
      'Maintain and oversee a Next.js / Supabase production environment hosted on Vercel, keeping quality and deployment stability high.',
    ],
  },
  {
    role: 'Mobile Developer',
    company: 'Freelance',
    period: 'Aug – Nov 2024',
    bullets: [
      'Built a full-stack React Native app for iOS and Android covering event discovery, interactive maps, real-time group chat, and ticket booking.',
      'Implemented state management, offline storage, and push notifications for a smooth cross-platform experience.',
    ],
  },
  {
    role: 'Front-End Developer Intern',
    company: 'Arsela',
    period: 'Jan – May 2023',
    bullets: [
      'Contributed to two Next.js web projects — shipping features and resolving UI bugs in a collaborative team environment.',
    ],
  },
]

const education = [
  {
    degree: 'Computer Engineering',
    school: 'EPI – International Multidisciplinary School',
    period: '2022 – 2025',
  },
  {
    degree: 'Computer Science Licence',
    school: 'Higher Institute of Computer Science, Kairouan',
    period: '2018 – 2022',
  },
]

export function ExperienceContent() {
  return (
    <div className="mt-5 flex flex-col overflow-y-auto pr-1">

      {/* Work */}
      <div className="flex flex-col gap-0">
        {workExperience.map((item, i) => (
          <div key={item.role + item.company}>
            {i > 0 && <div className="h-px w-full bg-stone-900/8 my-4" />}
            <div className="flex flex-col gap-[0.5em]">
              {/* Role + period */}
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className="font-semibold text-stone-900/82 leading-tight"
                  style={{ fontSize: 'clamp(0.75rem, 1.15vw, 0.92rem)' }}
                >
                  {item.role}
                </span>
                <span
                  className="text-stone-900/35 shrink-0 tabular-nums"
                  style={{ fontSize: 'clamp(0.58rem, 0.82vw, 0.68rem)', letterSpacing: '0.04em' }}
                >
                  {item.period}
                </span>
              </div>
              {/* Company */}
              <span
                className="text-stone-900/48 uppercase tracking-[0.12em]"
                style={{ fontSize: 'clamp(0.58rem, 0.82vw, 0.66rem)' }}
              >
                {item.company}
              </span>
              {/* Bullets */}
              <ul className="mt-[0.3em] flex flex-col gap-[0.45em] pl-[0.1em]">
                {item.bullets.map(b => (
                  <li
                    key={b}
                    className="flex gap-[0.6em] text-stone-800/65 leading-relaxed"
                    style={{ fontSize: 'clamp(0.66rem, 0.98vw, 0.78rem)' }}
                  >
                    <span className="mt-[0.45em] h-[3px] w-[3px] shrink-0 rounded-full bg-stone-900/25" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Divider between work and education */}
      <div className="my-5 h-px w-full bg-stone-900/12" />

      {/* Education */}
      <div className="flex flex-col gap-0">
        <p
          className="mb-3 text-stone-900/35 uppercase tracking-[0.22em]"
          style={{ fontSize: 'clamp(0.55rem, 0.78vw, 0.62rem)' }}
        >
          Education
        </p>
        {education.map((item, i) => (
          <div key={item.degree}>
            {i > 0 && <div className="h-px w-full bg-stone-900/8 my-3" />}
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex flex-col gap-[0.25em]">
                <span
                  className="font-semibold text-stone-900/72 leading-tight"
                  style={{ fontSize: 'clamp(0.7rem, 1.05vw, 0.84rem)' }}
                >
                  {item.degree}
                </span>
                <span
                  className="text-stone-900/42"
                  style={{ fontSize: 'clamp(0.58rem, 0.82vw, 0.68rem)' }}
                >
                  {item.school}
                </span>
              </div>
              <span
                className="text-stone-900/32 shrink-0 tabular-nums"
                style={{ fontSize: 'clamp(0.58rem, 0.82vw, 0.68rem)', letterSpacing: '0.04em' }}
              >
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

const skillGroups = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Rust', 'Python', 'Java'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Shadcn/ui', 'Radix UI', 'React Hook Form'],
  },
  {
    label: 'Mobile',
    skills: ['React Native', 'Expo', 'React Navigation', 'NativeWind'],
  },
  {
    label: 'Backend & Data',
    skills: ['Node.js', 'Supabase', 'Convex', 'Clerk'],
  },
  {
    label: 'Document & AI',
    skills: ['Tesseract.js', 'PDF.js', 'OpenAI API'],
  },
  {
    label: 'Tooling',
    skills: ['Git', 'GitHub Actions', 'Vite', 'Electron Forge', 'Jest', 'OAuth 2.0', 'Octokit'],
  },
]

export function SkillsContent() {
  return (
    <div className="mt-5 flex flex-col gap-5 overflow-y-auto pr-1">
      {skillGroups.map(group => (
        <div key={group.label} className="flex flex-col gap-[0.6em]">
          <p
            className="text-stone-900/35 uppercase tracking-[0.22em]"
            style={{ fontSize: 'clamp(0.55rem, 0.78vw, 0.62rem)' }}
          >
            {group.label}
          </p>
          <div className="flex flex-wrap gap-[0.45em]">
            {group.skills.map(skill => (
              <span
                key={skill}
                className="rounded-[2px] border border-stone-900/10 bg-stone-900/4 px-[0.65em] py-[0.25em] text-stone-900/58"
                style={{ fontSize: 'clamp(0.62rem, 0.92vw, 0.74rem)', letterSpacing: '0.04em' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
