import dotenv from "dotenv";
dotenv.config();

import { RazorpayService } from "../src/modules/payments/razorpay.service";
import crypto from "crypto";

async function runTests() {
  console.log("=== RAZORPAY INTEGRATION VERIFICATION TEST ===");

  const razorpayService = new RazorpayService();

  // Test 1: Order Creation with Razorpay API (Test Mode)
  console.log("\n[TEST 1] Testing Razorpay Order Creation via SDK...");
  try {
    const order = await razorpayService.createRazorpayOrder({
      amount: 49900, // 49900 paise = ₹499
      currency: "INR",
      receipt: `test_rcpt_${Date.now()}`,
    });

    console.log("✅ Order created successfully!");
    console.log(`- Gateway Order ID: ${order.id}`);
    console.log(`- Amount: ₹${order.amount / 100} (${order.amount} paise)`);
    console.log(`- Currency: ${order.currency}`);

    if (!order.id || !order.id.startsWith("order_")) {
      throw new Error(`Unexpected order ID format: ${order.id}`);
    }

    // Test 2: Signature Verification with authentic HMAC-SHA256
    console.log("\n[TEST 2] Testing Payment Signature Verification (Valid Signature)...");
    const fakePaymentId = `pay_test_${Date.now()}`;
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

    const validSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${order.id}|${fakePaymentId}`)
      .digest("hex");

    const isValid = razorpayService.verifyPaymentSignature({
      razorpay_order_id: order.id,
      razorpay_payment_id: fakePaymentId,
      razorpay_signature: validSignature,
    });

    if (isValid) {
      console.log("✅ Valid signature successfully verified!");
    } else {
      console.error("❌ Valid signature failed verification!");
      process.exit(1);
    }

    // Test 3: Signature Verification with tampered/invalid signature
    console.log("\n[TEST 3] Testing Payment Signature Verification (Tampered Signature)...");
    const tamperedSignature = "invalid_signature_hex_code_1234567890abcdef";
    const isInvalidRejected = !razorpayService.verifyPaymentSignature({
      razorpay_order_id: order.id,
      razorpay_payment_id: fakePaymentId,
      razorpay_signature: tamperedSignature,
    });

    if (isInvalidRejected) {
      console.log("✅ Tampered signature correctly rejected!");
    } else {
      console.error("❌ Tampered signature was falsely accepted!");
      process.exit(1);
    }

    console.log("\n=== ALL INTEGRATION TESTS PASSED SUCCESSFULLY ===");
  } catch (err: any) {
    console.error("❌ Test failed:", err.message || err);
    process.exit(1);
  }
}

runTests();
