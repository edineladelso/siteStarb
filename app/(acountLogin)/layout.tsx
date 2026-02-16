export default function LayoutRegistro({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen p-b-20 w-full bg-linear-to-br from-[#353A5F] to-[#9EBAF3]  items-center justify-center">
      {children}
    </div>
  );
}
