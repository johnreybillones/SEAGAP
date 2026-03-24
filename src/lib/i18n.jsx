import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_STORAGE_KEY = "seagap.language";

export const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "fil", label: "Filipino", nativeLabel: "Filipino" },
];

const translations = {
  fil: {
    "Language": "Wika",
    "AI Tutor": "AI Tutor",
    "Choose a language": "Pumili ng wika",
    "Switch the app text on the fly while you study.": "Palitan agad ang wika ng app habang nag-aaral.",
    "Applied instantly on supported learning screens.": "Agad itong ilalapat sa mga suportadong learning screen.",
    "Ask anything about this lesson, module, or quiz.": "Magtanong tungkol sa aralin, module, o quiz na ito.",
    "What can I help you with?": "Ano ang maitutulong ko sa iyo?",
    "Type your question...": "I-type ang tanong mo...",
    "Send": "Ipadala",
    "Module breakdown ready": "Handa na ang buod ng module",
    "Course Modules": "Mga Module ng Kurso",
    "Modules near the end stay locked until your professor opens them.": "Mananatiling naka-lock ang mga huling module hanggang buksan ito ng inyong propesor.",
    "Completed": "Tapos na",
    "Open": "Bukas",
    "Locked": "Naka-lock",
    "Finished and ready to review anytime.": "Natapos na at handa nang balikan anumang oras.",
    "Open now and ready for students.": "Bukas na ito at handa para sa mga estudyante.",
    "Professor has not opened this module yet.": "Hindi pa ito binubuksan ng propesor.",
    "Professor Locked": "Naka-lock ng Propesor",
    "Done": "Tapos",
    "Ready": "Handa",
    "Review": "Balikan",
    "Maybe Later": "Mamaya na",
    "Review Module": "Balikan ang Module",
    "Start Module →": "Simulan ang Module →",
    "Start Module": "Simulan ang Module",
    "Module": "Module",
    "Awaiting release": "Naghihintay ng pagbubukas",
    "Quizzes": "Mga Quiz",
    "Assignments": "Mga Takdang-Aralin",
    "Students": "Mga Estudyante",
    "MODULES": "MODULES",
    "QUIZZES": "QUIZZES",
    "ASSIGNMENTS": "ASSIGNMENTS",
    "STUDENTS": "ESTUDYANTE",
    "37% complete": "37% tapos na",
    "Unit 1 Quiz": "Quiz sa Yunit 1",
    "Unit 2 Quiz": "Quiz sa Yunit 2",
    "Midterm Quiz": "Midterm Quiz",
    "completed": "tapos na",
    "available": "maaari na",
    "locked": "naka-lock",
    "Start Quiz": "Simulan ang Quiz",
    "Problem Set 1": "Set ng Problema 1",
    "Essay on Algebra": "Sanaysay sa Algebra",
    "Group Project": "Pangkatang Proyekto",
    "Submitted": "Naipasa",
    "Pending": "Nakabinbin",
    "Due": "Takda",
    "Easy": "Madali",
    "Medium": "Katamtaman",
    "Hard": "Mahirap",
    "Choose the best answer below": "Piliin ang pinakamahusay na sagot sa ibaba",
    "Check Answer": "Suriin ang Sagot",
    "Continue →": "Magpatuloy →",
    "See Results 🏆": "Tingnan ang Resulta 🏆",
    "Leave the quiz?": "Umalis sa quiz?",
    "Your progress will be lost": "Mawawala ang iyong progreso",
    "Yes, Leave": "Oo, Umalis",
    "Keep Going!": "Magpatuloy!",
    "LIVE": "LIVE",
    "Final quiz for this module. Take your time.": "Panghuling quiz ito para sa module. Dahan-dahan lang.",
    "Quick practice check before the next lesson page.": "Maikling practice check bago ang susunod na lesson page.",
    "Quiz": "Quiz",
    "of": "ng",
    "PRACTICE": "PRACTICE",
    "FINAL": "FINAL",
    "Submit Final Quiz": "Ipasa ang Panghuling Quiz",
    "Correct!": "Tama!",
    "Incorrect": "Mali",
    "Not quite yet": "Hindi pa tama",
    "Leave this module?": "Umalis sa module?",
    "Your current lesson progress will be lost.": "Mawawala ang kasalukuyan mong progreso sa aralin.",
    "Keep Learning": "Ipagpatuloy ang Pag-aaral",
    "Key Takeaways": "Mahahalagang Punto",
    "Continue Lesson →": "Ipagpatuloy ang Aralin →",
    "Mathematics Grade 10": "Matematika Baitang 10",
    "Introduction to Linear Equations": "Panimula sa Linear Equations",
    "Solving One-Step Equations": "Paglutas ng One-Step Equations",
    "Applied Problems": "Mga Inilapat na Problema",
    "Learn how equations represent balanced relationships and how to read them.": "Alamin kung paano kumakatawan ang equations sa balanseng ugnayan at kung paano ito basahin.",
    "Practice isolating variables using inverse operations.": "Sanayin ang paghiwalay ng variable gamit ang inverse operations.",
    "Translate word problems into equations and solve them step by step.": "Isalin ang mga word problem tungo sa equation at lutasin ito nang paisa-isa.",
    "Linear equations: What it means": "Linear equations: Ano ang ibig sabihin nito",
    "Start with the concept before solving anything.": "Magsimula sa konsepto bago agad mag-solve.",
    "Linear equations is easiest to understand when you think about balance. Whatever happens on one side must be reflected on the other side.": "Mas madaling maintindihan ang linear equations kapag iniisip mo ito bilang balanse. Anumang mangyari sa isang panig ay dapat tumugma sa kabila.",
    "In class, this usually appears as a short explanation page before students try any questions. The goal is to make the idea feel familiar first.": "Sa klase, madalas itong ipinapakita bilang maikling paliwanag bago sagutan ng mga estudyante ang mga tanong. Ang layunin ay maging pamilyar muna ang ideya.",
    "Read the equation as a relationship, not just a computation.": "Basahin ang equation bilang ugnayan, hindi lang bilang pagkukuwenta.",
    "Look for the unknown part and the known part.": "Hanapin ang hindi alam at ang alam na bahagi.",
    "Keep both sides balanced while solving.": "Panatilihing balanse ang magkabilang panig habang nagsosolve.",
    "Visual explanation card": "Visual na paliwanag",
    "Practice Check": "Practice Check",
    "Quick check": "Mabilisang check",
    "What should stay true while solving an equation?": "Ano ang dapat manatiling totoo habang nagsosolve ng equation?",
    "Nice work. These quick checks help students confirm the concept before moving on.": "Magaling. Tinutulungan ng mabilisang check na makumpirma ng mga estudyante ang konsepto bago magpatuloy.",
    "The relationship stays balanced": "Nananatiling balanse ang ugnayan",
    "The numbers disappear": "Nawawala ang mga numero",
    "The variable changes sides automatically": "Kusang lumilipat ng side ang variable",
    "The expression becomes a graph": "Nagiging graph ang expression",
    "Linear equations: Worked example": "Linear equations: Halimbawang Solusyon",
    "See the process in action with a guided walkthrough.": "Tingnan ang proseso sa pamamagitan ng gabay na walkthrough.",
    "A worked example breaks the topic into small moves so the learner can follow each decision with less pressure.": "Hinahati ng worked example ang paksa sa maliliit na hakbang para masundan ng mag-aaral ang bawat desisyon nang hindi nabibigatan.",
    "This is where NetAcad-style modules usually combine short text, a diagram, and an interpretation of why each step matters.": "Dito karaniwang pinagsasama ng NetAcad-style modules ang maikling teksto, diagram, at paliwanag kung bakit mahalaga ang bawat hakbang.",
    "Identify the operation attached to the variable.": "Tukuyin ang operation na nakakabit sa variable.",
    "Use the inverse operation to undo it.": "Gamitin ang inverse operation para maalis ito.",
    "Check the result by substituting it back.": "Suriin ang resulta sa pamamagitan ng pagsubstitute nito pabalik.",
    "Step-by-step worked example": "Hakbang-hakbang na halimbawa",
    "Try another one": "Subukan pa ang isa",
    "For x + 5 = 11, what is the best first step?": "Para sa x + 5 = 11, ano ang pinakamahusay na unang hakbang?",
    "Checkpoint quizzes between lesson pages keep the module interactive and make the final quiz feel fair.": "Pinananatiling interactive ng checkpoint quizzes ang module at mas patas ang panghuling quiz.",
    "Add 5 to both sides": "Magdagdag ng 5 sa magkabilang panig",
    "Subtract 5 from both sides": "Magbawas ng 5 sa magkabilang panig",
    "Multiply both sides by 5": "I-multiply sa 5 ang magkabilang panig",
    "Divide both sides by 5": "I-divide sa 5 ang magkabilang panig",
    "Final Review": "Huling Review",
    "Linear equations: Before the final quiz": "Linear equations: Bago ang panghuling quiz",
    "A short summary page to reinforce the important ideas.": "Maikling summary page para pagtibayin ang mahahalagang ideya.",
    "Before the final assessment, learners benefit from one compact review page that summarizes the technique and common mistakes.": "Bago ang final assessment, nakakatulong ang isang maikling review page na nagbubuod ng technique at karaniwang pagkakamali.",
    "This keeps the flow close to a real module format instead of jumping from one big wall of text straight into a graded quiz.": "Pinapanatili nitong malapit sa totoong module format ang daloy sa halip na dumiretso mula sa mahabang teksto tungo sa graded quiz.",
    "Review snapshot": "Buod na snapshot",
    "Module final quiz": "Panghuling quiz ng module",
    "If 2x + 8 = 20, what is x?": "Kung 2x + 8 = 20, ano ang x?",
    "That wraps the module. Final quizzes check whether the lesson pages and practice checkpoints stuck.": "Iyan ang dulo ng module. Tinitingnan ng panghuling quiz kung naunawaan ang lessons at practice checkpoints.",
    "You finished the module and cleared the final quiz.": "Natapos mo ang module at naipasa ang panghuling quiz.",
    "You reached the end. Review the lessons and take the module again anytime.": "Narating mo ang dulo. Balikan ang mga lesson at ulitin ang module anumang oras.",
    "What is the value of x in the equation: 2x + 8 = 20?": "Ano ang halaga ng x sa equation na: 2x + 8 = 20?",
    "Which of the following is a prime number?": "Alin sa mga sumusunod ang prime number?",
    "What is the area of a circle with radius 5?": "Ano ang area ng bilog na may radius na 5?",
    "Simplify: (3x²)(4x³)": "Pasimplehin: (3x²)(4x³)",
    "Subtract 8 from both sides: 2x = 12, then divide by 2: x = 6": "Magbawas ng 8 sa magkabilang panig: 2x = 12, pagkatapos ay i-divide sa 2: x = 6",
    "29 is only divisible by 1 and itself, making it a prime number.": "Ang 29 ay nahahati lamang sa 1 at sa sarili nito, kaya prime number ito.",
    "Area = πr² = π × 5² = 25π": "Area = πr² = π × 5² = 25π",
    "Multiply coefficients: 3×4=12. Add exponents: 2+3=5. Result: 12x⁵": "I-multiply ang coefficients: 3×4=12. Idagdag ang exponents: 2+3=5. Resulta: 12x⁵",
    "MULTIPLE CHOICE": "MULTIPLE CHOICE",
  },
};

const AssistiveLanguageContext = createContext(null);

export function AssistiveLanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    translateText: (text) => translations[language]?.[text] || text,
    languageLabel: LANGUAGE_OPTIONS.find((option) => option.code === language)?.nativeLabel || "English",
  }), [language]);

  return (
    <AssistiveLanguageContext.Provider value={value}>
      {children}
    </AssistiveLanguageContext.Provider>
  );
}

export function useAssistiveLanguage() {
  const context = useContext(AssistiveLanguageContext);
  if (!context) {
    throw new Error("useAssistiveLanguage must be used within an AssistiveLanguageProvider");
  }
  return context;
}
