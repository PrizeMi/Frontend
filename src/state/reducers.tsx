import {dispatchType} from './context'

type AppState = {
    isModalOpen:boolean,
    loading: boolean ,
    action:string
    error: boolean,
    inactive:boolean,
}
type themeState ={
    loading:boolean,
    isLight:boolean,
}
type scrollState = {
    isScroll:boolean,
    scrollTop:number,
    scrollHeight:number,
}
export const themeReducer = (reducerState:themeState, actions: dispatchType):themeState =>{
    switch (actions.type){
        case 'loading':
            return {
                ...reducerState,
                loading:true,
            }
        case 'toogle':
            return {
                ...reducerState,
                loading:false,
                isLight:!reducerState.isLight,
            }
        default:
            return reducerState
    }
}
export const loginReducer = (reducerState:AppState, actions : dispatchType):AppState => {
    switch (actions.type) {
        case 'stopScroll':
            return{
            ...reducerState,
            isModalOpen: false,
            inactive:true,  
        }
        case 'open':
            return {
                ...reducerState,
                isModalOpen:true,
                action: actions.payload,
                inactive:true,
            }
        case 'close':{
            return{
                ...reducerState,
                isModalOpen:false,
                inactive:false,
            }
        }
        case 'loading':
            return {
                ...reducerState,
                loading: true
            }
        case 'failed':
            return {
                ...reducerState,
                loading: false,
                error: true
            }
        default:
            return reducerState
    }

}
export const scrollReducer = (reducerState:scrollState, actions : dispatchType): scrollState => {
    switch (actions.type) {
        case 'scrolling':
            return {
                ...reducerState,
                isScroll:true,
                scrollTop: actions.payload.scrollTop,
                scrollHeight: actions.payload.scrollHeight,
            }
        default:
                return reducerState
        }
     
}
// 