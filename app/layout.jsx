import "./globals.css";
import Nav from "./auth/Nav";
import QueryWrapper from "./query/QueryWrapper";

export const metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 bg-gray-200`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
