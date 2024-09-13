'use client';
import { OrderBookProps, OrderProps, TradeHistoryProps } from "./interface";
import './tradeBoard.css';
import { forwardRef, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";


const update = (snapShot: OrderProps[], update: OrderProps[]): OrderProps[] => {
    const mapA = new Map( snapShot.map(([ price, size]) => [ price, size]));
  
    update.forEach(([ price, size]) => {
      mapA.set( price, size); 
    });
    return Array.from( mapA.entries()) as OrderProps[];
};
  
const useWebSocket = ( url: string) => {
    const [ asks, setAsks] = useState< OrderProps[]>( []);
    const [ bids, setBids] = useState< OrderProps[]>( []);
    useEffect(() => {
      const socket = new WebSocket( url);
  
      socket.onopen = () => {
        console.log('WebSocket connection established');
        const subscribeMessage = JSON.stringify({
          op: 'sub',
          channel: 'book',
          product: 'BTC-PERP',
        });
        socket.send(subscribeMessage);
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      socket.onclose = (event) => {
        console.log('WebSocket closed:', event.reason);
      };
  
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
  
        if (message.type === 'snapshot' && message.channel === 'book') {
          const bids = message.data.bids as OrderProps[];
          const asks = message.data.asks as OrderProps[];
          setAsks((prevAsks) => [...asks]); 
          setBids((prevBids) => [...bids]);  
            
        }
        if (message.type === 'update' && message.channel === 'book') {
            const bidsUpdate = message.data.bids as OrderProps[];
            const asksUpdate = message.data.asks as OrderProps[];
            if(bidsUpdate[0]){
                setBids((prevBids) => update(prevBids,bidsUpdate));  
                 
            }  
            if(asksUpdate[0]){
                setAsks((prevAsks) => update(prevAsks,asksUpdate));  
                 
            }    
        }
      };
  
      return () => {
        socket.close();
      };
    }, [url]);
  
    return [asks,bids];
};
  

const OrderBook=({
    asksData, bidData
}: OrderBookProps)=>{
    const [aciveIndex,setActiveIndex]=useState<number>(1);
    const refBids=useRef < Map< number, HTMLDivElement>| null>(null);
    const refAsks=useRef < Map< number, HTMLDivElement>| null>(null);
    const scrollToTop=(index: number)=> {
        const map= getMapBids();
        const node = map.get(index);
        if(node){
            node.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start",
            });
        }
    }
    const scrollToBottom=(index: number)=> {
        const map= getMapAsks();
        const node = map.get(index);
        if(node){
            node.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end",
            });
        }
    }
    const getMapBids=()=>{
        if(!refBids.current){
            refBids.current=new Map();
        }
        return refBids.current;
    }
    const getMapAsks=()=>{
        if(!refAsks.current){
            refAsks.current=new Map();
        }
        return refAsks.current;
    }
    const buttons=[
        {
            title: 'Default',
            href: "https://app.bsx.exchange/icons/order-book-default.svg",
            scrollTo:()=>{}
        },
        {
            title: 'Bid',
            href: "https://app.bsx.exchange/icons/order-book-bid.svg",
            scrollTo:()=>{
                scrollToTop(0)
            }
        },
        {
            title:'Ask',
            href: "https://app.bsx.exchange/icons/order-book-ask.svg",
            scrollTo:()=>{
                scrollToBottom(getMapAsks().size-1);
            }
        },
    ].map(( {title, scrollTo, href}, index)=>{
        return (
            <button 
                key={ title}
                title={ title}
                className={ twMerge( "rounded p-0.5 hover:bg-gray-850 hover:opacity-100", (index===aciveIndex) ? "bg-gray-850 opacity-100": "opacity-40")}
                onClick={()=>{
                    setActiveIndex( index);
                    scrollTo();
                }}
            >
                <img src={ href} className="w-6" alt={ title}/>
            </button>
        )
    });
    const bids=bidData.sort(( a, b)=> parseFloat( a[0]) - parseFloat( b[0])).map(([ price, size], index)=>{
        return(
            <div 
                key={ price+'/'+ size} 
                className="relative text-[11px] flex cursor-pointer select-none items-center border-dashed font-mono fade-background  hover:border-b hover:border-black"
                ref={( node)=>{
                    const map = getMapBids();
                    if(node){
                        map.set( index,node);
                    }
                    return ()=>{
                        map.delete( index);
                    }
                }}
                >
                <div className="relative flex h-full flex-[0.2] justify-start"></div>
                <div className="flex-1 py-0.5 text-right text-green-700"> {price} </div>
                <div className="flex-1 text-right"> {size} </div>
                <div className="mr-2 flex-[0.6] text-right">- </div>
            </div>
        )
       
    })
    const asks=asksData.sort(( a, b)=> parseFloat( a[0]) - parseFloat( b[0])).map(([ price, size], index)=>{
        return(
            <div 
                key={price+'/'+size} 
                className="relative text-[11px] flex cursor-pointer select-none items-center border-dashed font-mono fade-background  hover:border-b hover:border-black"
                ref={( node)=>{
                    const map = getMapAsks();
                    if( node){
                        map.set( index, node);
                    }
                    return ()=>{
                        map.delete( index);
                    }
                }}
                >
                <div className="relative flex h-full flex-[0.2] justify-start"></div>
                <div className="flex-1 py-0.5 text-right text-green-700"> {price} </div>
                <div className="flex-1 text-right"> {size} </div>
                <div className="mr-2 flex-[0.6] text-right">- </div>
            </div>
        )
       
    })
    return(
        <div className= "flex w-full flex-col overflow-y-hidden flex-1">
            {/* button section */}
            <div className= "flex gap-1.5 px-3 pb-2 h-[36px]">
                {buttons}   
            </div>
            {/* board section */}
            <div className="flex min-h-0 flex-1 flex-col">
                {/* header section */}
                <div className="flex gap-1 border-y  bg-gray-900 py-2 pr-2 ">
                    <div className="flex-[0.2] text-right"></div>
                    <div className="flex-1 text-[12px] leading-4 font-medium flex items-center justify-end gap-1 text-right "> PRICE 
                    <div className="flex items-center justify-center rounded-[3px] bg-gray-850   px-1 text-[12px] font-medium"> USDC</div></div>
                    <div className="flex-1 text-[12px] leading-4 font-medium flex items-center justify-end gap-1 text-right "> SIZE 
                    <div className="flex items-center justify-center rounded-[3px] bg-gray-850  px-1 text-[12px] font-medium"> BTC</div></div>
                    <div className="flex-[0.6] text-[12px] leading-4 font-medium flex items-center justify-end gap-1 text-right "> Mine</div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col-reverse gap-0.5 scrollbar-hidden overflow-y-auto ipadMini:overflow-y-auto">
                   { aciveIndex ===1 && bids} 
                   { aciveIndex ===2 && asks} 
                </div>
            

            </div>

        </div>
    );

}

const TradeBoard=()=>{
    const [ activeIndex, setActive]= useState< number>( 0);
    const [ asks, bids]=useWebSocket( "wss://ws.bsx.exchange/ws");
 
    const buttons=[ { title:"Orderbook"}, { title:"Trade History"},]
    .map(( { title}, index)=>{
        return(
            <button 
                key={ title}
                className={ twMerge( "flex-1", (index===activeIndex) ? 'active-bttn': "" , "hover:bg-gray-850")} 
                onClick={ ()=> setActive( index)}
            >
                <div className="bsx-text-[11px] bsx-leading-4 bsx-font-medium"> {title} </div>
            </button>
        )
    })
    

    return(
        <div className= "panel flex min-h-0 flex-col w-[272px] h-[300px]">
            <div className= "bttn-group m-2 gap-2">
                { buttons}  
            </div>
            { ( activeIndex===0) && <OrderBook bidData={ bids} asksData={ asks}/>}
           
           
            
        </div>
    );
}
export default TradeBoard;
