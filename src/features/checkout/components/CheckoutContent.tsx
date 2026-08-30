"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, CreditCard, CheckCircle } from "lucide-react";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { CheckoutWizard } from "@/features/checkout/components/CheckoutWizard";
import { CheckoutAddressForm } from "@/features/checkout/components/CheckoutAddressForm";
import { CheckoutPaymentForm } from "@/features/checkout/components/CheckoutPaymentForm";
import { CheckoutConfirmation } from "@/features/checkout/components/CheckoutConfirmation";
import { CheckoutSummary } from "@/features/checkout/components/CheckoutSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTransition } from "@/components/animations/PageTransition";
import { AnimatePresence } from "framer-motion";

const steps = [
  { num: 1, label: "Address", icon: MapPin },
  { num: 2, label: "Payment", icon: CreditCard },
  { num: 3, label: "Confirm", icon: CheckCircle },
] as const;

export function CheckoutContent() {
  const {
    step,
    items,
    totalPrice,
    gst,
    grandTotal,
    selectedPayment,
    setSelectedPayment,
    name,
    setName,
    phone,
    setPhone,
    address,
    setAddress,
    city,
    setCity,
    pincode,
    setPincode,
    stateName,
    setStateName,
    isFormValid,
    loading,
    errorMsg,
    handleNextStep,
    handlePrevStep,
  } = useCheckout();

  // Automatically scroll smoothly to top whenever step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  if (items.length === 0 && step !== 3) {
    return (
      <EmptyState
        emoji="🕉️"
        title="No Items to Checkout"
        description="Your basket is currently empty."
        buttonText="Continue Shopping"
        buttonLink="/products"
      />
    );
  }

  return (
    <>
      <div
        style={{
          paddingTop: 120,
          paddingBottom: 160,
          background: "#F5F0E8",
          minHeight: "100vh",
        }}
      >
        <div className="container" style={{ maxWidth: 1200 }}>
          {/* Progress Wizard */}
          <div style={{ marginTop: 8, marginBottom: 56 }}>
            <CheckoutWizard step={step} steps={steps} />
          </div>

          {/* Grid Layout */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48 }}
            className="checkout-layout"
          >
            {/* Step Content */}
            <div style={{ minWidth: 0 }}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <CheckoutAddressForm
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    pincode={pincode}
                    setPincode={setPincode}
                    stateName={stateName}
                    setStateName={setStateName}
                    isFormValid={isFormValid}
                    onNext={handleNextStep}
                  />
                )}

                {step === 2 && (
                  <CheckoutPaymentForm
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                    onBack={handlePrevStep}
                    onNext={handleNextStep}
                    loading={loading}
                    errorMsg={errorMsg}
                  />
                )}

                {step === 3 && <CheckoutConfirmation />}
              </AnimatePresence>
            </div>

            {/* Sidebar Summary */}
            {step !== 3 && (
              <CheckoutSummary
                items={items}
                totalPrice={totalPrice}
                gst={gst}
                grandTotal={grandTotal}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .checkout-inputs-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .wizard-bar {
            width: 40px !important;
          }
        }
      `}</style>
    </>
  );
}
