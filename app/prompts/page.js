
import Prompts from "@/components/Prompts";
import Main from "@/components/Main";


//is the main protection for dashboard page
export const metadata = {
    title: "Life Tracker · DailyQuestion",
    
  };
export const dynamic = 'force-dynamic'
export default function DashboardPage(){

    return (
        <Main>
            <Prompts/>
        </Main>
        
      
    )
}
