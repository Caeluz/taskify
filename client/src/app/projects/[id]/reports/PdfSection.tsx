"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useFormData } from "@/components/utility/FormDataContext";
import { formDataProps } from "./FormSection";
// import { PDFViewer } from "@react-pdf/renderer";
import PDFViewer from "@/components/utility/PDFView";
import ReactPDF from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { sub } from "date-fns";

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 55,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  date: {
    paddingTop: 40,
    fontSize: 12,
    textAlign: "center",
  },
  tasks: {
    paddingTop: 20,
    fontSize: 16,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 12,
  },
  column: {
    flex: 1,
  },
  test: {
    fontWeight: "bold",
  },
});

const DocumentSection = ({ formData }: { formData: formDataProps }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="portrait">
      {/* Header */}
      {/* Logo */}

      {/* Title */}
      <Text style={styles.title}>School Name</Text>
      <Text style={styles.subTitle}>School Description</Text>
      {/* <br /> */}

      <Text style={styles.date}>
        {/* {formData?.schoolYearStart} {formData?.schoolYearEnd}{" "}
        {formData?.schoolSemester} */}
        School Year & Semester: 2023-2024/First Semester
      </Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.test}>Name: {formData?.username}</Text>
          <Text style={{ fontWeight: "bold" }}>
            Department: {formData?.department}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={{ fontWeight: "bold", fontFamily: "Courier-Bold" }}>
            Role: {formData?.position}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Team: {formData?.team}</Text>
        </View>
      </View>

      <Text style={styles.tasks}>Tasks</Text>
    </Page>
  </Document>
);

export default function PdfSection() {
  const { formData } = useFormData();
  return (
    <div className="h-[calc(100vh-168px)] w-full p-4 flex-1">
      <PDFViewer
        width="100%"
        height="100%"
        showToolbar={false}
        style={{
          height: "100%",
          width: "100%",
          maxHeight: "100%",
          overflow: "hidden",
        }}
      >
        <DocumentSection formData={formData} />
      </PDFViewer>
    </div>
  );
}
// ReactPDF.renderToStream(<DocumentSection />);

// ReactDOM.render(<PdfSection />, document.getElementById("root"));
