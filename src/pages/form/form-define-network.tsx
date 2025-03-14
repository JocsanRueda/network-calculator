import { networkSchema } from "@/schema/network/network.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { generateSubnetMasks, numHost  } from "@/utils/ip-utils";


export function FormDefineNetwork() {
  
  const {ipAdress,subnetMask,numSubNet, setTabActive,tabActive,setIpAdress, setSubnetMask, setNumSubNet, setActivePage,activePage } = useAppContext();

  const form = useForm<z.infer<typeof networkSchema>>({
    resolver: zodResolver(networkSchema),
    defaultValues: {
      ipAdress:ipAdress,
      subnetMask: subnetMask,
      numSubNet: numSubNet===0 ? "" : numSubNet.toString(),
    }
  });

  
  function onSubmit(values: z.infer<typeof networkSchema>) {
    setIpAdress(values.ipAdress);
    setSubnetMask(values.subnetMask);
    setNumSubNet(parseInt(values.numSubNet));
    const newActivePage= [...activePage];
    const newTabActive=tabActive+1;
    newActivePage[newTabActive]=true;
    setActivePage(newActivePage);
    setTabActive(newTabActive);
    
  }

  const data= generateSubnetMasks();
  const host= numHost(parseInt(form.watch('subnetMask')));

  const hostPlaceHolder = isNaN(host) ? "Enter number of subnets" : `1 - ${host}`;
 

  return (
    <div className="container mx-auto p-7  max-w-lg border rounded-lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="ipAdress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ip Address</FormLabel>
                <FormControl>
                  <Input placeholder="192.168.0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subnetMask"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subnet Mask</FormLabel>
                <FormControl>
              
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Mask" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        data.map((mask) => (
                          <SelectItem key={mask.prefix} value={mask.prefix}>{`${mask.mask}  /${mask.prefix}`}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>


                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numSubNet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Num Subnet</FormLabel>
                <FormControl>
                  <Input  {...field} placeholder={hostPlaceHolder} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
