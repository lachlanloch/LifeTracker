
import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";


//is the main protection for dashboard page
export const metadata = {
    title: "Life Tracker · Prompts",
    
  };

export default function DashboardPage(){

    return (
        <Main>
            <Dashboard/>
        </Main>
        
      
    )
}
