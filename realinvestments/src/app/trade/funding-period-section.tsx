"use client"

import { useState } from "react"
import { LayoutGroup, AnimatePresence } from "framer-motion"
import { InvestmentOpportunityCard, type InvestmentOpportunity } from "./investment-opportunity-card"
import { ExpandedPropertyView } from "./expanded-property-view"

type FundingPeriodSectionProps = {
  opportunities: InvestmentOpportunity[]
}

export function FundingPeriodSection({ opportunities }: FundingPeriodSectionProps) {
  const [expandedOpportunity, setExpandedOpportunity] = useState<InvestmentOpportunity | null>(null)

  const handleClose = () => {
    setExpandedOpportunity(null)
  }

  return (
    <LayoutGroup>
      <section className="mt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Funding period
          </h2>
          <p className="mt-2 text-base text-white/70">
            Active property raises currently accepting commitments
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {opportunities.map((opportunity) => (
            <InvestmentOpportunityCard
              key={opportunity.code}
              opportunity={opportunity}
              onExpand={() => setExpandedOpportunity(opportunity)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {expandedOpportunity && (
          <ExpandedPropertyView
            key="expanded-view"
            opportunity={expandedOpportunity}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}

