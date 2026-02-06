export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        {children}
      </div>
    </>
  );
}
