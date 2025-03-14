"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type subnet = {
  id: number;
  domain: string;
  class: string;
  ip: string;
  mask: string;
  firstIp: string;
  lastIp: string;
  broadcast: string;
  host: string;
  jump: string;
  
};

export const columns: ColumnDef<subnet>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "domain",
    header: "Domain",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "ip",
    header: "Ip",
  },
  {
    accessorKey: "mask",
    header: "Subnet Mask",
  },
  {
    accessorKey: "firstIp",
    header: "First IP",
  },
  {
    accessorKey: "lastIp",
    header: "Last IP",
  },
  {
    accessorKey: "broadcast",
    header: "Broadcast Address",
  },
  {
    accessorKey: "host",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Host
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    accessorKey: "jump",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jump
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )},
  },
];
