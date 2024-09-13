

export interface OrderBookProps{
    asksData:OrderProps[]
    bidData:OrderProps[]
}
export interface TradeHistoryProps{
    data:TradeProps[]
}

export type OrderProps=[string,string]
export type TradeProps={
    price:string
    size:string,
    time:string
}
