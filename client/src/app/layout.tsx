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
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-dvh flex">
            <Sidebar />
            <div className="flex-row w-full overflow-hidden">
              <Navbar />
              <div className="flex flex-col w-full md:w-full pa-0">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
