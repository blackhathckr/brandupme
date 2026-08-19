"use client";

import { useMemo, useState } from "react";
import {
  ADD_ON_PLANS,
  PRIMARY_PLANS,
  TESTER_DURATIONS,
  planById,
} from "@/lib/brand/plans";

/**
 * The nine steps of the Business Owner registration, transcribed from the
 * left-hand rail of the client's mockup.
 *
 * Steps 4 and 5 are captured on the step 3 screen — the mockup draws the plan,
 * the tester duration and the add-ons as three sections of one canvas while
 * still listing them as separate rail entries. Clicking rail 4 or 5 returns to
 * step 3; continuing from step 3 marks both complete and moves to step 6.
 * FLAGGED — trivially changed to three separate screens if the client prefers.
 */
export const WIZARD_STEPS = [
  { title: "Account Type", description: "Business Owner" },
  { title: "Business Information", description: "Your business details" },
  { title: "Choose Your Plan", description: "Select best plan for you" },
  { title: "Digital Micro Card (Tester)", description: "Duration selection" },
  { title: "Additional Plans (Optional)", description: "Add more plans" },
  { title: "Contact Person Details", description: "Your personal information" },
  { title: "Business Address", description: "Set your business location" },
  { title: "Business Documents", description: "Upload required documents" },
  { title: "Review & Submit", description: "Verify and submit" },
] as const;

/** Rail entries that live inside the step 3 screen. */
export const PLAN_SUBSTEPS = [4, 5];

export function useWizard() {
  const [step, setStep] = useState(3);
  const [planId, setPlanId] = useState("tester");
  const [durationDays, setDurationDays] = useState<number>(10);
  const [addOns, setAddOns] = useState<string[]>([]);

  const plan = planById(planId) ?? PRIMARY_PLANS[0];
  const needsDuration = Boolean(plan.requiresDuration);

  const primaryTotal = useMemo(() => {
    if (!needsDuration) return plan.price;
    return (
      TESTER_DURATIONS.find((d) => d.days === durationDays)?.price ?? plan.price
    );
  }, [needsDuration, plan.price, durationDays]);

  const addOnTotal = useMemo(
    () =>
      ADD_ON_PLANS.filter((a) => addOns.includes(a.id)).reduce(
        (sum, a) => sum + a.price,
        0,
      ),
    [addOns],
  );

  function toggleAddOn(id: string) {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  /** Step 3 owns rail entries 4 and 5, so continuing from it skips to 6. */
  function next() {
    setStep((s) => (s === 3 ? 6 : Math.min(s + 1, WIZARD_STEPS.length)));
  }

  function back() {
    setStep((s) => (s === 6 ? 3 : Math.max(s - 1, 1)));
  }

  function goTo(target: number) {
    setStep(PLAN_SUBSTEPS.includes(target) ? 3 : target);
  }

  return {
    step,
    goTo,
    next,
    back,
    plan,
    planId,
    setPlanId,
    needsDuration,
    durationDays,
    setDurationDays,
    addOns,
    toggleAddOn,
    primaryTotal,
    addOnTotal,
    total: primaryTotal + addOnTotal,
  };
}

export type Wizard = ReturnType<typeof useWizard>;
