import Navbar from "@/components/layout/navbar";
import "./styles.css";
import Sidebar from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "test",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="border ">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-row w-full ">
              <Navbar />
              <div className="flex flex-col flex-grow w-full md:w-full min-h-screen ">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
