export default function LayoutAdmin({children}:Readonly<{children : React.ReactNode}>){

  return (
    <div className="mx-auto flex justify-center">{children}</div>
  )
}