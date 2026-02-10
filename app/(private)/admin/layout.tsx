export default async function LayoutAdmin({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return <div className="mx-auto flex justify-center p-5">{children}</div>;
}
