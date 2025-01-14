"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { NumericFormat } from 'react-number-format'

const ACCOUNT_STYLES = {
  TFSA: {
    color: '#8B2F5E', // Deep magenta/plum
  },
  RRSP: {
    color: '#F25757', // Coral red
  },
  FHSA: {
    color: '#F2994A', // Orange/coral
  }
} as const

export interface TaxAccount {
  type: 'TFSA' | 'RRSP' | 'FHSA'
  balance: number
  contributionLimit: number
  contributedThisYear: number
  yearlyLimit: number
  lifetimeContributions: number
  carryForward?: number
}

const FormattedAmount = ({ value }: { value: number }) => (
  <NumericFormat
    value={value}
    displayType="text"
    thousandSeparator=","
    decimalScale={2}
    fixedDecimalScale
    prefix="$"
    renderText={(formattedValue: string) => (
      <span className="tabular-nums">
        {formattedValue.split('').map((char, index) => (
          <span
            key={index}
            className={char === '$' ? 'opacity-50 mr-0.5' : ''}
          >
            {char}
          </span>
        ))}
      </span>
    )}
  />
)

export function TaxAccountsWidget({ accounts }: { accounts: TaxAccount[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Tax-Advantaged Accounts</h2>
      <div className="grid grid-cols-3 gap-4">
        {accounts.map((account) => {
          const styles = ACCOUNT_STYLES[account.type]
          const remainingRoom = account.contributionLimit - account.contributedThisYear
          
          return (
            <Card key={account.type}>
              <CardHeader>
                <CardTitle>{account.type}</CardTitle>
                <div className="text-2xl">
                  <FormattedAmount value={account.balance} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">This Year</span>
                    <span>
                      <FormattedAmount value={account.contributedThisYear} /> / <FormattedAmount value={account.yearlyLimit} />
                    </span>
                  </div>
                  <Progress 
                    value={(account.contributedThisYear / account.yearlyLimit) * 100} 
                    className="h-2"
                    indicatorClassName={`bg-[${styles.color}]`}
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Room</span>
                    <span>
                      <FormattedAmount value={account.contributionLimit} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lifetime Contributions</span>
                    <span>
                      <FormattedAmount value={account.lifetimeContributions} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Room</span>
                    <span className="font-medium">
                      <FormattedAmount value={remainingRoom} />
                    </span>
                  </div>
                  {account.carryForward && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carry Forward</span>
                      <span>
                        <FormattedAmount value={account.carryForward} />
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 