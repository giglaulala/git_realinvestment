'use client';

import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

type OpportunityOption = {
  code: string;
  name: string;
  location: string;
};

type CommitmentFormProps = {
  opportunities: OpportunityOption[];
};

type ModalState = 'closed' | 'confirm' | 'success';

export function CommitmentForm({ opportunities }: CommitmentFormProps) {
  const hasOpportunities = opportunities.length > 0;
  const [selectedCode, setSelectedCode] = useState<string>(hasOpportunities ? opportunities[0].code : '');
  const [amount, setAmount] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>('closed');
  const [pendingCommitment, setPendingCommitment] = useState<{
    opportunity: OpportunityOption;
    amount: number;
  } | null>(null);

  const selectedOpportunity = useMemo(
    () => opportunities.find((opportunity) => opportunity.code === selectedCode) ?? null,
    [opportunities, selectedCode],
  );

  const formattedAmount = pendingCommitment
    ? formatGel(pendingCommitment.amount)
    : selectedOpportunity && amount
      ? formatGel(Number(amount))
      : null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!selectedOpportunity) {
      setFormError('Select a property location before committing.');
      return;
    }

    const numericAmount = Number(amount);
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setFormError('Enter a commitment amount greater than zero.');
      return;
    }

    setPendingCommitment({
      opportunity: selectedOpportunity,
      amount: numericAmount,
    });
    setModalState('confirm');
  };

  const handleCancel = () => {
    setModalState('closed');
    setPendingCommitment(null);
  };

  const handleConfirmPurchase = () => {
    setModalState('success');
    setAmount('');
  };

  const handleCloseSuccess = () => {
    setModalState('closed');
    setPendingCommitment(null);
  };

  return (
    <>
      <form className="mt-8 grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Property SPV</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Select raise</span>
            <span className="text-xs text-white/40">Locations across Georgia</span>
          </div>
          <select
            className="mt-4 w-full rounded-xl bg-white/5 px-4 py-3 text-base text-white/90 outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-emerald-300/60"
            value={selectedCode}
            onChange={(event) => setSelectedCode(event.target.value)}
            disabled={!hasOpportunities}
          >
            {!hasOpportunities && <option value="">No properties available</option>}
            {hasOpportunities &&
              opportunities.map((opportunity) => (
                <option key={opportunity.code} value={opportunity.code}>
                  {opportunity.location} • {opportunity.name}
                </option>
              ))}
          </select>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Commitment (₾)</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Link your bank</span>
            <span className="text-xs text-white/40">Escrow handles settlement</span>
          </div>
          <input
            className="mt-4 w-full rounded-xl bg-white/5 px-4 py-3 text-base text-white/90 outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-emerald-300/60"
            placeholder="₾25,000"
            type="number"
            step="100"
            min="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-200 to-emerald-500 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_50px_rgba(134,239,172,0.5)] transition hover:scale-[1.01]"
          >
            Submit commitment
          </button>
          {formError && (
            <p className="mt-3 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {formError}
            </p>
          )}
        </div>
      </form>

      {modalState !== 'closed' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          {modalState === 'confirm' && pendingCommitment && (
            <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-white/10 p-8 text-white shadow-[0_40px_120px_rgba(15,118,110,0.35)] backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400/20">
                  <AlertTriangle className="h-6 w-6 text-emerald-200" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Confirm your commitment</h3>
                  <p className="text-sm text-white/70">
                    You&apos;re about to lock capital into a licensed escrow account. Make sure these details look correct before you proceed.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                      <span className="text-white/60">Property</span>
                      <span className="font-semibold text-white">
                        {pendingCommitment.opportunity.name}
                      </span>
                    </li>
                    <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                      <span className="text-white/60">Location</span>
                      <span className="font-semibold text-white">
                        {pendingCommitment.opportunity.location}
                      </span>
                    </li>
                    <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                      <span className="text-white/60">Commitment</span>
                      <span className="font-semibold text-emerald-300">
                        {formattedAmount}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/35 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-lime-200 to-emerald-500 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(134,239,172,0.45)] transition hover:scale-[1.02]"
                >
                  Confirm purchase
                </button>
              </div>
            </div>
          )}

          {modalState === 'success' && pendingCommitment && (
            <div className="relative w-full max-w-md rounded-3xl border border-emerald-300/40 bg-emerald-400/20 p-8 text-white shadow-[0_40px_120px_rgba(134,239,172,0.4)] backdrop-blur-xl">
              <button
                type="button"
                onClick={handleCloseSuccess}
                className="absolute right-4 top-4 rounded-full border border-emerald-200/40 p-1 text-emerald-900/80 transition hover:bg-emerald-200/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle2 className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Commitment submitted</h3>
                  <p className="text-sm text-white/80">
                    Your request to commit {formattedAmount} into {pendingCommitment.opportunity.name} has been received. Watch your inbox for escrow instructions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseSuccess}
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function formatGel(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'GEL',
    maximumFractionDigits: 0,
  });
}

