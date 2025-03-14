import { Network } from "@/model/network/class/network";
export function numHost(mask: number):number {
  const numhost = Math.pow(2, 32 - mask) - 2;

  return numhost;
}

export function calcNumHostSubnet(mask: number, hostCount: number) {
  const numhost = numHost(mask);
  const numSubnet = Math.floor(numhost / hostCount)-2;

  return numSubnet;
}


function searchIP(ip: number[], mask: number): number[] {
  const newIp = [0, 0, 0, 0];
  const binaryIp = ip.map(octet => octet.toString(2).padStart(8, '0')).join('');
  const networkPart = binaryIp.substring(0, mask).padEnd(32, '0');
  for (let i = 0; i < 4; i++) {
    const octetBinary = networkPart.substring(i * 8, (i + 1) * 8);
    newIp[i] = parseInt(octetBinary, 2);
  }
  return newIp;
}

export function subnetNetwork(network: Network, numHostList: string[]) : Network[] {
  const host = numHostList.map(Number).sort((a, b) => b - a);
  const newIP = searchIP(network.getIP() as number[], network.getMaskNum());
  network.setIP(newIP);
  return network.subNet(host);
}

export function generateSubnetMasks() : { mask: string, prefix: string }[] {
  const masks = [];
  for (let i = 0; i <= 30; i++) {
    const mask = (0xFFFFFFFF << (32 - i)) >>> 0;
    const maskStr = [
      (mask >>> 24) & 0xFF,
      (mask >>> 16) & 0xFF,
      (mask >>> 8) & 0xFF,
      mask & 0xFF
    ].join('.');
    masks.push({ mask: maskStr, prefix: `${i}` });
  }
  return masks;
}

