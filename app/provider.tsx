"use client"
import { store } from "@/redux/store";
import { ReactNode } from "react";


import {Provider} from "react-redux"



interface Props{
    children:ReactNode
}

export function Providers(props:Props){


    return <Provider store={store}>

   
        {props.children}

  
    </Provider>
}