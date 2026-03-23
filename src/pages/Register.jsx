import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button3D from "../components/Button3D";
import Mascot from "../components/Mascot";
import { ChevronLeft } from "lucide-react";

const AVATARS = ["🦊", "🐨", "🐬", "🦁", "🐸", "🦋", "🐙", "🦄"];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", grade: "", email: "", password: "", avatar: "🦊" });
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

  const next = () => {
    if (step < 2) setStep(s => s + 1);
    else navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-4">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/welcome")} className="p-2 rounded-xl hover:bg-muted">
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2 flex-1 justify-center">
          {[0, 1, 2].map(i => (
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
              <h2 className="text-2xl font-black mt-3">What's your name?</h2>
              <p className="text-muted-foreground text-sm mt-1">Let's get you set up!</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Full Name</label>
              </div>
              <div className="relative">
                <input
                  value={form.grade}
                  onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">School / Grade</label>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="text-center">
              <Mascot emotion="thinking" size="medium" />
              <h2 className="text-2xl font-black mt-3">Create your account</h2>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email"
                  placeholder=" "
                  className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                />
                <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Email Address</label>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    value={form.password}
                    onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setPwStrength(calcStrength(e.target.value)); }}
                    type="password"
                    placeholder=" "
                    className="peer w-full border-2 border-border rounded-2xl px-4 pt-6 pb-2 text-base font-semibold focus:border-primary outline-none transition-colors bg-card"
                  />
                  <label className="absolute left-4 top-2 text-xs font-bold text-muted-foreground peer-focus:text-primary transition-colors">Password</label>
                </div>
                {form.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= pwStrength ? strengthColors[pwStrength] : "bg-border"}`} />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-muted-foreground">{strengthLabels[pwStrength]}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center">
              <Mascot emotion="celebrating" size="medium" />
              <h2 className="text-2xl font-black mt-3">Pick your buddy!</h2>
              <p className="text-muted-foreground text-sm mt-1">This will be your avatar</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map(av => (
                <button
                  key={av}
                  onClick={() => setForm(f => ({ ...f, avatar: av }))}
                  className={`h-16 rounded-2xl text-3xl flex items-center justify-center press-3d active:translate-y-[5px] transition-all ${form.avatar === av ? "bg-primary-tint border-2 border-primary shadow-3d-primary" : "bg-card border-2 border-border shadow-3d-gray"}`}
                >
                  {av}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Social login */}
        {step < 2 && (
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
        <Button3D fullWidth onClick={next}>
          {step < 2 ? "Continue →" : "Finish Setup 🎉"}
        </Button3D>
      </div>
    </div>
  );
}