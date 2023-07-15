import "./globals.css";
import Header from "@/components/header/Header";

export const metadata = {
  content: "width=device-width,initial-scale=1.0,maximum-scale=1.0",
  description: "Generated by create next app",
  name: "viewport",
  title: "Glocal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="h-screen bg-background-primary">
        <Header />
        <main className="mx-auto max-w-sm px-2 pt-3">{children}</main>
      </body>
    </html>
  );
}
