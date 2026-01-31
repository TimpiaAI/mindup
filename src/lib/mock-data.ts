// ==================== CONSTANTS ====================

export const CITIES = [
  "București", "Cluj-Napoca", "Timișoara", "Iași", "Brașov",
  "Constanța", "Craiova", "Sibiu", "Oradea", "Galați",
  "Ploiești", "Arad", "Pitești", "Bacău", "Târgu Mureș"
];

export const COUNTIES = [
  "București", "Cluj", "Timiș", "Iași", "Brașov",
  "Constanța", "Dolj", "Sibiu", "Bihor", "Galați"
];

// ==================== PASSIONS ====================

export const PASSIONS = [
  { id: 'tech', icon: 'tech', label: 'Tehnologie' },
  { id: 'design', icon: 'design', label: 'Design' },
  { id: 'business', icon: 'business', label: 'Business' },
  { id: 'writing', icon: 'writing', label: 'Scris' },
  { id: 'communication', icon: 'communication', label: 'Comunicare' },
  { id: 'research', icon: 'research', label: 'Cercetare' },
  { id: 'helping', icon: 'helping', label: 'Ajutorare' },
  { id: 'gaming', icon: 'gaming', label: 'Gaming' },
  { id: 'music', icon: 'music', label: 'Muzică' },
  { id: 'sports', icon: 'sports', label: 'Sport' },
  { id: 'travel', icon: 'travel', label: 'Călătorii' },
  { id: 'cooking', icon: 'cooking', label: 'Gătit' }
];

// ==================== CLARITY TRIGGERS ====================

export const CLARITY_TRIGGERS = [
  { id: 'logic', label: 'Când rezolv probleme logice' },
  { id: 'create', label: 'Când creez ceva vizual' },
  { id: 'talk', label: 'Când vorbesc cu oameni' },
  { id: 'organize', label: 'Când organizez și planific' },
  { id: 'learn', label: 'Când învăț ceva nou' },
  { id: 'help', label: 'Când ajut pe cineva' }
];

// ==================== AVAILABLE SKILLS ====================

