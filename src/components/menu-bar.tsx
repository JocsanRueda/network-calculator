import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Switch } from "@/components/ui/switch"
import {Github } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useAppContext } from "@/context/AppContext"
import { enumPages } from "@/share/enum.pages"

export function MenuBar() {

  const { setTheme,theme } = useTheme()
  const {setTabActive}= useAppContext();

  const handleClick = () => {
    if(theme==='dark'){
      setTheme('light')
    }else{
      setTheme('dark')
    }
  }

  const handleLink = () => {

    setTabActive(enumPages.HOME)

  }
  return (
    <div className=" flex justify-between border-b border-dashed">
  
        
      <NavigationMenu className="mx-2 my-0.5">
        <NavigationMenuList className="items-center gap-4 text-sm">
          <NavigationMenuItem >
            <NavigationMenuLink href="#" className="font-light" onClick={handleLink}>Home</NavigationMenuLink>
          </NavigationMenuItem>
          
        </NavigationMenuList>
      </NavigationMenu>

        
      <NavigationMenu className="mx-2 my-0.5" >

        <NavigationMenuList className="  text-sm gap-4">
         
          
          
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="font-light" onClick={handleClick}><Switch checked={theme==='dark'}/></NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="https://github.com/JocsanRueda" className="font-light " ><Github/></NavigationMenuLink>
          </NavigationMenuItem>
          
        </NavigationMenuList>
          
      </NavigationMenu>
      
     
    </div>
  )
}