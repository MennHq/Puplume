"use client";

import React, { useEffect, useState, useRef } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import Link from 'next/link';

const PADDLE_CLIENT_TOKEN = "test_b503a3450cb3219fa5267a7ef42";
const PADDLE_PRICE_ID = "pri_01m43jma0epjpm0dhn9k3rbp47";

export default function CheckoutPage() {
  const [paddle, setPaddle] = useState<Paddle>();
  const paddleRef = useRef<Paddle>();
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initializePaddle({
      environment: 'sandbox', 
      token: PADDLE_CLIENT_TOKEN,
      eventCallback: function(data) {
        if (data.name === "checkout.completed") {
          console.log("Checkout completed on marketing site!", data);
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

  return (
    <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#F5F0EA] p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#2C211B] mb-2">Get PupLume Forever</h1>
          <p className="text-[#766A63] text-sm">One-time payment of $24.99. No subscriptions.</p>
        </div>

        <div className="min-h-[450px] w-full">
          <div className="paddle-inline-frame w-full"></div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-[#766A63] hover:text-[#2C211B] font-medium underline">
            Cancel and return to home
          </Link>
        </div>

      </div>
    </div>
  );
}
