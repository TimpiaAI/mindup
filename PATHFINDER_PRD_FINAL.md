# PathFinder — PRD Complet pentru MVP Demo Hackathon

---

## ⚠️ INSTRUCȚIUNI CRITICE PENTRU CLAUDE CODE

**ÎNAINTE DE A ÎNCEPE CODUL:**
1. Folosește SKILL-urile pentru frontend design din `/mnt/skills/`
2. Citește SKILL.md pentru best practices UI/UX
3. Aplică principii de design minimalist în fiecare componentă
4. NU folosi gradiente, NU folosi border-radius excesiv
5. Testează pe TOATE rezoluțiile înainte de a considera task-ul complet

---

## 📋 DOCUMENT OVERVIEW

| Field | Value |
|-------|-------|
| **Nume Proiect** | PathFinder |
| **Tagline** | Găsește-ți direcția în carieră |
| **Scop** | MVP funcțional pentru demo și înregistrare video la hackathon |
| **Tip** | Frontend-only, fără backend, cu date mock precomplete |
| **Tech Stack** | Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion |

---

## 🎯 SCOPUL PLATFORMEI — DESCRIERE COMPLETĂ

### Ce este PathFinder?

PathFinder este o platformă care ajută studenții și tinerii să-și găsească cariera potrivită bazându-se pe skillurile, experiențele și pasiunile lor reale — nu pe diplome sau titluri generice.

### Problema pe care o rezolvă

1. **Studenții nu știu ce joburi există** — Cunosc doar titluri generice ("programator", "economist") dar nu înțeleg subdiviziunile (Frontend vs Backend vs DevOps vs QA)
2. **Platformele existente (BestJobs, eJobs, LinkedIn) folosesc keyword matching** — Dacă nu ai exact cuvintele din job description, nu apari. PathFinder analizează competențe transferabile.
3. **Lipsește conexiunea studii ↔ job ↔ companii** — PathFinder le pune pe toate într-un singur loc
4. **CV-ul e o barieră** — Mulți nu au CV sau nu știu cum să-l facă. PathFinder îl generează automat.

### Flow-ul complet al platformei

