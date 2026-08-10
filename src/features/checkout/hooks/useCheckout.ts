import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { OrderService } from "@/services/order.service";
import { PaymentService, loadRazorpayScript } from "@/services/payment.service";

export type Step = 1 | 2 | 3;

export function useCheckout() {
  const [step, setStep] = useState<Step>(1);
  const { items, total: totalFn, clearCart } = useCartStore();
  const totalPrice = totalFn();
  const gst = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + gst;
  const [selectedPayment, setSelectedPayment] = useState<string>("upi");

  // Address Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateName, setStateName] = useState("");

  // Placement State
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isFormValid = !!(
    name.trim() &&
    phone.trim() &&
    address.trim() &&
    city.trim() &&
    pincode.trim() &&
    stateName.trim()
  );

  const handleNextStep = () => {
    if (step === 1 && isFormValid) {
      setStep(2);
    } else if (step === 2) {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. First create local Order
      const orderResponse = await OrderService.placeOrder({
        items,
        subtotal: totalPrice,
        gst,
        total: grandTotal,
        shippingAddress: {
          name,
          phone,
          address,
          city,
          pincode,
          state: stateName,
        },
        paymentMethod: selectedPayment,
      });

      if (!orderResponse.success) {
        throw new Error("Failed to place order");
      }

      const currentOrderId = orderResponse.orderId;

      if (selectedPayment === "cod") {
        setOrderId(currentOrderId);
        clearCart();
        setStep(3);
        setLoading(false);
        return;
      }

      // 2. Standard Web Checkout (Razorpay) for Online Payment
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      const amountInPaise = grandTotal * 100;
      const razorpayOrder = await PaymentService.createRazorpayOrder({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${currentOrderId}`,
        orderId: currentOrderId,
      });

      const options = {
        key: razorpayOrder.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TGd9JVfCFfrpxa",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "Ramanayam E-Commerce",
        description: "Payment for Sacred Order #" + currentOrderId,
        order_id: razorpayOrder.order_id,
        handler: async function (response: any) {
          try {
            const verification = await PaymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: currentOrderId,
            });

            if (verification.success || verification.verified) {
              setOrderId(currentOrderId);
              clearCart();
              setStep(3);
            } else {
              setErrorMsg("Payment verification failed.");
            }
          } catch (err: any) {
            setErrorMsg(err.message || "Payment signature verification failed.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: name,
          contact: phone,
        },
        theme: {
          color: "#D97706",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setErrorMsg("Payment cancelled by user.");
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        setLoading(false);
        setErrorMsg(response.error?.description || "Payment failed. Please try again.");
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error("Failed to place order:", err);
      setErrorMsg(err.message || "An unexpected error occurred during payment checkout.");
      setLoading(false);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return {
    step,
    setStep,
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
    orderId,
    errorMsg,
    handleNextStep,
    handlePrevStep,
  };
}

export default useCheckout;
