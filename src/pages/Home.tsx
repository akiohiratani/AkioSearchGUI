import { useState } from "react";
import { Header } from "../components/features/Screen/Header";
import { ProgressTracker } from "../components/features/Screen/ProgressTracker";
import { RaceSelectionScreen } from "../components/features/Screen/RaceSelectionScreen";
import { ExportScreen } from "../components/features/Screen/ExportScreen";
import { SearchType } from "../components/features/common/type/SearchType";

export const Home = () => {
    const [currentScreen, setCurrentScreen] = useState({"raceSelection":true, "export":false});
    const [currentSelectedSearchType, setCurrentSelectedRaceInfo] = useState<SearchType>({"type":"Nothing", "value":""});
    const [currentStep, setCurrentStep] = useState<'race-selection' | 'dataset-output'>('race-selection');
    const handleExport = (keyword: SearchType) =>{
        setCurrentSelectedRaceInfo(keyword);
        setCurrentScreen(prev => ({...prev, "export":true}));
    }

    const handleNextStep = () => {
        setCurrentScreen(prev => ({...prev, "raceSelection":false}));
        setCurrentStep('dataset-output');
    };
    
    const handlePrevStep = () => {
        setCurrentScreen({"raceSelection":true, "export":false});
        setCurrentStep('race-selection');
    };

    return (
        <div>
            {/* <Header/> */}
            <ProgressTracker currentStep={currentStep} />
            <RaceSelectionScreen 
                onExport={handleExport}
                isVisible={currentScreen.raceSelection}
                onClose={handleNextStep}/>
            <ExportScreen
                keyword={currentSelectedSearchType}
                isVisible={currentScreen.export}
                onClose={handlePrevStep}/>
        </div>
    );
}