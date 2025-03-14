import { FormDefineNetwork } from "./form/form-define-network";




export function DefineNetwork(){


  return (
    <div className="flex flex-col my-auto justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 items-center text-center">Define Network</h1>
      <FormDefineNetwork /> 
    </div>
  )
}

export default DefineNetwork;