import { useAppContext } from "@/context/AppContext";
import FormDefineHosts from "./form/form-define-hots";



export function DefineHost(){
  const {numSubNet} = useAppContext();

  const data=[];

  

  for (let i = 0; i < numSubNet; i++) {
    data.push({
      id: i,
      numSubNet: null,
      
    });
  }

  return (

    <div className="flex flex-col my-auto justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 items-center text-center">Define Host</h1>
      <FormDefineHosts /> 
    </div>
  )

}