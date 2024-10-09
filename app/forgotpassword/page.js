
import Main from "@/components/Main";
import ForgotPassword from "@/components/ForgotPasword";


//is the main protection for dashboard page
export const metadata = {
    title: "Life Tracker · ForgotPassword",
    
  };

export default function DashboardPage(){

    return (
        <Main>
            <ForgotPassword/>
        </Main>
        
      
    )
}
