import FormSection from "./FormSection";
import PdfSection from "./PdfSection";

export default function ExportPage() {
  return (
    <div className="flex flex-row gap-x-10">
      <FormSection />
      <PdfSection />
    </div>
  );
}
