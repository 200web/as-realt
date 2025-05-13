// Updated src/app/layout.tsx
import "./globals.css";
export { metadata } from "./metadata";
import ScrollFix from "../components/ScrollFix/ScrollFix";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";
import InitCookies from '../components/Cookies/InitCookies';
import CookieBanner from '../components/Cookies/CookieBanner';

// Import our custom CSS adjustments
import "../styles/container-adjustments.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link
  rel="icon"
  href="/icon-light.webp"
  media="(prefers-color-scheme: light)"
/>
<link
  rel="icon"
  href="/icon-dark.png"
  media="(prefers-color-scheme: dark)"
/>

      </head>
      <body style={{
        margin: 0,
        padding: 0,
        overflowX: 'hidden', // Prevent horizontal scrolling
        position: 'relative', // Create a new stacking context
        backgroundColor: '#121318' // Darker background color that matches the design
      }}>
        <InitCookies /> 
        <CookieBanner />
        <LoadingOverlay />
        <ScrollFix />
        {children}
      </body>
    </html>
  );
}