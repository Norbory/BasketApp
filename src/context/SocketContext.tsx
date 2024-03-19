import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Crear un nuevo contexto para el socket
const SocketContext = createContext<Socket | null>(null);

// Crear un componente de proveedor que proporcionará el socket a los componentes hijos
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('https://1pcglxm1-3000.brs.devtunnels.ms/');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Crear un hook personalizado que permita a los componentes acceder al socket
export const useSocket = () => {
  return useContext(SocketContext);
};