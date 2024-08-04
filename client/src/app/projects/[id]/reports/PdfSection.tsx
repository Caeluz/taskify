"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import { PDFViewer } from "@react-pdf/renderer";
import PDFViewer from "@/components/utility/PDFView";
import ReactPDF from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const DocumentSection = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default function PdfSection() {
  return (
    <div className="h-full">
      <PDFViewer>
        <DocumentSection />
      </PDFViewer>
    </div>
  );
}
// ReactPDF.renderToStream(<DocumentSection />);

// ReactDOM.render(<PdfSection />, document.getElementById("root"));
