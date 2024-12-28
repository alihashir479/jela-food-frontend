import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

const LoadingButton = () => {
  return (
    <Button disabled className="flex flex-1">
       <Loader2 className="animate-spin">Loading</Loader2> 
    </Button>
  )  
}

export default LoadingButton