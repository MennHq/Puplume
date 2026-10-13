"use client";

import React, { useEffect, useState, useRef } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import Link from 'next/link';

const PADDLE_CLIENT_TOKEN = "test_b503a3450cb3219fa5267a7ef42";
const PADDLE_PRICE_ID = "pri_01m43jma0epjpm0dhn9k3rbp47";

export default function CheckoutPage() {
  const [paddle, setPaddle] = useState<Paddle>();
  const [isCompleted, setIsCompleted] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [countdown, setCountdown] = useState(5);
  const paddleRef = useRef<Paddle | undefined>(undefined);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initializePaddle({
      environment: 'sandbox', 
      token: PADDLE_CLIENT_TOKEN,
      eventCallback: function(data) {
        if (data.name === "checkout.completed") {
          console.log("[Marketing Checkout] Payment succeeded!", data);
          const email = (data.data as any)?.customer?.email || (data.data as any)?.custom_data?.email || '';
          setCustomerEmail(email);
          setIsCompleted(true);
        }
      }
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
        paddleRef.current = paddleInstance;
        
        // Open immediately inline
        paddleInstance.Checkout.open({
          settings: {
            displayMode: 'inline',
            frameTarget: 'paddle-inline-frame',
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; min-width: 312px; background-color: transparent; border: none;'
          },
          items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }]
        });
      }
    });
  }, []);

  // Countdown timer to auto-redirect after payment
  useEffect(() => {
    if (!isCompleted) return;

    const appUrl = customerEmail 
      ? `http://localhost:3000?login=true&email=${encodeURIComponent(customerEmail)}` 
      : 'http://localhost:3000?login=true';

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = appUrl;
    }
  }, [isCompleted, countdown, customerEmail]);

  const targetAppUrl = customerEmail 
    ? `http://localhost:3000?login=true&email=${encodeURIComponent(customerEmail)}` 
    : 'http://localhost:3000?login=true';

  return (
    <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#F5F0EA] p-8 text-center">
        
        {isCompleted ? (
          <div className="py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#F3E7DA] text-[#8B5E3C] rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-sm">
              🐾
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#2C211B] mb-1">
                Payment Successful!
              </h1>
              <p className="text-[#766A63] text-sm">
                Welcome to the PupLume Pack. Lifetime access is now unlocked.
              </p>
              {customerEmail && (
                <div className="mt-3 inline-block px-3 py-1 bg-[#FFF9F2] border border-[#E8DDD3] rounded-full text-xs font-bold text-[#8B5E3C]">
                  Account: {customerEmail}
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href={targetAppUrl}
                className="w-full inline-block py-3.5 px-6 rounded-2xl bg-[#8B5E3C] hover:bg-[#6D492F] text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Go to Puppy Dashboard →
              </a>
              <p className="text-[11px] text-[#A39B96] mt-3">
                Redirecting automatically in {countdown}s...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold text-[#2C211B] mb-2">Get PupLume Forever</h1>
              <p className="text-[#766A63] text-sm">One-time payment of $24.99. No subscriptions.</p>
            </div>

            <div className="min-h-[450px] w-full">
              <div className="paddle-inline-frame w-full"></div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs text-[#766A63] hover:text-[#2C211B] font-medium underline">
                Cancel and return to home
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
