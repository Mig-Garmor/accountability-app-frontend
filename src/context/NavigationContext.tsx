// NavigationContext.tsx
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationContextType {
  navigate: ReturnType<typeof useNavigate>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useCustomNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context.navigate;
};
