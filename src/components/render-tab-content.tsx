import { ViewResult } from "@/pages/view-result";
import { useAppContext } from "../context/AppContext";
import { DefineHost } from "../pages/define-host";
import DefineNetwork from "../pages/define-network";
import { MenuItems } from "./menu-items";
import { MenuBar } from "./menu-bar";
import { enumPages } from "@/share/enum.pages";
import Home from "@/pages/home";

const RenderTabContent = () => {
  const { tabActive } = useAppContext();


  const render=()=>{

    switch (tabActive) {
    case enumPages.DEFINENETWORK:
      return <DefineNetwork />;
    case enumPages.DEFINEHOST:
      return <DefineHost />;
    case enumPages.VIEWRESULT:
      return <ViewResult/>;
    default :
      return <Home />;
    }
  }

  return<>

    <div className=" items  rounded-md flex flex-col h-screen ">
     
      <div>
        <MenuBar/>
      </div>
      
      <div className="mx-5 my-1 px-5">
       
        {
          (tabActive!==enumPages.HOME &&  <MenuItems />)
        }
      </div>
      <div className="flex-grow  mx-2 flex flex-col my-auto justify-center items-center border border-dashed rounded-lg  sm:overflow-visible">
        {render()}
      </div>
      
        
      
    </div>
   
  </>
  
};

export default RenderTabContent;