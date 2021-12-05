import { TransactionEvent } from "forta-agent"
const UniswapFactoryV3 = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
const abi = `event FeeAmountEnabled(uint24 indexed fee, int24 indexed tickSpacing)`


export interface IFilter{
    (tx:TransactionEvent):string[]
}
export default function(tx:TransactionEvent):string[]{
    const result:string[] = []
    
    const logs = tx.filterLog(abi, UniswapFactoryV3)
    for (let log of logs){
        result.push(log.args.fee.toString())
    }
    
    return result
}
