import {  Slash } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import { useAppContext } from "@/context/AppContext";
import { Fragment } from "react/jsx-runtime";
import { enumPages } from "@/share/enum.pages";
export function MenuItems(){


  const {tabActive, setTabActive,activePage}= useAppContext();

  const handleClick= (index:number)=>{
    if (!activePage[index]) return;
    setTabActive(index)
  }

  const items=[
    {
      name:"Define Network",
      disabled:!activePage[enumPages.DEFINENETWORK]
    },{
      name:"Define Host",
      disabled:!activePage[enumPages.DEFINEHOST]
    },{
      name:"View Result",
      disabled:!activePage[enumPages.VIEWRESULT]
    }
  ]

  return <>
  
    <Breadcrumb className=" my-2">
      <BreadcrumbList>
       

        {items.map((item,index)=>{

          return <Fragment key={item.name}>
            <BreadcrumbItem >
              <BreadcrumbLink href="#" onClick={()=>handleClick(index)}  className={item.disabled ? "pointer-events-none opacity-50" : ""} >{tabActive===index? <p className="font-bold"> {item.name}</p> : item.name }</BreadcrumbLink>
            </BreadcrumbItem>
            {
              index<items.length-1 && <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            }
          </Fragment>
        })}
          
      </BreadcrumbList>
    </Breadcrumb>
  
  </>
}

