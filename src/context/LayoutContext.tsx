import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LayoutOrientation = "vertical" | "horizontal";

interface LayoutContextType {
  orientation: LayoutOrientation;
  toggleOrientation: () => void;
  setOrientation: (orientation: LayoutOrientation) => void;
  isSwitching: boolean;
}

const STORAGE_KEY = "portfolio_layout_orientation_pref";

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orientation, setOrientationState] = useState<LayoutOrientation>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "horizontal" || saved === "vertical") {
        return saved;
      }
    } catch (e) {
      console.error("Failed to read layout preference", e);
    }
    return "vertical";
  });

  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, orientation);
    } catch (e) {
      console.error("Failed to save layout preference", e);
    }
  }, [orientation]);

  const toggleOrientation = () => {
    setIsSwitching(true);
    setOrientationState((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
    setTimeout(() => {
      setIsSwitching(false);
    }, 600);
  };

  const setOrientation = (newOri: LayoutOrientation) => {
    setIsSwitching(true);
    setOrientationState(newOri);
    setTimeout(() => {
      setIsSwitching(false);
    }, 600);
  };

  return (
    <LayoutContext.Provider
      value={{
        orientation,
        toggleOrientation,
        setOrientation,
        isSwitching,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
