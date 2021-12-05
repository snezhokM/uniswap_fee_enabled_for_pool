import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
} from 'forta-agent'

import eventFilter, {IFilter} from "./event_filter"

export const createHandleTransaction = (event_filter:IFilter): HandleTransaction => {
  return async (txEvent: TransactionEvent) => { 
    const findings: Finding[] = [];
    const fees = event_filter(txEvent)
    for (let fee of fees){
      findings.push(
        Finding.fromObject({
          name: "Detect Uniswap Fee Changing",
          description: "Change Uniswap fee detected",
          alertId: "FEE-UNISWAP-1",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            newFee:fee
          },
        })
       )

    }
    return findings
  }}

export default {
  handleTransaction:createHandleTransaction(eventFilter)
}