import { classEnum, domainEnum } from "@/model/network/enum/network.enum";
import { NetworkType } from "../network.type";

export class Network {
  private ip: number[] = [];
  private mask: number[] = [];
  private maskNum: number;
  private steep: number | undefined;
  private numHost: number;
  private firstIp: number[];
  private lastIp: number[];
  private broadcast: number[];
  private type: NetworkType;
  private storage: number;

  constructor(ip: string | number[], mask: string | number[]) {
    if (typeof ip === "string") {
      this.ip = ip.split(".").map(Number);
    } else {
      this.ip = ip as number[];
    }
   
    if(typeof mask === "string") {
      this.maskNum = parseInt(mask as string);
      this.mask = this.calcMaskArrayFromMask(this.maskNum);
      
    }else{
      this.mask = mask as number[];
      this.maskNum = this.calcMaskNumFromMask(mask as number[]);
    }
    this.type = this.calcType();
    this.steep = this.calcSteep();
    this.numHost = this.calcNumHost();
    this.firstIp = this.add(1);
    this.lastIp = this.add(this.numHost);
    this.broadcast = this.add(this.numHost + 1);
    this.storage = 0;
  }

  getType() {
    return this.type;
  }

  getNumHost() {
    return this.numHost;
  }

  getBroadcast(format: boolean = false): number[] | string {
    return format ? this.broadcast.join(".") : this.broadcast;  
  }

  getSteep() {
    return this.steep;
  }

  getMask(format: boolean = false): number[] | string {
    return format ? this.mask.join(".") : this.mask;
  }


  getIpUsed(){
    return ((this.storage / this.numHost) * 100).toFixed(2);
  }

  getIpFree(){
    return (100-Number(this.getIpUsed())).toFixed(2);
  }
  
  getMaskNum() : number {
    return this.maskNum;
  }

  setIP(IP: number[]) {
    this.ip = IP;
    this.calcIP();
  }

  setMasK(MASK: number[]) {
    this.mask = MASK;
    this.calcIP();
    this.maskNum= this.calcMaskNumFromMask(MASK);
  }

  getFirstIP(format: boolean = false) : number[] | string {
    return format? this.firstIp.join(".") : this.firstIp;
  }
  getLastIP(format: boolean = false) : number[] | string {
    return format? this.lastIp.join(".") : this.lastIp;
  }

  getIP(format: boolean = false ): number[] | string {
    return format? this.ip.join(".") : this.ip;
  }
  getStorage() {
    return this.storage;
  }

  push(a = 1) {
    this.ip = this.add(a);
    this.calcIP();
  }

  calcIP() {
    this.numHost = this.calcNumHost();
    this.steep = this.calcSteep();
    this.firstIp = this.add(1);
    this.lastIp = this.add(this.numHost);
    this.broadcast = this.add(this.numHost + 1);
    this.type = this.calcType();
  }

  calcSteep() {
    let steep;
    for (let i = 3; 0 <= i; i--) {
      if (this.mask[i] != 0) {
        steep = 256 - this.mask[i];
        break;
      }
    }

    return steep;
  }

  calcNumHost() {

  
    let mask = "";
    for (let i = 0; i < 4; i++)
      mask +=
        this.mask[i].toString(2) != "0" ? this.mask[i].toString(2) : "00000000";
    const numHost = Math.pow(2, mask.split("0").length - 1) - 2;

    this.maskNum = 32 - Math.ceil(Math.log2(numHost + 2));
    return numHost;
  }

  add(a = 1, b = this.ip) {
    const IP = [b[0], b[1], b[2], b[3]];
    if (IP[3] + a <= 255) IP[3] += a;
    else if (IP[2] + Math.floor((IP[3] + a) / 256) <= 255) {
      IP[2] += Math.floor((IP[3] + a) / 256);
      IP[3] = (IP[3] + a) % 256;
    } else if (IP[1] + Math.floor((IP[2] * 256 + IP[3] + a) / 65536) <= 255) {
      const r = (IP[2] * 256 + IP[3] + a) % 65536;
      IP[1] += Math.floor((IP[2] * 256 + IP[3] + a) / 65536);
      IP[2] = Math.floor(r / 256);
      IP[3] = r % 256;
    } else {
      let r = (IP[1] * 65536 + IP[2] * 256 + IP[3] + a) % Math.pow(256, 3);
      IP[0] += Math.floor(
        (IP[1] * 65536 + IP[2] * 256 + IP[3] + a) / Math.pow(256, 3),
      );
      IP[1] = Math.floor(r / 65536);
      r = r % 65536;
      IP[2] = Math.floor(r / 256);
      IP[3] = r % 256;
    }
    return IP;
  }

  calcType(): NetworkType {
    const [firstOctet, secondOctet] = this.ip;

    if (firstOctet === 10) {
      return { Domain: domainEnum.PRIVATE, Class: classEnum.A };
    } else if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
      return { Domain: domainEnum.PRIVATE, Class: classEnum.B };
    } else if (firstOctet === 192 && secondOctet === 168) {
      return { Domain: domainEnum.PRIVATE, Class: classEnum.C };
    } else if (firstOctet >= 1 && firstOctet <= 126) {
      return { Domain: domainEnum.PUBLIC, Class: classEnum.A };
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      return { Domain: domainEnum.PUBLIC, Class: classEnum.B };
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      return { Domain: domainEnum.PUBLIC, Class: classEnum.C };
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      return { Domain: domainEnum.MULTICAST, Class: classEnum.B };
    } else {
      return { Domain: domainEnum.RESERVED, Class: classEnum.OTHER };
    }
  }
  



  calcMaskFromHost(Host: number): number[] {
    Host = Math.ceil(Math.log2(Host + 2));
    const mask = [0, 0, 0, 0];
    let cont = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        if (cont < 32 - Host) {
          mask[i] += Math.pow(2, 7 - j);
        } else break;

        cont++;
      }
    }

    return mask;
  }

  calcMaskArrayFromMask(maskNum: number): number[] {
    return this.calcMaskFromHost(Math.pow(2, 32 - maskNum) - 2);
  }

 
  calcMaskNumFromMask(mask: number[]): number {
    let maskNum = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        if ((mask[i] & (1 << (7 - j))) !== 0) {
          maskNum++;
        }
      }
    }
    return maskNum;
  }

  subNet( hostList: number[]): Network[] {
    const networks = [];
    const networkTemp = new Network(this.getIP(), this.getMask());
    let sum = 0;
    for (let i = 0; i < hostList.length; i++) sum += hostList[i];

    if (sum <= this.getNumHost()) {
      for (let i = 0; i < hostList.length; i++) {
        const temp2 = new Network(networkTemp.getIP(), networkTemp.getMask());
        temp2.setMasK(temp2.calcMaskFromHost(hostList[i]));
        networks[i] = temp2;
        networkTemp.setIP(temp2.getIP() as number[]);
        networkTemp.push(temp2.getNumHost() + 2);
        this.storage += hostList[i];
       
      }
    }

    return networks;
  }
}
