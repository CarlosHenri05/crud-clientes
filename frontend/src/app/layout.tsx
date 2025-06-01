import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
          <div className="text-xl font-bold">CRUD-ANKA</div>
          <div></div>
        </nav>
        <main className="p-8 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
