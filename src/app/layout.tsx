import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <nav>네비게이션</nav>
        {children}
      </body>
    </html>
  );
}
