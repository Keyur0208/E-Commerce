import User from "@/app/componets/profile";

export const metadata = {
  title:"Profile - RUXI"
}


export default function Page(props)
{
  return(
    <>
       <User id={props.params.id} />
    </>
  )
}
