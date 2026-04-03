import { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import CoffeeCup from './CoffeeCup'
import Maxwell from './Maxwell'
import { AboutContent, ProjectsContent, ExperienceContent, SkillsContent } from './fileContent'

const fileSheets = [
  { label: 'About', color: '#f7f1e5' },
  { label: 'Projects', color: '#f2eadb' },
  { label: 'Experience', color: '#ece2d1' },
  { label: 'Skills', color: '#e7dcc9' },
]

const fileContentMap = {
  About: AboutContent,
  Projects: ProjectsContent,
  Experience: ExperienceContent,
  Skills: SkillsContent,
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredFileIndex, setHoveredFileIndex] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const walletState = isOpen ? 'open' : 'closed'
  const sharedEase = [0.22, 1, 0.36, 1]
  // Tab dimensions
  const tabHeightPx = 30
  const tabWidthPct = 14    // % of card width
  const tabSpacingPct = 16  // % gap between tab starts
  const tabBaseRightPct = 2 // % from right edge for tab 1 (index 0 = About)

  const isFileSelected = selectedFile !== null

  // Close file panel whenever the wallet closes
  useEffect(() => {
    if (!isOpen) setSelectedFile(null)
  }, [isOpen])

  // Escape key closes the file panel
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedFile(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleFileClick = (index) => {
    if (!isOpen) return
    setSelectedFile(prev => prev === index ? null : index)
  }

  // ─── Variants ──────────────────────────────────────────────────────────────

  const shadowVariants = shouldReduceMotion
    ? {
        closed: { opacity: 0.12, scaleX: 1 },
        open:   { opacity: 0.16, scaleX: 1.08 },
      }
    : {
        closed: { opacity: 0.12, scaleX: 1, scaleY: 1 },
        open:   { opacity: 0.18, scaleX: 1.18, scaleY: 1.08, y: 10 },
      }

  const shellVariants = shouldReduceMotion
    ? {
        closed: { y: 0 },
        open:   { y: -24 },
      }
    : {
        closed: { y: 0, z: 0, scale: 1 },
        open:   { y: -26, z: -4, scale: 0.992 },
      }

  const frontPanelVariants = shouldReduceMotion
    ? {
        closed: { y: 0, opacity: 1 },
        open:   { y: 96, opacity: 1 },
      }
    : {
        closed: { y: 0, z: 28, scale: 1 },
        open:   { y: 108, z: 10, scale: 0.997 },
      }

  const fileVariants = {
    closed: shouldReduceMotion
      ? { y: 18, opacity: 0 }
      : { y: 34, opacity: 0, scale: 0.985 },
    open: (index) =>
      shouldReduceMotion
        ? {
            y: -14 - index * 18,
            opacity: 1,
            transition: { duration: 0.2, delay: index * 0.03, ease: 'easeOut' },
          }
        : {
            y: -14 - index * 22,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.46, delay: 0.14 + index * 0.06, ease: sharedEase },
          },
  }

  const hoverTransition = shouldReduceMotion
    ? { duration: 0.15, ease: 'easeOut' }
    : { duration: 0.22, ease: sharedEase }

  const shellTransition = shouldReduceMotion
    ? { duration: 0.24, ease: 'easeOut' }
    : { duration: 0.58, ease: sharedEase }

  const frontPanelTransition = shouldReduceMotion
    ? { duration: 0.24, ease: 'easeOut' }
    : { duration: 0.62, ease: sharedEase }

  // Wallet slides to lower-left + shrinks when a file is pulled out
  const walletPullAnimate = isFileSelected && !shouldReduceMotion
    ? isMobile
      ? { x: 0, y: '5vh', scale: 0.78 }
      : { x: '-22vw', y: '10vh', scale: 0.82 }
    : { x: 0, y: 0, scale: 1 }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <main className="wood-surface min-h-screen overflow-hidden text-stone-900">

      {/* ── Wallet section ── */}
      <motion.section
        animate={walletPullAnimate}
        transition={{ duration: 0.62, ease: sharedEase }}
        className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-10 md:px-10"
        style={{ paddingTop: '28vh' }}
      >
        <div className="w-full max-w-5xl perspective-(--perspective-folder)">
          <div className="relative mx-auto aspect-[11/9] w-full max-w-[46rem] transform-3d select-none">

            {/* Drop shadow */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={walletState}
              variants={shadowVariants}
              transition={shellTransition}
              className="absolute inset-x-[13%] bottom-[8%] h-[12%] rounded-[999px] bg-stone-900/12 blur-2xl"
            />

            {/* Wallet shell (amber folder body) */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={walletState}
              variants={shellVariants}
              transition={shellTransition}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              className="absolute inset-x-[8.5%] top-[20.5%] h-[60%]"
            >
              <div className="absolute right-[1.1%] top-[-8%] h-[10.5%] w-[15.5%] rounded-t-[3px] border-x border-t border-amber-950/12 bg-[#d6a24b] sm:w-[12.75%]" />
              <div className="absolute inset-0 rounded-[4px] border border-amber-950/12 bg-[#d6a24b] shadow-[0_16px_28px_rgba(100,71,18,0.1)]" />
            </motion.div>

            {/* ── File cards + tabs ── */}
            <div
              id="wallet-files"
              aria-hidden="true"
              className={`absolute inset-x-[9%] top-[27.75%] z-30 h-[39%] ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* File card bodies */}
              {fileSheets.map((sheet, index) => {
                const fileZIndex = fileSheets.length - index
                const isThisSelected = isFileSelected && selectedFile === index

                return (
                  <motion.div
                    key={sheet.label}
                    custom={index}
                    initial={false}
                    animate={walletState}
                    variants={fileVariants}
                    style={{ zIndex: fileZIndex, willChange: 'transform, opacity' }}
                    className="absolute inset-x-0 bottom-0 h-[80%]"
                  >
                    <motion.div
                      onHoverStart={() => { if (!isThisSelected) setHoveredFileIndex(index) }}
                      onHoverEnd={() => setHoveredFileIndex(null)}
                      onClick={() => handleFileClick(index)}
                      whileHover={isOpen && !isThisSelected ? { y: -8 } : undefined}
                      animate={{ opacity: isThisSelected ? 0.12 : 1 }}
                      transition={hoverTransition}
                      className={`group relative h-full rounded-[2px] border border-stone-900/8 shadow-[0_12px_20px_rgba(83,58,14,0.08)] ${
                        isOpen && !isThisSelected ? 'cursor-pointer' : 'cursor-default'
                      }`}
                      style={{ backgroundColor: sheet.color }}
                    >
                      <div className="absolute left-[8%] top-[12%] text-[0.66rem] font-medium uppercase tracking-[0.14em] text-stone-900/45 transition duration-200 ease-out group-hover:text-stone-900/58">
                        {sheet.label}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}

              {/*
                Tab indicators — separate render pass at z=50 so they always
                sit above every card body regardless of which card is hovered.
                pointer-events:none keeps hover detection on the card bodies.
              */}
              {fileSheets.map((sheet, index) => {
                const tabRight = `${tabBaseRightPct + index * tabSpacingPct}%`
                const isHovered = hoveredFileIndex === index
                const isThisSelected = isFileSelected && selectedFile === index

                return (
                  <motion.div
                    key={`tab-${sheet.label}`}
                    custom={index}
                    initial={false}
                    animate={walletState}
                    variants={fileVariants}
                    style={{ zIndex: 50, willChange: 'transform, opacity', pointerEvents: 'none' }}
                    className="absolute inset-x-0 bottom-0 h-[80%]"
                  >
                    <motion.div
                      animate={isHovered && isOpen && !isThisSelected ? { y: -8 } : { y: 0 }}
                      transition={hoverTransition}
                      className="relative h-full"
                    >
                      <div
                        className="absolute flex items-center justify-center rounded-t-[3px] border-t border-x border-stone-900/8 text-[0.6rem] font-bold uppercase tracking-[0.12em]"
                        style={{
                          right: tabRight,
                          width: `${tabWidthPct}%`,
                          height: `${tabHeightPx}px`,
                          top: `-${tabHeightPx}px`,
                          backgroundColor: sheet.color,
                          color: 'rgba(28,25,23,0.65)',
                          opacity: isThisSelected ? 0.12 : 1,
                          transition: 'opacity 0.35s ease',
                        }}
                      >
                        {sheet.label}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Front panel / wallet cover */}
            <motion.div
              role="button"
              tabIndex={0}
              initial={false}
              animate={walletState}
              variants={frontPanelVariants}
              transition={frontPanelTransition}
              whileTap={shouldReduceMotion ? { opacity: 0.92 } : { scale: 0.995 }}
              onClick={() => setIsOpen(open => !open)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(open => !open) } }}
              aria-controls="wallet-files"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close document wallet' : 'Open document wallet'}
              style={{
                transformOrigin: 'center top',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              className="absolute inset-x-[7.5%] top-[21.5%] z-40 h-[60%] cursor-pointer rounded-[4px] border border-amber-950/14 bg-[#e2b463] p-0 text-inherit backface-hidden shadow-[0_14px_26px_rgba(92,63,11,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-950/25 focus-visible:ring-offset-4"
            >
              {/* Top-left: role + name */}
              <div className="absolute left-[8%] top-[11%] flex flex-col gap-[0.55em]">
                <p className="text-[clamp(0.54rem,0.88vw,0.68rem)] font-semibold uppercase tracking-[0.32em] text-amber-950/55">
                  Software Engineer
                </p>
                <h2 className="[font-size:clamp(1rem,1.9vw,1.32rem)] font-semibold uppercase tracking-[0.14em] leading-tight text-amber-950/82">
                  Mohamed Ayoub Achour
                </h2>
              </div>

              {/* Bottom-left: contact details with icons */}
              <div className="absolute bottom-[10%] left-[8%] flex flex-col gap-[0.65em]">
                <div className="mb-[0.4em] h-px w-10 bg-amber-950/22" />

                {/* Email */}
                <a
                  href="mailto:medayoubachour69@gmail.com"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-[0.7em] text-amber-950/68 transition-colors hover:text-amber-950/90"
                >
                  <svg className="h-[clamp(10px,1.05vw,13px)] w-[clamp(10px,1.05vw,13px)] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="text-[clamp(0.54rem,0.88vw,0.66rem)] uppercase tracking-[0.1em]">
                    medayoubachour69@gmail.com
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+21695523730"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-[0.7em] text-amber-950/68 transition-colors hover:text-amber-950/90"
                >
                  <svg className="h-[clamp(10px,1.05vw,13px)] w-[clamp(10px,1.05vw,13px)] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span className="text-[clamp(0.54rem,0.88vw,0.66rem)] uppercase tracking-[0.1em]">
                    +216 95 523 730
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/medayoubachour/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-[0.7em] text-amber-950/62 transition-colors hover:text-amber-950/88"
                >
                  <svg className="h-[clamp(10px,1.05vw,13px)] w-[clamp(10px,1.05vw,13px)] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-[clamp(0.54rem,0.88vw,0.66rem)] uppercase tracking-[0.1em]">
                    linkedin.com/in/medayoubachour
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/AyoubAchour"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-[0.7em] text-amber-950/62 transition-colors hover:text-amber-950/88"
                >
                  <svg className="h-[clamp(10px,1.05vw,13px)] w-[clamp(10px,1.05vw,13px)] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-[clamp(0.54rem,0.88vw,0.66rem)] uppercase tracking-[0.1em]">
                    github.com/AyoubAchour
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-[0.7em] text-amber-950/45">
                  <svg className="h-[clamp(10px,1.05vw,13px)] w-[clamp(10px,1.05vw,13px)] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-[clamp(0.5rem,0.8vw,0.6rem)] uppercase tracking-[0.12em]">
                    Sousse, Tunisia
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ── Coffee cup on desk ── */}
      <CoffeeCup />

      {/* ── Maxwell the cat (top-right) ── */}
      <Maxwell />

      {/* ── Model attributions (CC-BY-4.0) ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '12px',
          zIndex: 5,
          fontSize: '0.52rem',
          letterSpacing: '0.06em',
          color: 'rgba(60,35,5,0.32)',
          pointerEvents: 'none',
          lineHeight: 1.6,
          textAlign: 'right',
        }}
      >
        <span>Maxwell cat model by Zhuier — CC BY 4.0</span>
        <br />
        <span>Coffee cup model by Cereces — CC BY 4.0</span>
      </div>

      {/* ── Pulled-out file panel ── */}
      <AnimatePresence>
        {isFileSelected && (
          <motion.div
            key={`panel-${selectedFile}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '108%', opacity: 0 }}
            transition={{ duration: 0.56, ease: sharedEase, delay: 0.05 }}
            className="fixed bottom-0 right-0 top-0 flex items-center p-6 md:p-10"
            style={{ width: isMobile ? '96vw' : 'clamp(360px, 60vw, 880px)', zIndex: 100 }}
          >
            {/* Paper sheet */}
            <div
              className="relative flex h-full w-full flex-col rounded-[3px] border border-stone-900/8 p-[8%]"
              style={{
                backgroundColor: fileSheets[selectedFile].color,
                maxHeight: '84vh',
                boxShadow: '-8px 0 32px rgba(83,58,14,0.10), 0 24px 64px rgba(83,58,14,0.18)',
              }}
            >

              {/* Close — return to wallet */}
              <button
                onClick={() => setSelectedFile(null)}
                aria-label="Return file to wallet"
                className="absolute right-5 top-5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-stone-900/12 bg-stone-900/4 text-stone-900/38 transition-colors hover:bg-stone-900/8 hover:text-stone-900/62"
              >
                <svg className="h-[11px] w-[11px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M1 1l10 10M11 1L1 11" />
                </svg>
              </button>

              {/* Section label */}
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-stone-900/38">
                {fileSheets[selectedFile].label}
              </p>

              <div className="mt-[1.2em] h-px w-8 bg-stone-900/14" />

              {/* File content */}
              {(() => {
                const Content = fileContentMap[fileSheets[selectedFile].label]
                return Content ? <Content /> : null
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}

export default App
