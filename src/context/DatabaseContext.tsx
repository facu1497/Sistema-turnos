import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Client {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  availableSpots: number;
}

export interface Activity {
  id: string;
  name: string;
  capacity: number;
  price: number;
}

export interface PaymentReceipt {
  id: string;
  clientId: string | null;
  fileUrl: string; // Base64 or object URL of uploaded receipt
  dateUploaded: string;
  extractedRegexMatch: { cbu: boolean; price: boolean; name: boolean };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface AppConfig {
  validCbus: string[];
}

interface DatabaseContextType {
  clients: Client[];
  activities: Activity[];
  payments: PaymentReceipt[];
  config: AppConfig;
  
  // Actions
  addClient: (client: Omit<Client, 'id' | 'availableSpots'>) => void;
  updateClientSpots: (clientId: string, incrementBy: number) => void;
  
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  
  addPaymentReceipt: (payment: Omit<PaymentReceipt, 'id'>) => void;
  updatePaymentStatus: (paymentId: string, status: 'APPROVED' | 'REJECTED', clientIdToCredit?: string) => void;
  
  addValidCbu: (cbu: string) => void;
  removeValidCbu: (cbu: string) => void;
}

const defaultState: DatabaseContextType = {
  clients: [],
  activities: [],
  payments: [],
  config: { validCbus: [] },
  addClient: () => {},
  updateClientSpots: () => {},
  addActivity: () => {},
  addPaymentReceipt: () => {},
  updatePaymentStatus: () => {},
  addValidCbu: () => {},
  removeValidCbu: () => {},
};

const DatabaseContext = createContext<DatabaseContextType>(defaultState);

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('sisturnos_clients');
    return saved ? JSON.parse(saved) : [];
  });
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('sisturnos_ac');
    return saved ? JSON.parse(saved) : [];
  });
  const [payments, setPayments] = useState<PaymentReceipt[]>(() => {
    const saved = localStorage.getItem('sisturnos_pay');
    return saved ? JSON.parse(saved) : [];
  });
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('sisturnos_cfg');
    return saved ? JSON.parse(saved) : { validCbus: [] };
  });

  // Persist handlers
  useEffect(() => { localStorage.setItem('sisturnos_clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('sisturnos_ac', JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem('sisturnos_pay', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('sisturnos_cfg', JSON.stringify(config)); }, [config]);

  const addClient = (data: Omit<Client, 'id' | 'availableSpots'>) => {
    const newClient: Client = { ...data, id: uuidv4(), availableSpots: 0 };
    setClients(prev => [...prev, newClient]);
  };

  const updateClientSpots = (clientId: string, val: number) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, availableSpots: c.availableSpots + val } : c));
  };

  const addActivity = (data: Omit<Activity, 'id'>) => {
    const newAct: Activity = { ...data, id: uuidv4() };
    setActivities(prev => [...prev, newAct]);
  };

  const addPaymentReceipt = (data: Omit<PaymentReceipt, 'id'>) => {
    const newPay: PaymentReceipt = { ...data, id: uuidv4() };
    setPayments(prev => [...prev, newPay]);
  };

  const updatePaymentStatus = (paymentId: string, status: 'APPROVED' | 'REJECTED', clientIdToCredit?: string) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status } : p));
    if (status === 'APPROVED' && clientIdToCredit) {
      updateClientSpots(clientIdToCredit, 1);
    }
  };

  const addValidCbu = (cbu: string) => {
    setConfig(prev => ({ ...prev, validCbus: [...prev.validCbus, cbu] }));
  };

  const removeValidCbu = (cbu: string) => {
    setConfig(prev => ({ ...prev, validCbus: prev.validCbus.filter(c => c !== cbu) }));
  };

  const value = {
    clients, activities, payments, config,
    addClient, updateClientSpots, addActivity, addPaymentReceipt, updatePaymentStatus,
    addValidCbu, removeValidCbu
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};