```
ONBOARDING (fără email inițial)
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ PASUL 1: Date de bază                                           │
│ - Nume, prenume                                                 │
│ - Vârstă                                                        │
│ - Oraș                                                          │
│ - Nivel actual (liceu/student/absolvent/angajat)                │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ PASUL 2: "Ai CV?"                                               │
│                                                                 │
│ ┌─────────────────────┐    ┌─────────────────────┐              │
│ │ DA, am CV           │    │ NU, nu am CV        │              │
│ │ → Upload PDF        │    │ → Discovery Flow    │              │
│ │ → AI extrage date   │    │                     │              │
│ │ → Verifici datele   │    │                     │              │
│ └─────────────────────┘    └─────────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
     │                              │
     │                              ▼
     │         ┌─────────────────────────────────────────────────┐
     │         │ DISCOVERY FLOW (dacă NU are CV)                 │
     │         │                                                 │
     │         │ Întrebări FOARTE personale:                     │
     │         │ - Ce îți place să faci? (pasiuni)               │
     │         │ - Ce faci în timpul liber?                      │
     │         │ - Ce te deblocheză? Ce îți dă claritate?        │
     │         │ - Ce voluntariate ai făcut?                     │
     │         │ - Ce cursuri ai completat?                      │
     │         │ - Ce proiecte personale ai?                     │
     │         │ - Poți pune POZE cu diplome/certificate         │
     │         │ - Ce skilluri ai? La ce nivel?                  │
     │         │                                                 │
     │         │ → AI GENEREAZĂ CV-ul COMPLET                    │
     │         └─────────────────────────────────────────────────┘
     │                              │
     ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ LOADING SCREEN                                                  │
│ - "Se procesează profilul tău..."                               │
│ - Progress bar animat                                           │
│ - Steps care se completează                                     │
│ - În timpul ăsta "se încarcă joburile"                          │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ REZULTATE: CAREER MATCHES                                       │
│                                                                 │
│ Apar 4+ CARDURI (ramuri mari de carieră):                       │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐                         │
│ │ 💻 IT & Software│ │ 🎨 UX/UI Design │                         │
│ │                 │ │                 │                         │
│ │ 87% match       │ │ 72% match       │                         │
│ │                 │ │                 │                         │
│ │ DE CE?          │ │ DE CE?          │                         │
│ │ • Ai skilluri...│ │ • Cunoștințe... │                         │
│ │ • Îți place...  │ │ • Interes pt... │                         │
│ │                 │ │                 │                         │
│ │ [Explorează] [✕]│ │ [Explorează] [✕]│                         │
│ └─────────────────┘ └─────────────────┘                         │
│                                                                 │
│ Butonul [✕] = elimină cardul și apare ALTUL în loc              │
│ Poți filtra/scoate cariere care nu te interesează               │
└─────────────────────────────────────────────────────────────────┘
     │
     │ Click pe card (ex: "IT & Software")
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ SUB-RAMURI (JOBURI SPECIFICE)                                   │
│                                                                 │
│ 💻 IT & Software → se deschide lista de joburi:                 │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🖥️ Frontend Developer                              91% match│ │
│ │ Creezi interfețe web cu React, Vue, Angular                 │ │
│ │ 💰 5.000-15.000 RON  🎓 Licență (opțional)                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ⚙️ Backend Developer                               78% match│ │
│ │ Construiești API-uri și logica serverului                   │ │
│ │ 💰 6.000-18.000 RON  🎓 Licență recomandată                 │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ (+ Mobile Developer, Full Stack, DevOps, QA, etc.)              │
│                                                                 │
│ Fiecare card are:                                               │
│ - Descriere scurtă                                              │
│ - % match CU TINE specific                                      │
│ - Studii necesare (doar indicativ)                              │
└─────────────────────────────────────────────────────────────────┘
     │
     │ Click pe job (ex: "Frontend Developer")
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ JOB DETAIL PAGE — PAGINA PRINCIPALĂ                             │
│                                                                 │
│ ┌─────────────────────────────────┐ ┌─────────────────────────┐ │
│ │                                 │ │                         │ │
│ │ MAIN CONTENT (2/3)              │ │ SIDEBAR (1/3)           │ │
│ │                                 │ │                         │ │
│ │ ┌─────────────────────────────┐ │ │ 🏢 COMPANII             │ │
│ │ │ JOB HEADER                  │ │ │                         │ │
│ │ │ 🖥️ Frontend Developer  91% │ │ │ Companii care           │ │
│ │ │ Descriere completă...       │ │ │ au creat cont pe        │ │
│ │ │ Salariu: 5K-15K RON         │ │ │ platformă și            │ │
│ │ └─────────────────────────────┘ │ │ PLĂTESC lunar           │ │
│ │                                 │ │ să apară aici:          │ │
│ │ ┌─────────────────────────────┐ │ │                         │ │
│ │ │ 🤖 CHAT CU MENTOR AI        │ │ │ ┌─────────────────────┐ │ │
│ │ │                             │ │ │ │ Google              │ │ │
│ │ │ "Vorbește cu cineva din...  │ │ │ │ 5 poziții           │ │ │
│ │ │                             │ │ │ │ [Click → modal]     │ │ │
│ │ │ Mentorul AI este ANTRENAT   │ │ │ └─────────────────────┘ │ │
│ │ │ specific pe acest job       │ │ │                         │ │
│ │ │                             │ │ │ ┌─────────────────────┐ │ │
│ │ │ [Chat interface cu mesaje]  │ │ │ │ Endava              │ │ │
│ │ │                             │ │ │ │ 12 poziții          │ │ │
│ │ └─────────────────────────────┘ │ │ └─────────────────────┘ │ │
│ │                                 │ │                         │ │
│ │ ┌─────────────────────────────┐ │ │ ┌─────────────────────┐ │ │
│ │ │ 📚 STUDII NECESARE          │ │ │ │ UiPath              │ │ │
│ │ │                             │ │ │ │ 8 poziții           │ │ │
│ │ │ • BAC (minim)               │ │ │ └─────────────────────┘ │ │
│ │ │ • Facultăți recomandate:    │ │ │                         │ │
│ │ │                             │ │ │ ─────────────────────── │ │
│ │ │ [🏛️ UPB] [🎓 UniBuc] ...   │ │ │                         │ │
│ │ │                             │ │ │ 💎 PREMIUM              │ │
│ │ │ Click pe facultate → det.   │ │ │                         │ │
│ │ │                             │ │ │ Trimite email           │ │
│ │ │ [Filtru după județ ▼]       │ │ │ AUTOMAT la toate        │ │
│ │ └─────────────────────────────┘ │ │ companiile.             │ │
│ │                                 │ │                         │ │
│ └─────────────────────────────────┘ └─────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Monetizare

| Cine plătește | Ce primește | Model |
|---------------|-------------|-------|
| **Companii** | Profil + Vizibilitate în sidebar + Contact de la candidați | Abonament lunar |
| **Facultăți** | Profil + Vizibilitate + Marketing către studenți | Abonament lunar |
| **Useri** | Auto-email la toate companiile (integrare Gmail) | ONE-TIME (nu subscription) |

---

## 🎨 DESIGN SYSTEM — MINIMALIST

### ⚠️ REGULI STRICTE DE DESIGN

```
❌ NU FOLOSI:
- Gradiente
- Border-radius mare (max 4px-8px)
- Shadows excesive
- Culori neon sau vibrante
- Decorațiuni inutile
- Animații exagerate
- Font-uri fancy

