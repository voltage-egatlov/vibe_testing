// Centralized content source for both PC and Web views

export interface ProjectContent {
  title: string;
  content: string;
  image?: string;
}

export type FileContent = string | ProjectContent;

export interface PageData {
  [key: string]: FileContent;
}

export const pagesText: PageData = {
  'about.txt': `====================================
           ABOUT ME
====================================

NAME: Tej S. Chhabra
TITLE: Associate Consultant @ Mars & Co.
LOCATION: New York, New York, United States

SUMMARY:
Passionate about integrating product engineering,
data sciences, and econometrics to drive business
strategy and direction. Combining Human Factors
Engineering and Economics education from Tufts
University to solve problems through creativity,
innovation, and data.

EDUCATION:
• BS Human Factors Engineering; BA Economics
• Tufts University (2021-2025)
• GPA: 3.79 | SAT Math: 800
• Dean's List all semesters

LEADERSHIP:
• President of the Tufts Gaming Hub (1000+ Members)
• Director of Cheap Sox Improv
• Tufts Climbing Team Member

INTERESTS:
• Self-taught musician and audio engineer
• Recording and distributing music under the name 7ej
• Gaming and community building
• Improv comedy and public speaking

====================================`,

  'education.txt': `====================================
           EDUCATION
====================================

TUFTS UNIVERSITY
Medford, MA | 2021 - 2025

Degrees:
• BS Human Factors Engineering
• BA Economics

Academic Achievement:
• GPA: 3.79 / 4.0
• Dean's List: All semesters
• SAT: Math 800 | English 720

Campus Leadership:
• President, Tufts Gaming Hub (~1000 Members)
• Director, Cheap Sox Improv
• Member, Tufts Climbing Team

---

LEXINGTON HIGH SCHOOL
Lexington, MA | 2017 - 2021
Ranked Top 50 Public High Schools in US

High School Diploma

Leadership Positions:
• President, Model United Nations Club
• President, Digital Imaging and Design Club
• President, Magic Club

Community Service:
• Head of Library Leadership Council
  Cary Memorial Library (2014-2021)
• Elected leader of teen volunteer group
• Responsible for planning, marketing, and
  executing community events

====================================`,

  'project_001.txt': {
    title: 'Dynatrace Executive Sponsor Program',
    content: `====================================
   PROJECT: Dynatrace Executive Sponsor Program
====================================

ROLE: Transformation Office Intern
COMPANY: Dynatrace (NYSE: DT)
DURATION: June 2024 - September 2024

DESCRIPTION:
Led enablement initiative for high-value accounts
generating 100M+ in annual revenue to drive
customer retention through executive sponsorship.

KEY RESPONSIBILITIES:
• Program Management: Organized core team of senior
  management across all Dynatrace organizations
• Executive Communications: Developed and delivered
  enablement materials for C-suite engagement
• Stakeholder Coordination: Managed relationships
  between ~45 internal team members and vendors
• Performance Tracking: Monitored program metrics
  and customer retention indicators

TECHNOLOGIES:
- Salesforce CRM
- Excel (Advanced Analytics)
- PowerPoint (Executive Presentations)
- Atlassian Suite (Project Management)

IMPACT:
✓ Managed accounts worth 100M+ annually
✓ Coordinated cross-organizational teams
✓ Improved executive-level customer engagement
✓ Enhanced customer retention strategy

====================================`,
    image: '/projects/dynatrace.png'
  },

  'project_002.txt': {
    title: 'Evolv Digital Product Development',
    content: `====================================
    PROJECT: Evolv Digital Product Development
====================================

ROLE: Digital Product Developer Intern
COMPANY: Evolv Technology (NYSE: EVLV)
DURATION: June 2022 - August 2022

DESCRIPTION:
Contributed to new version release of Evolv's core
digital product targeting greater penetration across
multiple client archetypes in the weapons detection
industry.

KEY RESPONSIBILITIES:
• Feature Development: Designed, programmed, and
  implemented 40+ feature additions to production
• Major Feature Owner: Personally responsible for
  significant feature in the new release
• Quality Assurance: Debugged and repaired testing
  pipeline for 7-member web team
• Executive Presentations: Presented work outputs
  to company founder and CEO

TECHNOLOGIES:
- JavaScript/TypeScript
- HTML/CSS
- Git Version Control
- Testing Frameworks
- CI/CD Pipeline Tools

IMPACT:
✓ 40+ features shipped to production
✓ Major feature ownership in new release
✓ Enabled safe code deployment for entire team
✓ Direct CEO-level communication and reporting

====================================`,
    image: '/projects/evolv.png'
  },

  'project_003.txt': {
    title: 'Tufts Gaming Hub Leadership',
    content: `====================================
   PROJECT: Tufts Gaming Hub Leadership
====================================

ROLE: President & Founder
ORGANIZATION: Tufts Gaming Hub
DURATION: 2022 - Present
COMMUNITY SIZE: 1000+ Members

DESCRIPTION:
Built and led one of Tufts University's largest
student organizations, creating an inclusive gaming
community focused on engagement, events, and
community guidelines enforcement.

KEY RESPONSIBILITIES:
• Community Management: Grew organization to 1000+
  active members across multiple platforms
• Social Media Strategy: Drove engagement through
  content creation and event marketing
• Event Planning: Organized regular gaming events,
  tournaments, and social gatherings
• Conflict Resolution: Handled community guideline
  infractions and maintained positive culture
• Ethics & Standards: Established and enforced
  strong code of ethics for all members

SKILLS DEVELOPED:
- Large-scale community leadership (1000+ people)
- Social media marketing and engagement
- Event planning and execution
- Conflict resolution and mediation
- Policy development and enforcement
- Budget management
- Stakeholder communication

IMPACT:
✓ 1000+ member community built from scratch
✓ Regular high-engagement events
✓ Strong ethical culture and guidelines
✓ Positive reputation across campus
✓ Sustainable leadership transition model

====================================`,
    image: '/projects/gaming-hub.png'
  },

  'contact.sys': `====================================
        CONTACT INFORMATION
====================================

EMAIL: tej.chhabra03@gmail.com
ALTERNATE: tej.chhabra@tufts.edu

LINKEDIN: linkedin.com/in/tejchhabra
PERSONAL LINKS: linktr.ee/7ej
MUSIC: 7ej (Self-taught musician & audio engineer)

LOCATION: New York, New York
PHONE: (617) 314-1535

CURRENT STATUS: Associate Consultant @ Mars & Co.

AVAILABILITY: Open to opportunities

Feel free to reach out for:
- Consulting opportunities
- Collaboration on engineering/economics projects
- Speaking engagements
- Music collaboration
- Community building initiatives

RESPONSE TIME: Usually within 24 hours

====================================`,

  'skills.dat': `====================================
           TECHNICAL SKILLS
====================================

PROGRAMMING LANGUAGES:
  JavaScript/TypeScript  ████████████ 95%
  Python                 ███████████  90%
  R                      ██████████   85%
  STATA                  ██████████   85%
  C++                    ████████     75%
  C / C#                 ███████      70%
  Java                   ███████      70%

WEB TECHNOLOGIES:
  React.js               ████████████ 95%
  Tailwind CSS           ████████████ 95%
  HTML/CSS               ████████████ 95%
  Git                    ███████████  90%

BUSINESS & DATA TOOLS:
  Salesforce             ███████████  90%
  Excel (Advanced)       ████████████ 95%
  Atlassian Suite        ██████████   85%
  PowerPoint             ███████████  90%
  Word                   ███████████  90%

SOFT SKILLS:
  Executive Communication    ████████████ 95%
  Large Team Coordination    ███████████  90%
  Public Speaking            ████████████ 95%
  Leadership                 ████████████ 95%
  Problem Solving            ████████████ 95%

LANGUAGES:
  English (Native)       ████████████ 100%
  Italian (Proficient)   ███████████  90%
  Hindi (Basic)          ██████       60%
  Mandarin (Elementary)  ████         40%

====================================`,

  'experience.log': `====================================
        WORK EXPERIENCE
====================================

[September 2025 - Present]
ASSOCIATE CONSULTANT
Mars & Co. | New York, NY
- Strategy consulting at premier firm
- Working with Fortune 500 clients

[January 2025 - Present]
DIRECTOR OF OPERATIONS
JAV | Tampa, FL (Advisory Capacity)
- Strategic advisory role
- Operations management and optimization

[September 2024 - January 2025]
TEACHING ASSISTANT
Tufts University | Somerville, MA
- EN1 Intro to Engineering: Application of Self
  Driving Cars
- Enhanced curriculum for 31 students
- Graded multiple weekly assignments
- Brought new ideas to improve student learning

[June 2024 - September 2024]
TRANSFORMATION OFFICE INTERN
Dynatrace (NYSE: DT) | Waltham, MA
- Program Management: Organized core team of senior
  management across all Dynatrace organizations
- Executive Communications: Ran enablement for
  accounts generating 100M+ annually
- Team Coordination: Coordinated hands-on demos
  between ~45 internal team members and vendors

[June 2023 - June 2024]
SALES OPERATIONS INTERN
Dynatrace (NYSE: DT) | Waltham, MA
- Trend Analysis: Identified Salesforce issues by
  analyzing data and conferring with sales reps
- Cross-functional Workflows: Developed top-of-funnel
  skills and competitive playbook with marketing
- Problem Solving: Created Excel tracker for manual
  data verification with metric-driven insights

[May 2023 - June 2023]
CO-FOUNDER
Consulting Freelancing | Design-to-Value Agency
- Created product breakdown for AlixPartners team
- Identified key cost saving opportunities for
  contract negotiations with manufacturers
- Gave retailers leverage in vendor relationships

[June 2022 - August 2022]
DIGITAL PRODUCT DEVELOPER INTERN
Evolv Technology (NYSE: EVLV) | Waltham, MA
- Technical Programming: Designed and implemented 40+
  feature additions to production line
- Product Development: Personally responsible for
  major feature in new release
- Problem Solving: Debugged and repaired testing
  pipeline enabling safe code deployment
- Executive Communication: Presented work outputs
  to founder and CEO

[March 2021 - March 2022]
EVENING WAITSTAFF
Brookhaven at Lexington
- Managed section with 30+ customers nightly
- Focused on maintaining customer safety

[July 2019 - February 2021]
TEACHING ASSISTANT
Penguin Coding School
- Taught Python and JavaScript
- Mentored students in programming fundamentals

====================================`
};
