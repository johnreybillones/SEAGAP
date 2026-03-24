import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button3D from "../components/Button3D";
import Mascot from "../components/Mascot";
import { ChevronLeft } from "lucide-react";

const STEP_COUNT = 4;
const AGE_OPTIONS = ["8", "9", "10", "11", "12", "13", "14", "15", "16+"];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    school: "",
    age: "",
  });
  const [pwStrength, setPwStrength] = useState(0);

  const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strengthColors = ["bg-error", "bg-reward", "bg-reward", "bg-success", "bg-success"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const passwordMatches = !form.confirmPassword || form.password === form.confirmPassword;

  const canContinue = (() => {
    if (step === 0) {
      return Boolean(form.identifier && form.password && form.confirmPassword && passwordMatches);
    }
    if (step === 1) {
      return Boolean(form.firstName.trim() && form.lastName.trim());
    }
    if (step === 2) {
      return Boolean(form.school.trim());
    }
    return Boolean(form.age);
  })();

  const next = () => {
    if (!canContinue) return;
    if (step < STEP_COUNT - 1) {
      setStep((current) => current + 1);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-4">
        <button onClick={() => step > 0 ? setStep((current) => current - 1) : navigate("/welcome")} className="p-2 rounded-xl hover:bg-muted">
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2 flex-1 justify-center">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i <= step ? "bg-primary w-8" : "bg-border w-2.5"}`} />
          ))}
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 px-6 pt-4 flex flex-col gap-6">
        {step === 0 && (
          <>
            <div className="text-center">
              <Mascot emotion="greeting" size="medium" />
              <h2 className="text-2xl font-black mt-3">Create your account</h2>
              <p className="text-muted-foreground text-sm mt-1">Start with your login details and we&apos;ll set everything up.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  value={form.identifier}
                  onChange={(e) => updateForm("identifier", e.target.value)}
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Username or Email</label>
              </div>
              <div className="relative">
                <input
                  value={form.password}
                  onChange={(e) => {
                    updateForm("password", e.target.value);
                    setPwStrength(calcStrength(e.target.value));
                  }}
                  type="password"
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Password</label>
              </div>
              {form.password && (
                <div className="space-y-1 -mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= pwStrength ? strengthColors[pwStrength] : "bg-border"}`} />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">{strengthLabels[pwStrength]}</p>
                </div>
              )}
              <div className="relative">
                <input
                  value={form.confirmPassword}
                  onChange={(e) => updateForm("confirmPassword", e.target.value)}
                  type="password"
                  placeholder=" "
                  className={`peer w-full border-2 rounded-2xl px-4 pt-6 pb-2 text-base font-semibold outline-none transition-colors bg-card ${passwordMatches ? "border-border focus:border-primary" : "border-error focus:border-error"}`}
                />
                <label className={`absolute left-4 top-2 text-xs font-bold transition-colors ${passwordMatches ? "text-muted-foreground peer-focus:text-primary" : "text-error"}`}>Confirm Password</label>
              </div>
              {!passwordMatches && (
                <p className="text-xs font-bold text-error px-1">Your passwords don&apos;t match yet.</p>
              )}
              <div className="rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Quick Tip</p>
                <p className="text-sm font-semibold text-foreground mt-1">Use an email if you want easy sign in later, or a username if this is a school-only account.</p>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="text-center">
              <Mascot emotion="thinking" size="medium" />
              <h2 className="text-2xl font-black mt-3">What&apos;s your name?</h2>
              <p className="text-muted-foreground text-sm mt-1">We&apos;ll use this on your profile and leaderboard.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  value={form.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">First Name</label>
              </div>
              <div className="relative">
                <input
                  value={form.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Last Name</label>
              </div>
              <div className="rounded-2xl bg-primary-tint border-2 border-primary/20 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">Preview</p>
                <p className="text-sm font-extrabold text-foreground mt-1">
                  {(form.firstName || "First")} {(form.lastName || "Last")}
                </p>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center">
              <Mascot emotion="encouraging" size="medium" />
              <h2 className="text-2xl font-black mt-3">What&apos;s your school?</h2>
              <p className="text-muted-foreground text-sm mt-1">This helps personalize your courses and rankings.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  value={form.school}
                  onChange={(e) => updateForm("school", e.target.value)}
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">School</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Ateneo", "La Salle", "UST", "Other"].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => updateForm("school", suggestion)}
                    className={`rounded-2xl border-2 px-4 py-3 text-sm font-extrabold press-3d active:translate-y-[5px] ${form.school === suggestion ? "bg-primary-tint border-primary shadow-3d-primary" : "bg-card border-border shadow-3d-gray text-muted-foreground"}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="text-center">
              <Mascot emotion="celebrating" size="medium" />
              <h2 className="text-2xl font-black mt-3">How old are you?</h2>
              <p className="text-muted-foreground text-sm mt-1">We&apos;ll use this to tailor your learning experience.</p>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <input
                  value={form.age}
                  onChange={(e) => updateForm("age", e.target.value.replace(/[^\d+]/g, ""))}
                  inputMode="numeric"
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Age</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {AGE_OPTIONS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateForm("age", value)}
                    className={`px-4 h-9 rounded-full text-xs font-extrabold uppercase tracking-wide transition-all press-3d ${form.age === value ? "bg-primary text-primary-foreground shadow-3d-primary active:translate-y-[3px]" : "bg-card border-2 border-border text-muted-foreground active:translate-y-[3px]"}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl bg-reward-tint border-2 border-reward/30 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-reward">You&apos;re ready</p>
                <p className="text-sm font-semibold text-foreground mt-1">We&apos;ll drop you right into the main screen after this step.</p>
              </div>
            </div>
          </>
        )}

        {/* Social login */}
        {step === 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-bold text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Button3D fullWidth variant="white" size="md" onClick={() => {}}>
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="" />
              Continue with Google
            </Button3D>
            <Button3D fullWidth size="md" className="bg-[#1877F2] shadow-[0_5px_0_0_#0c5dc7] text-white" onClick={() => {}}>
              <span className="font-black">f</span> Continue with Facebook
            </Button3D>
          </div>
        )}
      </div>

      <div className="px-6 pb-12 pt-4">
        <Button3D fullWidth onClick={next} disabled={!canContinue}>
          {step < STEP_COUNT - 1 ? "Next →" : "Let's Start 🚀"}
        </Button3D>
      </div>
    </div>
  );
}
