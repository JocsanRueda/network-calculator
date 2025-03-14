
import { Database,Folder,FolderCheck } from "lucide-react"
import { StatisticCard } from "../components/StatisticsCard"
import { columns, subnet } from "../components/tables/subnet/columns/columns"
import { DataTable } from "../components/tables/subnet/columns/data-table"
import { useAppContext } from "../context/AppContext"
import { Network } from "../model/network/class/network"
import { subnetNetwork } from "../utils/ip-utils"
import { Badge } from "../components/ui/badge"

export function ViewResult() {

  const {ipAdress,subnetMask,hostList}= useAppContext()


  const network= new Network(ipAdress,subnetMask)
  
  const subnet = subnetNetwork(network,hostList)

  const stats = [
    { label: "Used average", value: network.getIpUsed() + "%", description: `${network.getIpFree()}% remaining`, icon: <Database /> },
    { label: "Used Hosts", value: network.getStorage(), description: `of ${network.getNumHost()}`, icon: <FolderCheck /> },
    { label: "Total Hosts", value: network.getNumHost(), description: `${network.getNumHost() - network.getStorage()} available`, icon: <Folder /> },
   
  ];

  const data= subnet.map((item,index) => {

    return {
      id: index+1,
      domain: item.getType().Domain,
      class: item.getType().Class,
      ip: item.getIP(true),
      mask: item.getMask(true)+" /"+item.getMaskNum().toString(),
      firstIp: item.getFirstIP(true),
      lastIp: item.getLastIP(true),
      broadcast: item.getBroadcast(true),
      host: item.getNumHost().toString(),
      jump: item.getSteep()?.toString(),

    } as subnet;


  })

  

  return (
    <div className="space-y-6 p-6"> {/* Contenedor principal con espaciado y fondo */}
      {/* Sección: Network Info */}
      <div className=" p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-2">Network Information</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">IP Address:</span>
            <Badge >{network.getIP(true)}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Subnet Mask:</span>
            <Badge >{`${network.getMask(true)} / ${network.getMaskNum()}`}</Badge>
          </div>
        </div>
      </div>

      {/* Sección: Statics */}
      <div className=" p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Network Statistics</h2>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-center">
          {stats.map((stat, index) => (
            <StatisticCard
              key={index}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      {/* Sección: Table Data */}
      <div className=" p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Network Data Table</h2>
        <div className="overflow-x-auto">
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </div>
      
  )
}