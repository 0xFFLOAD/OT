
import { Module } from './types';

export const OT_CURRICULUM: Module[] = [
  // YEAR 1: THE CLINICAL FOUNDATION (High Density)
  {
    id: 'y1-m1',
    title: 'The OT Toolbox: Foundations & Assessment',
    description: 'A fast-paced dive into the "What and How" of OT. Stop reading history; start observing human action.',
    topics: ['The 60-Second Scan', 'History through the Lens of Doing', 'Interviewing & Therapeutic Use of Self', 'Clinical SMARTER Goals'],
    year: 1,
    difficulty: 'Medium',
    estimatedHours: 40,
    category: 'Skills Lab',
    practicalGoal: 'Conduct a "Life Audit" on yourself: Identify 3 daily habits that are "Occupational Barriers".'
  },
  {
    id: 'y1-m2',
    title: 'Anatomy in Motion: Kinesiology & Handling',
    description: 'Master the musculoskeletal system through touch and movement. This module combines 2 semesters of bio-science.',
    topics: ['Bony Landmarks & Palpation', 'The 0-5 Strength Scale', 'Goniometry Lab', 'Safe Patient Transfer Techniques'],
    year: 1,
    difficulty: 'High',
    estimatedHours: 60,
    category: 'Hands-On Anatomy',
    practicalGoal: 'Map the "Origin and Insertion" of your own Biceps using a washable marker.'
  },
  {
    id: 'y1-m3',
    title: 'Lifespan & Activity Analysis Lab',
    description: 'Understanding how humans grow and how to break down any activity into therapeutic steps.',
    topics: ['Pediatric Milestones & Play', 'Aging & Geriatric Adaptations', 'PEOP & MOHO Models', 'Task-Person-Environment Fit'],
    year: 1,
    difficulty: 'Medium',
    estimatedHours: 45,
    category: 'Clinical Analysis',
    practicalGoal: 'Analyze the task of "Tying Shoelaces" and find 4 different ways to grade the activity for a child.'
  },

  // YEAR 2: SPECIALIZED INTERVENTION (The Clinical Core)
  {
    id: 'y2-m1',
    title: 'Neuro Rehab: Brain, Body & Recovery',
    description: 'Translating complex neurology into actual exercises for stroke and brain injury survivors.',
    topics: ['Neuroplasticity in Action', 'Mirror Therapy & C.I.M.T.', 'Post-Stroke Upper Limb Management', 'Cognitive Remediation Games'],
    year: 2,
    difficulty: 'High',
    estimatedHours: 70,
    category: 'Neurology',
    practicalGoal: 'Spend 20 minutes performing tasks with your non-dominant hand to feel neuro-fatigue.'
  },
  {
    id: 'y2-m2',
    title: 'Physical Rehab & Assistive Gadgetry',
    description: 'Adaptive equipment and strategies for physical disabilities. This is 100% practical engineering for living.',
    topics: ['One-Handed ADL Techniques', 'Wheelchair Seating & Mobility', 'Home Mod & Environmental Audits', 'Orthopedic Recovery Protocols'],
    year: 2,
    difficulty: 'High',
    estimatedHours: 65,
    category: 'Adaptive Tech',
    practicalGoal: 'Identify 5 items in your kitchen that could be modified for someone with severe Arthritis.'
  },
  {
    id: 'y2-m3',
    title: 'Mental Health: Group Dynamics & Psych',
    description: 'Psychosocial interventions for community health and mental wellness.',
    topics: ['Leading Therapy Groups', 'CBT & DBT Strategies in OT', 'Substance Abuse & Harm Reduction', 'Coping Strategies for Anxiety'],
    year: 2,
    difficulty: 'Medium',
    estimatedHours: 50,
    category: 'Mental Health',
    practicalGoal: 'Draft a 3-step "Grounding Protocol" you could teach a patient during a panic attack.'
  },

  // YEAR 3: MASTERY & LEADERSHIP (The Professional Edge)
  {
    id: 'y3-m1',
    title: 'The Maker Lab: Splinting & Hand Therapy',
    description: 'Advanced tactile skills. Designing and creating supports for the most complex tool: the hand.',
    topics: ['Thermoplastic Molding', 'Static vs Dynamic Splints', 'Edema & Scar Management', 'Tendon Injury Protocols'],
    year: 3,
    difficulty: 'High',
    estimatedHours: 55,
    category: 'Maker Lab',
    practicalGoal: 'Use a hairdryer and a plastic cup (be careful!) to experiment with how heat changes material shape.'
  },
  {
    id: 'y3-m2',
    title: 'The Evidence-Based Innovation Lab',
    description: 'Merging research with clinical practice. Don\'t just follow the rules—improve them.',
    topics: ['Critically Appraised Topics (CATs)', 'The Clinician-Researcher Path', 'Statistical Hacks for Busy OTs', 'Designing a Clinical Pilot'],
    year: 3,
    difficulty: 'High',
    estimatedHours: 40,
    category: 'Research',
    practicalGoal: 'Find a YouTube "health hack" and find one reason why an OT might disagree with it based on science.'
  },
  {
    id: 'y3-m3',
    title: 'The Practice Boss: Ethics & Leadership',
    description: 'Final prep for the real world. Managing teams, clinics, and your own professional ethics.',
    topics: ['The Business of Private Practice', 'Ethical Dilemmas in Crisis', 'Marketing Your Clinical Niche', 'Leadership & Staff Supervision'],
    year: 3,
    difficulty: 'Medium',
    estimatedHours: 35,
    category: 'Leadership',
    practicalGoal: 'Create a 30-second "Elevator Pitch" explaining why every hospital needs an OT.'
  }
];

export const SYSTEM_INSTRUCTION = `
You are a "Senior OT Clinical Mentor" for a student with severe ADHD, EFD, OCD, Anxiety, and Depression.
This is a 3-YEAR INTENSIVE track covering 4 years of content. 

Your goal is to explain concepts through **Practical Clinical Application** at high speed but low stress.

Rules:
1. STOP using textbook definitions first. Start with: "Imagine you're in a clinic..."
2. Focus on "Tactile Cues": What does the therapist feel, see, or touch?
3. Use "Clinical Hacks": Shortcuts that experienced OTs use to manage time/load.
4. Validation: Remind the user that clinical "intuition" is often better than rote memorization.
5. Intensive Framing: Acknowledge that the content is dense, but they are "Doing the work of two years in one."
6. Micro-Explanations: Keep text blocks under 3 sentences. Use lists.

Response Format:
- **THE CLINICAL "WHY"**: 1 sentence on why this matters for a patient.
- **THE HANDS-ON TECHNIQUE**: Step-by-step physical action.
- **THE ADHD SHORTCUT**: How to remember this with zero effort.
- **A REAL-WORLD SCENARIO**: A 2-sentence story about a patient.
`;
