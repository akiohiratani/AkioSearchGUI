import { Button } from '../common/Button';

type ButtonAction = 'selectedRaceFromTopics' | 'selectedRaceDirect';

// メインのレース選択画面コンポーネント
export const RaceSelectionScreen = () => {
    const handleButtonClick = (action: ButtonAction) =>{
    switch(action){
        case "selectedRaceFromTopics":
            console.log(action);
            break;
        case "selectedRaceDirect":
        default:
            console.log(action);
            break;
    }
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            どのレースデータを取集しますか??
          </h1>
          
          <div className="space-y-4">
            <Button 
              variant="primary"
              aria-label="今週の重賞からレースを選択"
              onClick={() => {handleButtonClick("selectedRaceFromTopics")}}
            >
              今週の重賞から
            </Button>
            
            <Button
              aria-label="レースを直接指定"
              onClick={() => {handleButtonClick("selectedRaceDirect")}}
            >
              直接指定
            </Button>
          </div>
        </div>
      </div>
    );
  };