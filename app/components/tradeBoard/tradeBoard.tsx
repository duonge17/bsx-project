'use client';
import { OrderBookProps, OrderProps, TradeHistoryProps, TradeProps } from "./interface";
import {orderBookData, tradeHistory} from "@/app/data/data";
import './tradeBoard.css';
import { forwardRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";


const highestPrice=()=>{
    const data= [...orderBookData];
    let tempHighest= data[0];
    for( let value of data){
        if(value.price >= tempHighest.price){
            tempHighest= value;
        }
    }
    return tempHighest;
}
const lowestPrice=()=>{
    const data=[ ...orderBookData];
    let tempLowest= data[0];
    for( let value of data){
        if( value.price <= tempLowest.price ){
            tempLowest= value;
        }
    }
    return tempLowest;
}
const middlePrice=()=>{
    const highest= highestPrice();
    const lowest= lowestPrice();

    const deltaMiddlePrice= Math.round( ( highest.price + lowest.price ) / 2);
    const data=[ ...orderBookData];
    let tempMiddle= data[0];
    for( let value of data){
       if( value.price < deltaMiddlePrice) continue;
       if( value.price >= deltaMiddlePrice){
        tempMiddle= value;
        break;
       }
    }
    return tempMiddle;
}


const Order= forwardRef< HTMLDivElement, OrderProps>(
    ({ price, size, owne}, ref)=>{
    return(
        <div ref={ref} className="relative text-[11px] flex cursor-pointer select-none items-center border-dashed font-mono  hover:border-b hover:border-black">
            <div className="relative flex h-full flex-[0.2] justify-start"></div>
            <div className="flex-1 py-0.5 text-right text-green-700"> {price} </div>
            <div className="flex-1 text-right"> {size} </div>
            <div className="mr-2 flex-[0.6] text-right"> {owne ? '+': '-'} </div>
        </div>
    );
});

const Trade=({
    price,
    size,
    time
}:TradeProps)=>{
    return(
        <div className="flex gap-1 px-2 py-0.5 font-mono text-[10px] hover:bg-gray-200 bg-flash-red">
            <div className="flex-1 py-0.5 text-red-700"> {price} </div>
            <div className="flex-1 text-right"> {size} </div>
            <div className="flex-1 text-right"> {time} </div>
        </div>
    );
}

const OrderBook=({
    data
}: OrderBookProps)=>{

    const ordersRef=useRef< ( null| Map< { price: number, size: number, own: boolean}, ( HTMLDivElement| null)>)>(null);
    const [ active, setActive]=useState< boolean[]>( [ true, false, false]);

    const getMap=()=>{
        if( !ordersRef.current){
            ordersRef.current= new Map();
        }
        return ordersRef.current;
    }

    const handleClickBid=()=>{
        const map = getMap();
        const node= map.get( highestPrice());
        if( node){
            node.style.background= "hsla(240, 5.7%, 82.9%, 1)";
            node.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
                
            });
        }
        
    }

    const handleClickAsk=()=>{
        const map = getMap();
        const node= map.get( lowestPrice());
        if( node){
            node.style.background= "hsla(240, 5.7%, 82.9%, 1)";
            node.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "end",
            });
        }
    }

    const handleClickDefault=()=>{
        const map = getMap();
        const node= map.get( middlePrice());
        if( node){
            node.style.background= "hsla(240, 5.7%, 82.9%, 1)";
            node.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }

    const orders= data.sort( ( a, b)=> a.price- b.price).map( ( item, index)=> 
        <Order 
            key={ index} 
            price={ item.price} 
            size={ item.size} 
            owne={ item.own}
            ref={( node)=>{
                const map = getMap();
                map.set( item, node);
                return ()=>{
                    map.delete( item);
                }
            }}
            />
    );
    
   
    return(
        <div className= "flex w-full flex-col overflow-y-hidden flex-1">
            {/* button section */}
            <div className= "flex gap-1.5 px-3 pb-2 h-[36px]">
                <button 
                    title= "default" 
                    className={ twMerge( "rounded p-0.5 hover:bg-gray-850 hover:opacity-100", active[0] ? "bg-gray-850 opacity-100": "opacity-40")}
                    onClick={()=>{
                        handleClickDefault();
                        setActive([true,false,false]);
                        
                    }}
                    >
                    <img src="https://app.bsx.exchange/icons/order-book-default.svg" className="w-6" alt="default"/>
                </button>
                <button 
                    title="bid" 
                    className={ twMerge("rounded p-0.5 hover:bg-gray-850 hover:opacity-100", active[1] ? "bg-gray-850 opacity-100": "opacity-40")}
                    onClick={()=>{
                        handleClickBid();
                        setActive([false,true,false]);
                    }}
                    >
                    <img src= "https://app.bsx.exchange/icons/order-book-bid.svg" className= "w-6" alt= "bid"/>
                </button>
                <button 
                    title= "ask" 
                    className={ twMerge( "rounded p-0.5 hover:bg-gray-850 hover:opacity-100", active[2] ? "bg-gray-850 opacity-100": "opacity-40")}
                    onClick={()=>{
                        handleClickAsk();
                        setActive( [ false, false, true]);
                    }}
                    >
                    <img src= "https://app.bsx.exchange/icons/order-book-ask.svg" className= "w-6" alt= "ask"/>
                </button>
            </div>
            {/* board section */}
            <div className="flex min-h-0 flex-1 flex-col">
            
                {/* header section */}
                <div className="flex gap-1 border-y  bg-gray-900 py-2 pr-2 ">
                    <div className="flex-[0.2] text-right"></div>
                    <div className="text-[12px] leading-4 font-medium flex flex-1 items-center justify-end gap-1 text-right "> PRICE 
                    <div className="flex items-center justify-center rounded-[3px] bg-gray-850   px-1 text-[12px] font-medium"> USDC</div></div>
                    <div className="text-[12px] leading-4 font-medium flex flex-1 items-center justify-end gap-1 text-right "> SIZE 
                    <div className="flex items-center justify-center rounded-[3px] bg-gray-850  px-1 text-[12px] font-medium"> BTC</div></div>
                    <div className="text-[12px] leading-4 font-medium flex flex-[0.6] items-center justify-end gap-1 text-right "> Mine</div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col-reverse gap-0.5 scrollbar-hidden overflow-y-auto ipadMini:overflow-y-auto">
                    {orders}
                </div>
            

            </div>

        </div>
    );

}
const TradeHistory=({
    data
}:TradeHistoryProps)=>{
   
    const trades=data.map( item=> 
        <Trade price={ item.price} size={ item.size} time={ item.time}/>
    )
   
    return(
        <div className="flex w-full flex-col overflow-y-hidden flex-1">
           
            {/* board section */}
            <div className="flex min-h-0 flex-1 flex-col">
                {/* header section */}
                <div className="flex gap-1 overflow-hidden border-y p-2 bg-gray-900" >
                    <div className="text-[11px] leading-4 font-medium flex flex-1 items-center justify-start gap-1"> PRICE 
                        <div className="text-[11px] leading-[14px] font-medium self-center rounded bg-gray-850 px-1 "> USDC</div>
                    </div>
                    <div className="text-[11px] leading-4 font-medium flex flex-1 items-center justify-end gap-1 text-right"> SIZE 
                        <div className="text-[11px] leading-[14px] font-medium self-center rounded bg-gray-850 px-1 "> BTC</div>
                    </div>
                    <div className="text-[11px] leading-4 font-normal flex-1 text-right"> TIME</div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col-reverse gap-0.5 scrollbar-hidden overflow-y-auto ipadMini:overflow-y-auto">
                    {trades}
                </div>
            

            </div>

        </div>
    );

}


const TradeBoard=()=>{
    const [ active, setActive]= useState< boolean[]>( [ true, false]);
    return(
        <div className= "panel flex min-h-0 flex-col w-[272px] h-[300px]">
            <div className= "bttn-group m-2 gap-2">
                <button 
                    className={ twMerge( "flex-1", active[0] ? 'active-bttn': "" , "hover:bg-gray-850")} 
                    onClick={ ()=> setActive( [ true, false])}
                >
                    <div className="bsx-text-[11px] bsx-leading-4 bsx-font-medium"> Orderbook </div>
                </button>
                <button 
                    className={ twMerge(" flex-1", active[1] ? 'active-bttn': "", "hover:bg-gray-850")} 
                    onClick={ ()=> setActive( [ false, true])}
                >
                    <div className="bsx-text-[11px] bsx-leading-4 bsx-font-medium"> Trade History </div>
                </button>
            </div>
            { active[0] && <OrderBook data={ orderBookData}/>}
            { active[1] && <TradeHistory data={ tradeHistory}/>}
            
        </div>
    );
}
export default TradeBoard;
