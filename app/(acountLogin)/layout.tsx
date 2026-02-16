export default function LayoutRegistro({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="p-b-20 flex h-screen w-full items-center justify-center bg-linear-to-br from-[#353A5F] to-[#9EBAF3]">
      {children}
    </div>
  );
}