✅ FOLOSEȘTE:
- Culori plate, solide
- Colțuri drepte sau ușor rotunjite (4px max)
- Spațiu alb generos
- Tipografie clară și lizibilă
- Contrast puternic pentru accesibilitate
- Grid system consistent
- Componente funcționale, nu decorative
```

### Paletă de culori

```css
/* Primary - Un singur accent color */
--primary: #2563EB;        /* Blue-600 - pentru acțiuni principale */
--primary-hover: #1D4ED8;  /* Blue-700 - hover state */

/* Neutrals - Grayscale simplu */
--black: #0F172A;          /* Text principal */
--gray-900: #1E293B;       /* Headings */
--gray-700: #334155;       /* Text secundar */
--gray-500: #64748B;       /* Text muted */
--gray-300: #CBD5E1;       /* Borders */
--gray-100: #F1F5F9;       /* Backgrounds subtile */
--white: #FFFFFF;          /* Background principal */

/* Semantic */
--success: #16A34A;        /* Green-600 */
--warning: #CA8A04;        /* Yellow-600 */
--error: #DC2626;          /* Red-600 */

/* Match percentages */
--match-high: #16A34A;     /* 80%+ verde */
--match-medium: #2563EB;   /* 60-79% albastru */
--match-low: #CA8A04;      /* 40-59% galben */
--match-minimal: #64748B;  /* <40% gri */
```

### Tipografie

```css
/* Font family - System fonts pentru performanță */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Scale */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Spacing System

```css
/* Folosește multipli de 4px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Border Radius

```css
/* MINIMAL - colțuri aproape drepte */
--radius-none: 0;
--radius-sm: 2px;
--radius-md: 4px;    /* DEFAULT pentru carduri */
--radius-lg: 6px;    /* MAX pentru buttons */
--radius-full: 9999px; /* DOAR pentru avatare/badge-uri rotunde */
```

### Shadows

```css
/* Subtile, aproape invizibile */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 1px 3px 0 rgb(0 0 0 / 0.1);
/* NU folosi shadow-lg sau mai mare */
```

### Borders

```css
/* Borders vizibile, definite */
--border-width: 1px;
--border-color: var(--gray-300);
--border: 1px solid var(--gray-300);
```

---

## 📐 COMPONENTE UI — SPECIFICAȚII EXACTE

### Button

```tsx
// Button.tsx
// Variante: primary, secondary, ghost

