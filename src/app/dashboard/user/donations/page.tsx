'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HandHeart, CreditCard, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function DonationPage() {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (!amount) return;
    setStep(2);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="border-none shadow-2xl overflow-hidden">
              <CardHeader className="bg-primary text-white p-8 text-center pb-12">
                <HandHeart className="mx-auto mb-4" size={48} />
                <CardTitle className="text-3xl">Make an Impact</CardTitle>
                <p className="text-indigo-100 mt-2">Your contribution helps provide food and shelter.</p>
              </CardHeader>
              <CardContent className="p-8 -mt-8 bg-white rounded-t-3xl space-y-8">
                <div className="grid grid-cols-3 gap-3">
                  {['25', '50', '100'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={cn(
                        "py-4 rounded-xl font-bold transition-all border-2",
                        amount === val ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-100 hover:border-primary/50"
                      )}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                    <Input 
                      type="number" 
                      placeholder="Custom Amount" 
                      className="h-16 pl-12 text-xl font-bold rounded-2xl border-slate-200"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <Button variant="premium" className="w-full h-14 text-xl rounded-2xl" onClick={handleNext}>
                    Continue to Payment
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-xs py-4">
                  <ShieldCheck size={16} />
                  <span>Secure, encrypted transaction</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-none shadow-2xl overflow-hidden">
               <CardHeader className="p-8 border-b border-slate-100">
                  <CardTitle className="text-xl flex items-center gap-2">
                     <CreditCard className="text-primary" size={24} />
                     Payment Details
                  </CardTitle>
                  <p className="text-sm text-slate-500">Total amount to donate: <span className="font-bold text-slate-900">${amount}</span></p>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                        <Input placeholder="**** **** **** 4242" className="h-12" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry</label>
                           <Input placeholder="MM / YY" className="h-12" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CVC</label>
                           <Input placeholder="***" className="h-12" />
                        </div>
                     </div>
                  </div>
                  <Button variant="premium" className="w-full h-14 text-lg rounded-2xl" onClick={handlePay} disabled={isProcessing}>
                     {isProcessing ? 'Processing Donation...' : `Pay $${amount}`}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>Go Back</Button>
               </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
               <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
               <h2 className="text-3xl font-bold text-slate-900">Thank You!</h2>
               <p className="text-slate-600">Your donation of <span className="font-bold">${amount}</span> has been processed. You've just made a huge difference!</p>
            </div>
            <Card className="bg-slate-50 border-slate-100 p-6">
               <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Impact Score</span>
                  <span className="text-green-600 font-bold">+{Number(amount) * 5} pts</span>
               </div>
            </Card>
            <div className="flex flex-col gap-3">
               <Button variant="premium" className="h-12" onClick={() => window.location.href = '/dashboard/user'}>Back to Dashboard</Button>
               <Button variant="outline" className="h-12">Share Impact</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
