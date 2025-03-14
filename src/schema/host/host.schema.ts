import { z } from "zod";

const host = z.string().refine((val) => {
  const num = parseInt(val, 10);
  return !isNaN(num) && num > 0 && Number.isInteger(num);
}, {
  message: "Host should be a positive integer"
});

const createHostSchema = (maxHosts: number) => z.object({
  numHost: z.array(host).nonempty("All fields are required"),
}).superRefine((values, ctx) => {
  const hostList = values.numHost.map((item) => parseInt(item, 10) || 0);

  hostList.forEach((hostValue, index) => {

   
    if (hostValue > maxHosts) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Host value (${hostValue}) exceeds the maximum allowed (${maxHosts})`,
        path: ["numHost", index],
      });
    }

    const partialTotal= hostList.slice(0,index+1).reduce((acc, curr) => acc + curr, 0);

    if(partialTotal>maxHosts){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Total number of hosts exceeds the maximum total allowed (${maxHosts})`,
        path: ["numHost", index],
      });
    }
  });

  const totalHosts = hostList.reduce((acc, curr) => acc + curr, 0);
  if (totalHosts > maxHosts) {
    hostList.forEach((_, index) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Total number of hosts exceeds the maximum total allowed (${maxHosts})`,
        path: ["numHost", index],
      });
    });
  
  }
});

export { createHostSchema };