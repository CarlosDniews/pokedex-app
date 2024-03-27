"use client"
import { Provider } from "react-redux";
import { store } from "@/store/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
        <div>{children}</div>
    </Provider>
  );
}
