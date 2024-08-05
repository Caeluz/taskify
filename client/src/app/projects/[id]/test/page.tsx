"use client";
import PDFViewer from "@/components/utility/PDFView";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
    <Page size="A4" style={styles.page} orientation="landscape">
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

const PdfSection = () => (
  <div className="h-0 w-full">
    <PDFViewer width="100%">
      <DocumentSection />
    </PDFViewer>
  </div>
);

export default PdfSection;
