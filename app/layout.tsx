import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'O mu Bu mu? — Aynı kafada mıyız?',description:'İki seçenek, bir sen. Arkadaşlarınla canlı oyna veya seçimlerini paylaş, ne kadar aynı kafadasınız keşfet.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
