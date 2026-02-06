export default function LivrosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="mx-auto w-full">{children}</div>
    </>
  );
}
