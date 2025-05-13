import { useState } from "react";
import icon from "../assets/icon.jpg";
import { Header } from "../components/features/Screen/Header";
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
            {/* Header */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    background: 'white',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    height: 64,
                    boxSizing: 'border-box',
                }}
                >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                }}>
                <img
                src={icon}
                alt="Researcherアイコン"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    marginRight: 16,
                    objectFit: 'cover',
                    background: '#f4f4f4',
                    flexShrink: 0,
                }}
                />
                <span style={{
                fontWeight: 700,
                fontSize: 24,
                color: '#222',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                }}>
                    Akio Scraper
                </span>
                </div>
                <div style={{ flex: 1, minWidth: 0, marginLeft: 32 }}>
                    <Header currentStep={currentStep} />
                </div>
            </div>
            <RaceSelectionScreen 
                onExport={handleExport}
                isVisible={currentScreen.raceSelection}
                onClose={handleNextStep}/>
            <ExportScreen
                keyword={currentSelectedSearchType}
                isVisible={currentScreen.export}
                onClose={handlePrevStep}/>
            
            {/* Fotter */}
            <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 py-4 px-4 shadow-sm z-10">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    {/* コピーライトのみ中央表示 */}
                    <p className="text-gray-500 text-sm">
                    &copy; 2025 Akio All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}