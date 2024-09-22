
import Prompts from "@/components/Prompts";
import Main from "@/components/Main";
import DailyQuestionData from "@/components/DailyQuestionData";


//is the main protection for dashboard page
export const metadata = {
    title: "Life Tracker · ViewAll",
    
  };
export const dynamic = 'force-dynamic'
export default function DashboardPage(){

    return (
        <Main>
            <DailyQuestionData/>
        </Main>
        
      
    )
}
