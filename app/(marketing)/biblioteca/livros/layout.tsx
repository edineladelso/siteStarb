
export default function MarketingLayout(
  { children } : Readonly<{ children: React.ReactNode}>
){
  return <>
    <div className="mx-auto w-full ">
      { children }
    </div>
  </>
}