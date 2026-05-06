import "./globals.css";

export const metadata = {
  title: "APR Records — Impact Explorer",
  description:
    "FY 2005–2009 industry decline and the case for YouTube-native artists.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
