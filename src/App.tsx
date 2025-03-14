import RenderTabContent from "./components/render-tab-content";
import { ThemeProvider } from "./components/theme-provider";
import { AppProvider } from "./context/AppContext";




function App() {



 

  return (
    <>
     
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppProvider> 
     
          <RenderTabContent />
       
        </AppProvider>
      </ThemeProvider>
    
 
   
      
    </>)
}

export default App;