// PRIMARY
className="
  px-4 py-2
  bg-[#2563EB] text-white
  text-sm font-medium
  rounded-[4px]
  border-none
  hover:bg-[#1D4ED8]
  transition-colors duration-150
  cursor-pointer
"

// SECONDARY
className="
  px-4 py-2
  bg-white text-[#0F172A]
  text-sm font-medium
  rounded-[4px]
  border border-[#CBD5E1]
  hover:bg-[#F1F5F9]
  transition-colors duration-150
"

// GHOST
className="
  px-4 py-2
  bg-transparent text-[#64748B]
  text-sm font-medium
  rounded-[4px]
  hover:bg-[#F1F5F9]
  transition-colors duration-150
"
```

### Input

```tsx
// Input.tsx
className="
  w-full
  px-3 py-2
  bg-white
  text-[#0F172A] text-base
  border border-[#CBD5E1]
  rounded-[4px]
  placeholder:text-[#64748B]
  focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]
  transition-colors duration-150
"
```

### Card

```tsx
// Card.tsx
className="
  bg-white
  border border-[#CBD5E1]
  rounded-[4px]
  p-6
"

// Card hover (pentru carduri clickable)
className="
  bg-white
  border border-[#CBD5E1]
  rounded-[4px]
  p-6
  cursor-pointer
  hover:border-[#2563EB]
  transition-colors duration-150
"
```

### Match Percentage Display

```tsx
// MatchBadge.tsx - NU circular, doar text

// Pentru match >= 80%
<span className="text-sm font-semibold text-[#16A34A]">87% match</span>

// Pentru match 60-79%
<span className="text-sm font-semibold text-[#2563EB]">72% match</span>

// Pentru match 40-59%
<span className="text-sm font-semibold text-[#CA8A04]">58% match</span>

// Pentru match < 40%
<span className="text-sm font-semibold text-[#64748B]">35% match</span>
```

### Progress Bar

```tsx
// ProgressBar.tsx - simplu, fără animații fancy
<div className="w-full h-1 bg-[#F1F5F9] rounded-[2px]">
  <div
    className="h-full bg-[#2563EB] rounded-[2px] transition-all duration-300"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### Badge / Tag

```tsx
// Badge.tsx
// Pentru skills
<span className="
  inline-flex items-center
  px-2 py-1
  text-xs font-medium
  bg-[#F1F5F9] text-[#334155]
  rounded-[2px]
">
  React
</span>

// Pentru skill pe care user-ul ÎL ARE
<span className="
  inline-flex items-center
  px-2 py-1
  text-xs font-medium
  bg-[#DCFCE7] text-[#16A34A]
  rounded-[2px]
">
  ✓ React
</span>
```

---

## 📱 RESPONSIVE DESIGN — TOATE REZOLUȚIILE

### Breakpoints

```css
/* Mobile First */
sm: 640px    /* Large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Small laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large desktops */
```

### Layout Rules

```
MOBILE (< 640px):
- Single column layout
- Full-width cards
- Bottom navigation
- Hamburger menu
- Touch-friendly targets (min 44px)
- No sidebar - stacked layout

TABLET (640px - 1024px):
- 2 column grid pentru carduri
- Sidebar collapses to bottom section
- Readable line length (max 65ch)

DESKTOP (> 1024px):
- 2/3 + 1/3 layout pentru job detail
- Fixed sidebar
- Hover states active
- Max-width container (1280px)
```

### Container

```tsx
// Layout container
<div className="
  w-full
  max-w-[1280px]
  mx-auto
  px-4 sm:px-6 lg:px-8
">
  {children}
</div>
```

### Grid System

```tsx
// Career cards grid
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-4 sm:gap-6
">
  {cards}
</div>

// Job detail layout
<div className="
  grid
  grid-cols-1
  lg:grid-cols-3
  gap-6 lg:gap-8
">
  <main className="lg:col-span-2">
    {/* Main content */}
  </main>
  <aside className="lg:col-span-1">
    {/* Sidebar */}
  </aside>
</div>
```

---

## 📁 STRUCTURA PROIECTULUI

```
/src
  /app
    /page.tsx                      # Landing page
    /layout.tsx                    # Root layout
    /globals.css                   # Global styles (minimal)

    /start
      /page.tsx                    # Redirect → /start/name
      /name/page.tsx               # Onboarding: Nume
      /location/page.tsx           # Onboarding: Locație, Vârstă
      /level/page.tsx              # Onboarding: Nivel actual
      /cv-choice/page.tsx          # Onboarding: Ai CV?
      /upload-cv/page.tsx          # Flow: Upload CV
      /passions/page.tsx           # Flow: Pasiuni
      /free-time/page.tsx          # Flow: Timp liber
      /clarity/page.tsx            # Flow: Ce te deblocheaza
      /experiences/page.tsx        # Flow: Experiențe
      /skills/page.tsx             # Flow: Skilluri

    /loading/page.tsx              # Loading screen (AI procesează)

    /results/page.tsx              # Career matches (carduri)

    /career
      /[categoryId]/page.tsx       # Joburi din categorie

    /job
      /[jobId]/page.tsx            # Job detail (MAIN PAGE)

    /faculty
      /[facultyId]/page.tsx        # Faculty detail

    /company
      /[companyId]/page.tsx        # Company detail

    /cv/page.tsx                   # CV preview

    /save/page.tsx                 # Save progress (magic link)

  /components
    /ui
      /Button.tsx
      /Input.tsx
      /Select.tsx
      /Card.tsx
      /Badge.tsx
      /ProgressBar.tsx
      /Modal.tsx

    /layout
      /Header.tsx
      /Container.tsx
      /PageWrapper.tsx

    /onboarding
      /StepProgress.tsx
      /PassionGrid.tsx
      /SkillSelector.tsx
      /ExperienceList.tsx

    /careers
      /CareerCard.tsx
      /JobCard.tsx

    /job
      /JobHeader.tsx
      /MentorChat.tsx
      /StudiesGrid.tsx
      /SkillsList.tsx

    /faculty
      /FacultyCard.tsx
      /FacultyInfo.tsx
      /ReviewList.tsx

    /company
      /CompanyCard.tsx
      /CompanyModal.tsx
      /CompanySidebar.tsx

  /lib
    /mock-data.ts                  # TOATE datele mock
    /store.ts                      # Zustand store
    /utils.ts                      # Helpers

  /types
    /index.ts                      # TypeScript types
```

---

## ✅ CHECKLIST DEMO

- [ ] Landing page minimalist
- [ ] Onboarding flow complet (toate paginile)
- [ ] Date precomplete funcționale
- [ ] Loading screen
- [ ] Results cu carduri și eliminare
- [ ] Job list per categorie
- [ ] Job detail page cu toate secțiunile
- [ ] AI Mentor chat FUNCȚIONAL
- [ ] Faculty detail page
- [ ] Company modal/page
- [ ] CV preview
- [ ] Responsive pe TOATE rezoluțiile
- [ ] Navigare completă fără erori

---

## 📹 FLOW PENTRU ÎNREGISTRARE

1. Landing → Click "Începe gratuit"
2. Onboarding: treci prin pași (date precomplete)
3. Loading: arată procesarea
4. Results: prezintă cardurile, elimină unul
5. Click pe "IT & Software"
6. Click pe "Frontend Developer"
7. Chat: trimite 2-3 întrebări mentorului
8. Click pe o facultate
9. Click pe o companie
10. CV preview

**Timp estimat: 3-5 minute**

---

**END OF PRD**
