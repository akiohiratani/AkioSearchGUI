import { useState } from "react";
import { RaceSelectionScreen } from "../components/features/Screen/RaceSelectionScreen";
import { ExportScreen } from "../components/features/Screen/ExportScreen";
import { SearchType } from "../components/features/common/type/SearchType";

export const Home = () => {
    const [currentScreen, setCurrentScreen] = useState({"raceSelection":true, "export":false});
    const [currentSelectedSearchType, setCurrentSelectedRaceInfo] = useState<SearchType>({"type":"Nothing", "value":""});
    const handleExport = (keyword: SearchType) =>{
        setCurrentSelectedRaceInfo(keyword);
        setCurrentScreen(prev => ({...prev, "export":true}));
    }

    return (
        <div>
            <RaceSelectionScreen 
                onExport={handleExport}
                isVisible={currentScreen.raceSelection}
                onClose={() => {setCurrentScreen(prev => ({...prev, "raceSelection":false}))}}/>
            <ExportScreen
                keyword={currentSelectedSearchType}
                isVisible={currentScreen.export}
                onClose={() => {setCurrentScreen({"raceSelection":true, "export":false})}}/>
        </div>
    );
}