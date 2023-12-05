

'use client'

import { usePathname } from "next/navigation";


export default function ProductButton (){

const pathName = usePathname

  //sets the admin view to be true to the current user
  const isAdminView = pathName.includes("admin-view");


    return(
        <div>
            ProductButton
        </div>
    )
}