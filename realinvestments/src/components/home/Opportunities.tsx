import { FeeStructure } from "./FeeStructure";
import { InvestmentManagement } from "./InvestmentManagement";
import { ActiveRaises } from "./ActiveRaises";

export function Opportunities() {
  return (
    <section
      id="opportunities"
      className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
    >
      <InvestmentManagement />
      <ActiveRaises />
      <FeeStructure />
    </section>
  );
}
