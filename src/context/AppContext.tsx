import React, { createContext, ReactNode, useState } from 'react';

interface AppContextProps {
  ipAdress: string;
  setIpAdress: (ip: string) => void;
  subnetMask: string;
  setSubnetMask: (mask: string) => void;
  numSubNet: number;
  setNumSubNet: (num: number) => void;
  tabActive: number;
  setTabActive: (tab: number) => void;
  activePage: boolean[];
  setActivePage: (valid: boolean[]) => void;
  hostList: string[];
  setHostList: (list: string[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [ipAdress, setIpAdress] = useState<string>("");
  const [subnetMask, setSubnetMask] = useState<string>("");
  const [numSubNet, setNumSubNet] = useState<number>(0);
  const [tabActive, setTabActive] = useState<number>(3);
  const [activePage, setActivePage] = useState<boolean[]>([true,false,false]);
  const [hostList, setHostList] = useState<string[]>([]);

  return (
    <AppContext.Provider value={{ ipAdress, setIpAdress, subnetMask, setSubnetMask, numSubNet, setNumSubNet, tabActive, setTabActive, activePage, setActivePage,hostList,setHostList }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};