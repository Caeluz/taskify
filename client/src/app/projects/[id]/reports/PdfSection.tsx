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
    flex: 1, // Use flex to allow the page to grow
    height: "100%", // Set height to 100% to occupy the full height
    width: "100%", // Set width to 100% to occupy the full width
    maxHeight: "100%", // Set maxHeight to 100% to allow full height
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const DocumentSection = () => (
  <Document>
    <Page size="A4" style={styles.page} orientation="portrait">
      {/* <Page size="A4" > */}
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
        <DocumentSection />
      </PDFViewer>
    </div>
  );
}
// ReactPDF.renderToStream(<DocumentSection />);

// ReactDOM.render(<PdfSection />, document.getElementById("root"));