export const AVAILABLE_SKILLS = {
  programming: [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
    'React', 'Vue.js', 'Angular', 'Node.js', 'Django', 'Flask',
    'HTML/CSS', 'SQL', 'Git', 'Docker', 'AWS', 'Linux'
  ],
  design: [
    'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch',
    'UI Design', 'UX Design', 'Canva', 'After Effects'
  ],
  business: [
    'Excel', 'PowerPoint', 'Data Analysis', 'Project Management',
    'Marketing', 'SEO', 'Google Ads', 'Sales'
  ],
  languages: [
    { name: 'Engleză', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    { name: 'Franceză', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    { name: 'Germană', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    { name: 'Spaniolă', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
  ]
};

// ==================== MOCK USER (PRECOMPLETED) ====================

export const MOCK_USER = {
  name: "Ovidiu Stefan",
  surname: "Pica",
  age: 19,
  city: "București",
  level: "student" as const,
  faculty: "Automatică și Calculatoare",
  year: 2,
  hasCV: false
};

// ==================== MOCK PROFILE (PRECOMPLETED) ====================

export const MOCK_PROFILE = {
  passions: ['tech', 'design', 'gaming'],

  freeTime: "Îmi place să lucrez la proiecte personale de coding, să joc League of Legends și să urmăresc tutoriale de UI/UX design pe YouTube. În weekend mai fac și niște freelancing pe Upwork.",

  clarityTrigger: 'logic',

  skills: [
    { name: 'Python', level: 'intermediate', category: 'programming' },
    { name: 'JavaScript', level: 'intermediate', category: 'programming' },
    { name: 'React', level: 'beginner', category: 'programming' },
    { name: 'HTML/CSS', level: 'advanced', category: 'programming' },
    { name: 'Git', level: 'intermediate', category: 'tools' },
    { name: 'Figma', level: 'intermediate', category: 'design' },
    { name: 'SQL', level: 'beginner', category: 'programming' }
  ],

  languages: [
    { name: 'Engleză', level: 'C1' },
    { name: 'Franceză', level: 'B1' }
  ],

  experiences: [
    {
      id: '1',
      type: 'volunteer',
      title: 'Voluntar IT',
      organization: 'Crucea Roșie România',
      year: '2023',
      description: 'Am ajutat la digitalizarea documentelor și am creat un mic sistem de tracking pentru donații.',
      skills: ['Excel', 'Problem Solving']
    },
    {
      id: '2',
      type: 'course',
      title: 'Google Digital Marketing Certificate',
      organization: 'Google / Coursera',
      year: '2024',
      description: 'Certificare completă în digital marketing, SEO, Google Ads și analytics.',
      skills: ['SEO', 'Google Ads', 'Data Analysis']
    },
    {
      id: '3',
      type: 'project',
      title: 'Portfolio Personal',
      organization: '',
      year: '2024',
      description: 'Am creat un site personal cu React și Tailwind CSS pentru a-mi prezenta proiectele.',
      skills: ['React', 'Tailwind CSS', 'JavaScript']
    },
    {
      id: '4',
      type: 'competition',
      title: 'HackTM 2023',
      organization: 'Politehnica Timișoara',
      year: '2023',
      description: 'Locul 3 cu o aplicație mobilă pentru management-ul task-urilor studenților.',
      skills: ['React Native', 'Teamwork', 'Problem Solving']
    },
    {
      id: '5',
      type: 'job',
      title: 'Freelancer Web Development',
      organization: 'Upwork',
      year: '2023-2024',
      description: 'Proiecte mici de web development pentru clienți internaționali. Landing pages, bug fixes.',
      skills: ['JavaScript', 'HTML/CSS', 'Communication']
    }
  ]
};

// ==================== CAREER CATEGORIES ====================

export const CAREER_CATEGORIES = [
  {
    id: 1,
    name: "IT & Software Development",
    icon: "it-software",
    match: 87,
    reasons: [
      "Ai skilluri solide de programare (Python, JavaScript, React)",
      "Îți place să rezolvi probleme logice",
      "Ai experiență practică din freelancing și hackathoane",
      "Pasiunea pentru tehnologie e evidentă"
    ]
  },
  {
    id: 2,
    name: "UX/UI Design",
    icon: "ux-ui",
    match: 72,
    reasons: [
      "Cunoștințe Figma la nivel intermediate",
      "Ai selectat design ca una din pasiuni",
      "Urmărești tutoriale de UI/UX în timpul liber",
      "HTML/CSS avansat - înțelegi implementarea"
    ]
  },
  {
    id: 3,
    name: "Data Science & Analytics",
    icon: "data-science",
    match: 65,
    reasons: [
      "Python intermediate - limbajul principal în data science",
      "Gândire analitică demonstrată",
      "SQL beginner - bază bună pentru a continua",
      "Certificare Google cu componentă de analytics"
    ]
  },
  {
    id: 4,
    name: "Product Management",
    icon: "product",
    match: 58,
    reasons: [
      "Experiență în coordonare la hackathon",
      "Înțelegi atât partea tehnică cât și business",
      "Comunicare bună demonstrată în freelancing",
      "Viziune de produs din proiectele personale"
    ]
  },
  {
    id: 5,
    name: "Game Development",
    icon: "game-dev",
    match: 54,
    reasons: [
      "Pasiune pentru gaming",
      "Skilluri de programare transferabile",
      "Creativitate și atenție la detalii"
    ]
  },
  {
    id: 6,
    name: "Digital Marketing",
    icon: "marketing",
    match: 48,
    reasons: [
      "Certificare Google Digital Marketing completată",
      "Înțelegi SEO și Google Ads",
      "Experiență cu analytics"
    ]
  }
];

// ==================== JOBS ====================

export const JOBS = [
  // IT & Software (Category 1)
  {
    id: 101,
    categoryId: 1,
    name: "Frontend Developer",
    icon: "frontend",
    match: 91,
    shortDescription: "Creezi interfețe web interactive cu React, Vue sau Angular.",
    description: "Frontend developerii sunt arhitecții experienței utilizatorului pe web. Transformi designul în cod funcțional, creezi interfețe responsive și te asiguri că aplicația web este rapidă, accesibilă și plăcută de folosit.",
    salaryMin: 5000,
    salaryMax: 15000,
    currency: "RON",
    studyLevel: "Licență (opțional pentru self-taught)",
    requiredSkills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "Git", "Responsive Design"],
    niceToHaveSkills: ["TypeScript", "Testing (Jest)", "Performance Optimization"],
    dayInLife: "Dimineața începe cu stand-up-ul echipei (15 min). Apoi intri în focus mode pentru coding - implementezi features noi sau rezolvi bug-uri. După prânz ai code review cu colegii și poate un call cu designerii pentru clarificări."
  },
  {
    id: 102,
    categoryId: 1,
    name: "Backend Developer",
    icon: "backend",
    match: 78,
    shortDescription: "Construiești logica și API-urile din spatele aplicațiilor.",
    description: "Backend developerii construiesc 'creierul' aplicațiilor - partea pe care utilizatorii nu o văd, dar fără de care nimic nu funcționează.",
    salaryMin: 6000,
    salaryMax: 18000,
    currency: "RON",
    studyLevel: "Licență recomandată",
    requiredSkills: ["Python/Node.js/Java", "SQL", "REST APIs", "Git", "Linux basics"],
    niceToHaveSkills: ["Docker", "Cloud (AWS/GCP)", "Microservices"],
    dayInLife: "Începi cu review la PR-uri și rezolvarea issue-urilor urgente. Majoritatea zilei lucrezi la features noi - scrii cod, testezi, optimizezi."
  },
  {
    id: 103,
    categoryId: 1,
    name: "Full Stack Developer",
    icon: "fullstack",
    match: 85,
    shortDescription: "Lucrezi pe întregul stack - de la UI la baza de date.",
    description: "Full Stack developerii sunt 'Swiss Army knife' al dezvoltării software. Poți lucra pe orice parte a aplicației.",
    salaryMin: 7000,
    salaryMax: 20000,
    currency: "RON",
    studyLevel: "Licență (opțional)",
    requiredSkills: ["JavaScript", "React/Vue", "Node.js/Python", "SQL", "Git"],
    niceToHaveSkills: ["TypeScript", "Docker", "CI/CD"],
    dayInLife: "Ziua ta e variată - poate începe cu un bug pe frontend și continuă cu optimizarea unei query SQL."
  },
  {
    id: 104,
    categoryId: 1,
    name: "Mobile Developer",
    icon: "mobile",
    match: 72,
    shortDescription: "Dezvolți aplicații native sau cross-platform pentru iOS și Android.",
    description: "Mobile developerii creează aplicațiile pe care le folosim zilnic pe telefoane.",
    salaryMin: 5500,
    salaryMax: 16000,
    currency: "RON",
    studyLevel: "Licență (opțional)",
    requiredSkills: ["React Native/Flutter SAU Swift/Kotlin", "JavaScript/Dart", "Git"],
    niceToHaveSkills: ["Native modules", "App Store optimization"],
    dayInLife: "Testezi aplicația pe multiple device-uri. Implementezi features noi, integrezi API-uri."
  },
  {
    id: 105,
    categoryId: 1,
    name: "DevOps Engineer",
    icon: "devops",
    match: 45,
    shortDescription: "Automatizezi deployment-ul și gestionezi infrastructura cloud.",
    description: "DevOps engineers sunt podul dintre development și operations.",
    salaryMin: 8000,
    salaryMax: 25000,
    currency: "RON",
    studyLevel: "Licență recomandată",
    requiredSkills: ["Linux", "Docker", "CI/CD", "Cloud (AWS/GCP/Azure)", "Scripting"],
    niceToHaveSkills: ["Kubernetes", "Terraform", "Monitoring"],
    dayInLife: "Monitorizezi sistemele, răspunzi la alerte și rezolvi incidente."
  },
  {
    id: 106,
    categoryId: 1,
    name: "QA Engineer",
    icon: "qa",
    match: 62,
    shortDescription: "Testezi software-ul și asiguri calitatea produsului.",
    description: "QA Engineers sunt gardienii calității.",
    salaryMin: 4500,
    salaryMax: 12000,
    currency: "RON",
    studyLevel: "Licență (opțional)",
    requiredSkills: ["Manual Testing", "Test Cases", "Bug Reporting", "Basic Programming"],
    niceToHaveSkills: ["Automation (Selenium/Cypress)", "API Testing"],
    dayInLife: "Revizuiești cerințele pentru features noi și scrii test cases."
  },

  // UX/UI Design (Category 2)
  {
    id: 201,
    categoryId: 2,
    name: "UX Designer",
    icon: "ux",
    match: 70,
    shortDescription: "Cercetezi utilizatorii și creezi experiențe intuitive.",
    description: "UX Designerii se concentrează pe experiența utilizatorului.",
    salaryMin: 5000,
    salaryMax: 14000,
    currency: "RON",
    studyLevel: "Licență în Design/Psihologie/HCI",
    requiredSkills: ["User Research", "Wireframing", "Prototyping", "Figma/Sketch"],
    niceToHaveSkills: ["Psychology basics", "Data Analysis"],
    dayInLife: "Dimineața faci un user interview sau analizezi date din analytics."
  },
  {
    id: 202,
    categoryId: 2,
    name: "UI Designer",
    icon: "ui",
    match: 75,
    shortDescription: "Creezi interfețe vizuale atractive și consistente.",
    description: "UI Designerii se ocupă de aspectul vizual al produselor digitale.",
    salaryMin: 4500,
    salaryMax: 13000,
    currency: "RON",
    studyLevel: "Licență în Design/Arte",
    requiredSkills: ["Figma/Sketch", "Visual Design", "Typography", "Color Theory"],
    niceToHaveSkills: ["Motion Design", "HTML/CSS basics"],
    dayInLife: "Lucrezi pe mockup-uri high-fidelity pentru features noi."
  },
  {
    id: 203,
    categoryId: 2,
    name: "Product Designer",
    icon: "product-design",
    match: 68,
    shortDescription: "Combini UX și UI într-un rol end-to-end.",
    description: "Product Designerii fac totul - de la research la design final.",
    salaryMin: 6000,
    salaryMax: 16000,
    currency: "RON",
    studyLevel: "Licență + experiență",
    requiredSkills: ["UX Research", "UI Design", "Prototyping", "Figma"],
    niceToHaveSkills: ["HTML/CSS", "A/B Testing"],
    dayInLife: "Ziua e foarte variată - design sprint, user interviews, mockup-uri."
  },

  // Data Science (Category 3)
  {
    id: 301,
    categoryId: 3,
    name: "Data Analyst",
    icon: "data-analyst",
    match: 68,
    shortDescription: "Analizezi date pentru a extrage insights de business.",
    description: "Data Analysts transformă datele brute în insights acționabile.",
    salaryMin: 4500,
    salaryMax: 12000,
    currency: "RON",
    studyLevel: "Licență în Matematică/Economie/IT",
    requiredSkills: ["SQL", "Excel", "Data Visualization", "Statistics basics"],
    niceToHaveSkills: ["Tableau/Power BI", "Python/R basics"],
    dayInLife: "Primești cereri de analiză de la stakeholders. Scrii query-uri SQL."
  },
  {
    id: 302,
    categoryId: 3,
    name: "Data Scientist",
    icon: "data-scientist",
    match: 58,
    shortDescription: "Creezi modele predictive și algoritmi de machine learning.",
    description: "Data Scientists folosesc statistică și machine learning.",
    salaryMin: 7000,
    salaryMax: 20000,
    currency: "RON",
    studyLevel: "Master recomandat",
    requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL"],
    niceToHaveSkills: ["Deep Learning", "NLP", "Big Data"],
    dayInLife: "Explorezi date pentru a înțelege patterns. Antrenezi modele ML."
  },

  // Product Management (Category 4)
  {
    id: 401,
    categoryId: 4,
    name: "Product Manager",
    icon: "pm",
    match: 55,
    shortDescription: "Definești ce se construiește și de ce.",
    description: "Product Managers sunt 'CEO-ul produsului'.",
    salaryMin: 7000,
    salaryMax: 18000,
    currency: "RON",
    studyLevel: "Licență + experiență",
    requiredSkills: ["Product Strategy", "User Research", "Roadmapping", "Communication"],
    niceToHaveSkills: ["Technical background", "SQL"],
    dayInLife: "Dimineața ai stand-up cu echipa de dev. Analizezi metrici."
  },

  // Game Development (Category 5)
  {
    id: 501,
    categoryId: 5,
    name: "Game Developer",
    icon: "game",
    match: 52,
    shortDescription: "Programezi mecanici și sisteme pentru jocuri video.",
    description: "Game Developers scriu codul care face jocurile să funcționeze.",
    salaryMin: 4000,
    salaryMax: 14000,
    currency: "RON",
    studyLevel: "Licență (opțional)",
    requiredSkills: ["C#/C++", "Unity/Unreal", "Game Physics", "Version Control"],
    niceToHaveSkills: ["Shader programming", "Multiplayer/Networking"],
    dayInLife: "Implementezi mecanici noi de gameplay. Fixezi bug-uri."
  }
];

// ==================== FACULTIES ====================

export const FACULTIES = [
  {
    id: 1,
    name: "Automatică și Calculatoare",
    university: "Universitatea Politehnica București",
    shortName: "UPB",
    city: "București",
    county: "București",
    logo: "building",
    logoUrl: "/universities/upb.png",
    website: "acs.pub.ro",
    duration: 4,
    credits: 240,
    language: "Română / Engleză",
    budgetSeats: 250,
    feeSeats: 150,
    yearlyFee: 5000,
    minGrade: 8.50,
    difficulty: 8.5,
    dropoutRate: 15,
    employmentRate: 94,
    admissionProcess: "50% Nota BAC + 50% Test grilă (Matematică + Informatică + Logică)",
    admissionDates: {
      registration: "1-15 Iulie",
      exam: "20-22 Iulie",
      results: "25 Iulie"
    },
    curriculum: {
      "Anul 1": "Matematică, Fizică, Programare în C, Circuite Electrice",
      "Anul 2": "Structuri de Date, Algoritmi, POO, Baze de Date",
      "Anul 3": "Rețele, Inginerie Software, AI, Grafică",
      "Anul 4": "Specializare, Proiect de Diplomă, Practică"
    },
    reviews: [
      {
        author: "Mihai D.",
        status: "Absolvent 2023, acum @ Microsoft",
        rating: 5,
        text: "Grea dar merită fiecare secundă. Am avut oferte de job din anul 3."
      },
      {
        author: "Ana M.",
        status: "Anul 4",
        rating: 4,
        text: "Matematica din primul an e tough, dar restul e mai aplicat și interesant."
      },
      {
        author: "Radu P.",
        status: "Absolvent 2022, acum @ UiPath",
        rating: 5,
        text: "Cea mai bună decizie. Networking-ul cu colegii e cel mai valoros."
      }
    ]
  },
  {
    id: 2,
    name: "Matematică și Informatică",
    university: "Universitatea din București",
    shortName: "UniBuc",
    city: "București",
    county: "București",
    logo: "graduation",
    logoUrl: "/universities/unibuc.png",
    website: "fmi.unibuc.ro",
    duration: 3,
    credits: 180,
    language: "Română / Engleză",
    budgetSeats: 300,
    feeSeats: 200,
    yearlyFee: 4500,
    minGrade: 8.20,
    difficulty: 7.5,
    dropoutRate: 20,
    employmentRate: 89,
    admissionProcess: "100% Nota BAC (cu Matematică obligatoriu)",
    admissionDates: {
      registration: "5-20 Iulie",
      exam: "N/A - doar dosar",
      results: "22 Iulie"
    },
    curriculum: {
      "Anul 1": "Analiză, Algebră, Geometrie, Programare Python/C",
      "Anul 2": "Algoritmi, Baze de Date, Probabilități, Web",
      "Anul 3": "AI, Rețele, Securitate, Proiect de Licență"
    },
    reviews: [
      {
        author: "Elena S.",
        status: "Absolvent 2023, acum @ Google",
        rating: 5,
        text: "FMI îți dă o bază teoretică foarte solidă."
      }
    ]
  },
  {
    id: 3,
    name: "Calculatoare și Tehnologia Informației",
    university: "Universitatea Tehnică Cluj-Napoca",
    shortName: "UTCN",
    city: "Cluj-Napoca",
    county: "Cluj",
    logo: "energy",
    logoUrl: "/universities/utcn.png",
    website: "ac.utcluj.ro",
    duration: 4,
    credits: 240,
    language: "Română / Engleză",
    budgetSeats: 180,
    feeSeats: 120,
    yearlyFee: 4800,
    minGrade: 8.40,
    difficulty: 8.0,
    dropoutRate: 12,
    employmentRate: 92,
    admissionProcess: "50% Nota BAC + 50% Test grilă",
    admissionDates: {
      registration: "1-18 Iulie",
      exam: "20-21 Iulie",
      results: "23 Iulie"
    },
    curriculum: {
      "Anul 1": "Matematică, Fizică, Programare C/C++",
      "Anul 2": "Structuri de Date, POO, Baze de Date",
      "Anul 3": "Sisteme Distribuite, Machine Learning",
      "Anul 4": "Specializare, Internship, Diplomă"
    },
    reviews: [
      {
        author: "Bogdan T.",
        status: "Absolvent 2022, acum @ Endava",
        rating: 5,
        text: "Cluj e un hub IT incredibil. Ai job garantat dacă ești decent."
      }
    ]
  },
  {
    id: 4,
    name: "Informatică",
    university: "Universitatea Babeș-Bolyai",
    shortName: "UBB",
    city: "Cluj-Napoca",
    county: "Cluj",
    logo: "mountain",
    logoUrl: "/universities/ubb.png",
    website: "cs.ubbcluj.ro",
    duration: 3,
    credits: 180,
    language: "Română / Engleză / Germană",
    budgetSeats: 200,
    feeSeats: 150,
    yearlyFee: 4200,
    minGrade: 8.30,
    difficulty: 7.8,
    dropoutRate: 18,
    employmentRate: 91,
    admissionProcess: "100% Nota BAC",
    admissionDates: {
      registration: "10-20 Iulie",
      exam: "N/A - doar dosar",
      results: "22 Iulie"
    },
    curriculum: {
      "Anul 1": "Fundamentele Programării, Algebră, Analiză",
      "Anul 2": "Algoritmi, Baze de Date, Web, Sisteme de Operare",
      "Anul 3": "AI, Mobile Development, Cloud, Licență"
    },
    reviews: [
      {
        author: "Maria L.",
        status: "Anul 3",
        rating: 4,
        text: "E pe 3 ani și foarte focusat pe practică. Am avut internship din anul 2."
      }
    ]
  },
  {
    id: 5,
    name: "Informatică",
    university: "Universitatea Alexandru Ioan Cuza",
    shortName: "UAIC",
    city: "Iași",
    county: "Iași",
    logo: "book",
    logoUrl: "/universities/uaic.png",
    website: "info.uaic.ro",
    duration: 3,
    credits: 180,
    language: "Română / Engleză",
    budgetSeats: 220,
    feeSeats: 180,
    yearlyFee: 3800,
    minGrade: 7.80,
    difficulty: 7.2,
    dropoutRate: 22,
    employmentRate: 85,
    admissionProcess: "100% Nota BAC",
    admissionDates: {
      registration: "5-18 Iulie",
      exam: "N/A - doar dosar",
      results: "20 Iulie"
    },
    curriculum: {
      "Anul 1": "Programare, Matematici Discrete, Algoritmi",
      "Anul 2": "POO, Baze de Date, Rețele, Inginerie Software",
      "Anul 3": "AI, Web Avansat, Proiect Licență"
    },
    reviews: [
      {
        author: "Alexandru M.",
        status: "Absolvent 2023, acum @ Amazon",
        rating: 4,
        text: "Iași are un vibe studențesc unic. Costul vieții e mai mic."
      }
    ]
  },
  {
    id: 6,
    name: "Automatică și Calculatoare",
    university: "Universitatea Politehnica Timișoara",
    shortName: "UPT",
    city: "Timișoara",
    county: "Timiș",
    logo: "star",
    logoUrl: "/universities/upt.png",
    website: "ac.upt.ro",
    duration: 4,
    credits: 240,
    language: "Română / Engleză",
    budgetSeats: 160,
    feeSeats: 100,
    yearlyFee: 4500,
    minGrade: 8.00,
    difficulty: 7.5,
    dropoutRate: 14,
    employmentRate: 88,
    admissionProcess: "50% Nota BAC + 50% Test grilă",
    admissionDates: {
      registration: "1-15 Iulie",
      exam: "18-19 Iulie",
      results: "22 Iulie"
    },
    curriculum: {
      "Anul 1": "Matematică, Fizică, Programare C",
      "Anul 2": "Structuri de Date, OOP, Microcontrolere",
      "Anul 3": "Rețele, Sisteme Distribuite, Embedded",
      "Anul 4": "Specializare, Internship, Diplomă"
    },
    reviews: [
      {
        author: "Cristina B.",
        status: "Anul 4",
        rating: 4,
        text: "Timișoara e super pentru IT. Continental, Hella au birouri aici."
      }
    ]
  }
];

// ==================== COMPANIES ====================

export const COMPANIES = [
  {
    id: 1,
    name: "Google",
    logo: "G",
    tagline: "Organize the world's information",
    description: "Google este una dintre cele mai inovatoare companii de tehnologie din lume. Biroul din București se concentrează pe Cloud, AI și Engineering.",
    story: "Prezentă în România din 2017, echipa Google București a crescut constant și lucrează pe proiecte cu impact global.",
    benefits: [
      "Remote/Hybrid flexibil",
      "Salariu top-of-market + bonus anual",
      "Asigurare medicală premium pentru familie",
      "Mâncare gratuită în birou",
      "Learning budget €5,000/an",
      "Concediu parental extins (6 luni)",
      "25 zile concediu"
    ],
    cities: ["București"],
    employees: "1,000+ în România",
    website: "careers.google.com",
    hrEmail: "romania-careers@google.com",
    hrPhone: "+40 21 529 6789",
    openPositions: [
      { title: "Junior Frontend Developer", type: "Full-time", experience: "0-2 ani" },
      { title: "Frontend Developer", type: "Full-time", experience: "2-4 ani" },
      { title: "Senior Frontend Developer", type: "Full-time", experience: "4+ ani" },
      { title: "Frontend Developer Intern", type: "Internship", experience: "Student" }
    ]
  },
  {
    id: 2,
    name: "Endava",
    logo: "E",
    tagline: "We engineer solutions that reshape industries",
    description: "Endava este o companie globală de tehnologie cu prezență puternică în România.",
    story: "Cu peste 5,000 de angajați în România, Endava e unul dintre cei mai mari angajatori IT.",
    benefits: [
      "Work from home 3 zile/săptămână",
      "Salariu competitiv + bonusuri",
      "Asigurare medicală privată",
      "Training și certificări plătite",
      "Career path clar definit"
    ],
    cities: ["București", "Cluj-Napoca", "Iași", "Timișoara"],
    employees: "5,000+ în România",
    website: "careers.endava.com",
    hrEmail: "careers.romania@endava.com",
    hrPhone: "+40 21 407 8200",
    openPositions: [
      { title: "Junior Frontend Developer", type: "Full-time", experience: "0-1 ani" },
      { title: "Frontend Developer", type: "Full-time", experience: "1-3 ani" },
      { title: "Senior Frontend Developer", type: "Full-time", experience: "3+ ani" }
    ]
  },
  {
    id: 3,
    name: "UiPath",
    logo: "U",
    tagline: "The leader in enterprise automation",
    description: "UiPath este cel mai mare unicorn tech din România, specializat în RPA.",
    story: "Fondată în România în 2005, UiPath a devenit lider mondial în automatizare.",
    benefits: [
      "Remote-first culture",
      "Equity + salariu competitiv",
      "Asigurare premium + mental health support",
      "Stock options pentru toți angajații",
      "Offsites internaționale"
    ],
    cities: ["București"],
    employees: "3,000+ în România",
    website: "uipath.com/careers",
    hrEmail: "careers@uipath.com",
    hrPhone: "+40 31 620 0000",
    openPositions: [
      { title: "Frontend Developer", type: "Full-time", experience: "2+ ani" },
      { title: "Senior Frontend Developer", type: "Full-time", experience: "4+ ani" },
      { title: "React Developer Intern", type: "Internship", experience: "Student" }
    ]
  },
  {
    id: 4,
    name: "Adobe",
    logo: "A",
    tagline: "Creativity for all",
    description: "Adobe e creatorul Photoshop, Illustrator, și a întregii suite Creative Cloud.",
    story: "Adobe în București se concentrează pe engineering pentru produsele folosite de milioane de creativi.",
    benefits: [
      "Hybrid work model",
      "Salariu premium + bonus",
      "Health & dental insurance",
      "Acces gratuit la toate produsele Adobe",
      "26 zile concediu"
    ],
    cities: ["București"],
    employees: "500+ în România",
    website: "adobe.com/careers",
    hrEmail: "careers-romania@adobe.com",
    hrPhone: "+40 21 305 7000",
    openPositions: [
      { title: "Frontend Developer", type: "Full-time", experience: "2-4 ani" },
      { title: "Senior UI Developer", type: "Full-time", experience: "5+ ani" }
    ]
  },
  {
    id: 5,
    name: "Bitdefender",
    logo: "B",
    tagline: "The Global Leader in Cybersecurity",
    description: "Bitdefender este companie românească, lider global în securitate cibernetică.",
    story: "Fondată în 2001 în România, Bitdefender protejează peste 500 milioane de sisteme worldwide.",
    benefits: [
      "Hybrid work",
      "Salariu competitiv + bonus performanță",
      "Asigurare medicală privată",
      "Training & conferințe plătite",
      "Produse Bitdefender gratuite"
    ],
    cities: ["București", "Iași", "Cluj-Napoca", "Timișoara"],
    employees: "1,800+ în România",
    website: "bitdefender.com/company/jobs",
    hrEmail: "jobs@bitdefender.com",
    hrPhone: "+40 21 206 3470",
    openPositions: [
      { title: "Junior Frontend Developer", type: "Full-time", experience: "0-1 ani" },
      { title: "Frontend Developer", type: "Full-time", experience: "2+ ani" }
    ]
  }
];

// ==================== AI MENTORS ====================

export const AI_MENTORS: Record<number, {
  name: string;
  role: string;
  company: string;
  years: number;
  avatar: string;
  responses: Record<string, string>;
}> = {
  101: {
    name: "Alexandra",
    role: "Senior Frontend Developer",
    company: "Google",
    years: 5,
    avatar: "user",
    responses: {
      greeting: "Salut! Sunt Alexandra, lucrez ca Frontend Developer la Google de 5 ani. Am început ca intern și am crescut până la Senior. Întreabă-mă orice despre carieră, interviuri, sau viața de zi cu zi ca developer!",

      dayInLife: `O zi tipică pentru mine arată cam așa:

9:30 - Ajung la birou (sau deschid laptopul de acasă), îmi fac cafeaua și check la Slack/email.

10:00 - Stand-up cu echipa (15 min). Fiecare spune ce a făcut ieri, ce face azi, și dacă are blocaje.

10:30-13:00 - Focus time! Cea mai productivă perioadă pentru coding. Lucrez la features noi sau bug fixes. Am notificările pe mute.

13:00-14:00 - Prânz. La Google avem cantină gratuită.

14:00-16:00 - Meetings - code review, sync cu designerii, planning.

16:00-18:00 - Mai fac coding sau pair programming cu juniorii.

Flexibilitatea e mare - lucrez 2-3 zile de acasă.`,

      salary: `Sincer vorbind despre salarii în București pentru Frontend:

Junior (0-2 ani): 5,000 - 7,500 RON net
Mid (2-4 ani): 8,000 - 12,000 RON net
Senior (4+ ani): 12,000 - 18,000 RON net
Lead/Principal: 18,000 - 25,000+ RON net

La Google suntem spre upper-end, plus beneficii care adaugă 30-50% din valoare.

Sfatul meu: nu te concentra doar pe salariu la început. Primii ani sunt despre învățat.`,

      interview: `Procesul la Google arată cam așa:

1. Recruiter screen (30 min) - discuție generală.

2. Technical phone screen (45 min) - coding live. Algoritmi și data structures, medium difficulty.

3. Onsite (virtual acum) - 4-5 interviuri:
   - 2x Coding (algoritmi, LeetCode style)
   - 1x Frontend specific (DOM, browser, React patterns)
   - 1x System Design
   - 1x Behavioral

Tips:
- LeetCode medium e suficient
- Înțelege bine React fundamentals
- Vorbește în timp ce gândești
- Pregătește povești despre proiecte folosind STAR method`,

      learn: `Pentru cineva care vrea să devină Frontend Developer:

Fundamente (nu sări peste ele!):
1. HTML semantic - accesibilitate, SEO basics
2. CSS în profunzime - Flexbox, Grid, responsive
3. JavaScript SOLID - async/await, closures

Framework:
4. React (cel mai căutat) - hooks, state management
5. TypeScript - devine obligatoriu

Tooling:
6. Git - trebuie să fie a doua natură
7. Bundlers basics - Webpack/Vite concepts

Practică:
8. Fă PROIECTE, nu doar tutoriale
9. Contribuie pe open source
10. Participă la hackathoane`,

      default: "Întrebare bună! Poți să-mi dai mai multe detalii despre ce te interesează specific? Sunt aici să te ajut cu orice legat de cariera în frontend development."
    }
  },
  102: {
    name: "Mihai",
    role: "Backend Team Lead",
    company: "UiPath",
    years: 7,
    avatar: "user",
    responses: {
      greeting: "Hey! Sunt Mihai, Backend Team Lead la UiPath. Am 7 ani de experiență. Zi-mi cum te pot ajuta!",

      dayInLife: `Ca Team Lead, ziua mea e un mix de coding și people management:

Morning: Check la metrici și alerts.
Mid-day: 1:1 cu membrii echipei, architectural discussions, code reviews.
Afternoon: Hands-on coding - încă scriu cod ~50% din timp.

Cel mai mult îmi place că pot avea impact atât tehnic cât și pe oameni.`,

      salary: `Pentru Backend în România:

Junior: 5,500 - 8,000 RON net
Mid: 9,000 - 14,000 RON net
Senior: 14,000 - 22,000 RON net
Lead/Architect: 22,000+ RON net

Backend tinde să fie ușor mai bine plătit decât frontend.`,

      learn: `Path-ul meu recomandat:

1. Un limbaj bine - Python sau Node.js pentru început
2. Baze de date - SQL obligatoriu, apoi NoSQL
3. API Design - REST, apoi GraphQL
4. Docker - containerizare basics
5. Cloud - AWS sau GCP basics
6. System Design - cum scalezi

Cartea 'Designing Data-Intensive Applications' e biblia pentru backend.`,

      default: "Good question! Spune-mi mai multe despre ce te interesează specific."
    }
  }
};

// ==================== GENERATED CV MOCK ====================

export const GENERATED_CV = {
  personalInfo: {
    name: "Pica Ovidiu Stefan",
    title: "Junior Frontend Developer",
    email: "pica.ovidiu@email.com",
    phone: "+40 722 123 456",
    location: "București, România",
    linkedin: "linkedin.com/in/pica-ovidiu-stefan",
    github: "github.com/pica-ovidiu-stefan"
  },
  summary: "Student pasionat de dezvoltare web cu experiență practică în React și JavaScript. Am participat la hackathoane și am realizat proiecte freelance pentru clienți internaționali.",
  skills: {
    technical: ["JavaScript (ES6+)", "React", "HTML5/CSS3", "Python", "Git", "SQL basics", "Figma"],
    soft: ["Problem Solving", "Teamwork", "Self-learning", "Communication"]
  },
  experience: [
    {
      title: "Freelancer Web Development",
      company: "Upwork",
      period: "2023 - Prezent",
      description: [
        "Dezvoltare landing pages pentru clienți internaționali",
        "Implementare designuri responsive cu React și Tailwind CSS"
      ]
    },
    {
      title: "Voluntar IT",
      company: "Crucea Roșie România",
      period: "2023",
      description: [
        "Digitalizarea documentelor",
        "Creare sistem tracking donații"
      ]
    }
  ],
  education: [
    {
      degree: "Student - Automatică și Calculatoare",
      institution: "Universitatea Politehnica București",
      period: "2022 - Prezent",
      details: "Anul 2"
    }
  ],
  projects: [
    {
      name: "Portfolio Personal",
      description: "Website cu React și Tailwind CSS",
      technologies: ["React", "Tailwind CSS", "Vercel"]
    },
    {
      name: "Task Manager App",
      description: "Locul 3 la HackTM 2023",
      technologies: ["React Native", "Firebase"]
    }
  ],
  certifications: [
    {
      name: "Google Digital Marketing Certificate",
      issuer: "Google / Coursera",
      year: "2024"
    }
  ],
  languages: [
    { name: "Română", level: "Nativ" },
    { name: "Engleză", level: "C1" },
    { name: "Franceză", level: "B1" }
  ]
};

// ==================== HELPER FUNCTIONS ====================

export function getJobsByCategory(categoryId: number) {
  return JOBS.filter(job => job.categoryId === categoryId);
}

export function getJobById(jobId: number) {
  return JOBS.find(job => job.id === jobId);
}

export function getCategoryById(categoryId: number) {
  return CAREER_CATEGORIES.find(cat => cat.id === categoryId);
}

export function getFacultyById(facultyId: number) {
  return FACULTIES.find(fac => fac.id === facultyId);
}

export function getCompanyById(companyId: number) {
  return COMPANIES.find(comp => comp.id === companyId);
}

export function getMentorForJob(jobId: number) {
  return AI_MENTORS[jobId] || AI_MENTORS[101];
}

export function filterFacultiesByCounty(county: string) {
  if (!county) return FACULTIES;
  return FACULTIES.filter(f => f.county === county);
}

export function getMatchColor(percentage: number): string {
  if (percentage >= 80) return "text-[#16A34A]";
  if (percentage >= 60) return "text-[#2563EB]";
  if (percentage >= 40) return "text-[#CA8A04]";
  return "text-[#64748B]";
}

export function getMentorResponse(jobId: number, message: string): string {
  const mentor = getMentorForJob(jobId);
  if (!mentor) return "Nu am putut găsi un mentor pentru acest job.";

  const responses = mentor.responses;
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('zi') || lowerMsg.includes('day') || lowerMsg.includes('faci')) {
    return responses.dayInLife;
  }
  if (lowerMsg.includes('salar') || lowerMsg.includes('bani') || lowerMsg.includes('câștig') || lowerMsg.includes('platit')) {
    return responses.salary;
  }
  if (lowerMsg.includes('interviu') || lowerMsg.includes('interview') || lowerMsg.includes('angaj')) {
    return responses.interview;
  }
  if (lowerMsg.includes('învăț') || lowerMsg.includes('learn') || lowerMsg.includes('curs') || lowerMsg.includes('recomand') || lowerMsg.includes('inceput') || lowerMsg.includes('incep')) {
    return responses.learn;
  }

  return responses.default;
}
