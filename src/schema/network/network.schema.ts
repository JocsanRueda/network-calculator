import { numHost } from "@/utils/ip-utils";
import { z } from "zod";

const networkSchema = z.object({
  ipAdress: z.string().regex(/^(\d{1,3})(\.\d{1,3}){3}$/, "invalid ip address"),
  subnetMask: z.string().regex(/^\d{1,3}$/, "invalid subnet mask").refine((val) => {
    const num = parseInt(val, 10);
    return num >= 0 && num <= 30;
  }, {
    message: "size must be between 0 and 30 inclusive",
  }),
  numSubNet: z.string().regex(/^\d*$/, "invalid size")
}).superRefine((values, ctx) => {
  const subnetMask = parseInt(values.subnetMask)
  const size = parseInt(values.numSubNet, 10);
  const maxHosts = numHost(subnetMask);

  if (size < 1 || size > maxHosts) {
    ctx.addIssue({
      code: "custom",
      path: ["numSubNet"],
      message: `size must be between 1 and ${maxHosts}`,
    });
  }
});

export { networkSchema };
