import React, { createContext, useContext, useState } from "react";

interface FormDataContextProps {
  formData: any;
  setFormData: (data: any) => void;
}

const FormDataContext = createContext<FormDataContextProps>({
  formData: null,
  setFormData: () => {},
});

export const useFormData = () => useContext(FormDataContext);

export interface FormDataProviderProps {
  children: React.ReactNode;
}

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
  const [formData, setFormData] = useState(null);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
