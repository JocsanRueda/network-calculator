import { useAppContext } from "@/context/AppContext";
import { createHostSchema } from "@/schema/host/host.schema";
import { numHost } from "@/utils/ip-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import PaginatioElement from "../../components/pagination";
import { Button } from "../../components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";



export function FormDefineHosts() {
  
  const { numSubNet, setHostList,setTabActive,tabActive,activePage,setActivePage,subnetMask,hostList } = useAppContext();
  const itemsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(0);

  const numHostForSubnet=numHost(parseInt(subnetMask));
  const hostSchema = createHostSchema(numHostForSubnet);

  const form = useForm<z.infer<typeof hostSchema>>({
    resolver: zodResolver(hostSchema),
    defaultValues:{
      numHost: hostList.length>0? hostList: Array(numSubNet).fill('')
    }

    
  
  });


  
  function onSubmit(values: z.infer<typeof hostSchema>) {


    setHostList(values.numHost)

    const newActivePage= [...activePage]; 
    const newTabActive=tabActive+1;
    newActivePage[newTabActive]=true;
    setActivePage(newActivePage);
    setTabActive(newTabActive);
    
  }


  
  


  const fieldNames = Array.from({length:numSubNet},(_,index) => `numHost.${index}` as `numHost.${number}`);
 
  const sumHost = fieldNames.reduce((acc, curr) => acc + parseInt(form.watch(curr)||"0"), 0);

  const remainingHost = numHostForSubnet - sumHost;

  const placeholder= remainingHost<0? "0": `1 - ${remainingHost}`;


  return (
    <div className="container mx-auto p-7 m-5 max-w-lg border rounded-lg">
      <FormProvider {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">

          {Array.from({length:Math.min(itemsPerPage,numSubNet-currentPage*itemsPerPage)},(_,index) => {
            const currentIndex = currentPage * itemsPerPage + index;
            return (
              <FormField  
                key={currentIndex}
                control={form.control}
                name={`numHost.${currentIndex}`}
                render={({ field }) => (
                  <FormItem className="grid w-full max-w-sm items-center gap-" >

                    <FormLabel className="text-sm">Num Host Network {currentIndex + 1}</FormLabel>

                    <FormControl >

                      <Input placeholder={placeholder} {...field}  />
                    
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />)
          })}
          <PaginatioElement 
            totalItems={numSubNet}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Button type="submit">Submit</Button>

        </form>
      </FormProvider>
     
      
    </div>
  );
}

export default FormDefineHosts