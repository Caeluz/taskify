"use client";
import React, { createContext, useContext, useState } from "react";
import { FormDataProvider } from "@/components/utility/FormDataContext";

import FormSection from "./FormSection";
import PdfSection from "./PdfSection";

export default function ExportPage() {
  return (
    <FormDataProvider>
      <div className="flex flex-row gap-x-10">
        <FormSection />
        <PdfSection />
      </div>
    </FormDataProvider>
  );
}
