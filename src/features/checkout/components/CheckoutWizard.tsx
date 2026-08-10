import { motion } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";
import type { Step } from "../hooks/useCheckout";

interface CheckoutWizardProps {
  step: Step;
  steps: readonly { num: number; label: string; icon: LucideIcon }[];
}

export function CheckoutWizard({ step, steps }: CheckoutWizardProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          margin: "0 auto 56px",
          userSelect: "none",
        }}
      >
        {steps.map((s, i) => {
          const isActive = step === s.num;
          const isPassed = step > s.num;

          return (
            <div key={s.num} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                <motion.div
                  animate={{
                    backgroundColor: isActive || isPassed ? "#E8660A" : "#FFFFFF",
                    borderColor: isActive || isPassed ? "#E8660A" : "rgba(26,15,10,0.18)",
                    color: isActive || isPassed ? "#FFFFFF" : "rgba(26,15,10,0.4)",
                  }}
                  className="wizard-circle"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid",
                    boxShadow: isActive ? "0 4px 16px rgba(232,102,10,0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  {isPassed ? <Check size={18} strokeWidth={2.5} /> : <s.icon size={16} />}
                </motion.div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: 12,
                    color: isActive || isPassed ? "#E8660A" : "rgba(26,15,10,0.4)",
                  }}
                >
                  {s.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    height: 2,
                    background: "rgba(26,15,10,0.1)",
                    position: "relative",
                    borderRadius: 2,
                  }}
                  className="wizard-bar"
                >
                  <motion.div
                    animate={{ width: isPassed ? "100%" : "0%" }}
                    style={{
                      height: "100%",
                      background: "#E8660A",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      borderRadius: 2,
                    }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .wizard-circle {
          width: 52px;
          height: 52px;
        }
        .wizard-bar {
          width: 120px;
          margin: 0 16px 24px;
        }
        @media (max-width: 768px) {
          .wizard-circle {
            width: 44px;
            height: 44px;
          }
          .wizard-bar {
            width: 48px !important;
            margin: 0 8px 24px !important;
          }
        }
        @media (max-width: 480px) {
          .wizard-circle {
            width: 40px;
            height: 40px;
          }
          .wizard-bar {
            width: 28px !important;
            margin: 0 6px 24px !important;
          }
        }
      `}</style>
    </>
  );
}
export default CheckoutWizard;
