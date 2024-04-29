import "./globals.css";
import Header from "@/components/header/Header";
import { ColorSchemeScript, MantineProvider, Space } from "@mantine/core";
import "@mantine/core/styles.css";

export const metadata = {
  description: "ユーザーの評価の高さではなく、レビューの数の多さで場所を見つけることができる場所検索サイト",
  title: "Glocal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            primaryColor: "cyan",
          }}
        >
          <div className="mx-auto max-w-screen-xl px-4">
            <Header />
            <Space h="md" />
            <main>{children}</main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
