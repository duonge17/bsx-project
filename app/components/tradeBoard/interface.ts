export interface OrderProps{
    price:number
    size:number
    owne:boolean
}
export interface TradeProps{
    price:number
    size:number
    time:string
}
export interface OrderBookProps{
    data:{price:number, size:number, own:boolean}[]
}
export interface TradeHistoryProps{
    data:{price:number, size:number, time:string}[]
}