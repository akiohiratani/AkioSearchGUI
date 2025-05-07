import { useState } from 'react';
import { Button } from '../common/Button';
import { AlertDialog, AlertDialogStatus } from '../common/AlertDialog';
import { TopicRaceSelectDialog } from '../raceSelection/TopicRaceSelectDialog';
import { SearchType } from '../common/type/SearchType';

type ButtonAction = 'selectedRaceFromTopics' | 'selectedRaceDirect';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onExport:(keyword: SearchType) => void
};

// メインのレース選択画面コンポーネント
export const RaceSelectionScreen = ({isVisible, onExport, onClose}: Props) => {
    const [alertDialogStatus, SetAlertDialogStatus] = useState<AlertDialogStatus>({open:false, message:""});
    const [TopicRaceSelectDialogOpen, setTopicRaceSelectDialogOpen] = useState(false);
    
    // ボタンが押下されときの挙動
    const handleButtonClick = (action: ButtonAction) =>{
        switch(action){
          case "selectedRaceFromTopics":
            setTopicRaceSelectDialogOpen(true)
            break;
          case "selectedRaceDirect":
          default:
            SetAlertDialogStatus({
                    "open" : true,
                    "message": "現バージョンでは未対応です。"
                })
            break;
        }
    }

    // レース選択が完了したときに挙動
    const handleSearch = (keyword: SearchType) =>{
      onExport(keyword);
      onClose();
    }

    // 警告ダイアログ表示
    const handleSetIsRaceListDialog = (value:boolean) =>{
        setTopicRaceSelectDialogOpen(value);
    }

    if(!isVisible) return null;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            どのレースから取集しますか??
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
              カスタマイズ指定
            </Button>
          </div>
        </div>
        <AlertDialog
            open={alertDialogStatus.open} 
            message={alertDialogStatus.message} 
            onClose={()=> SetAlertDialogStatus({"open": false, "message": ""})}/>
        <TopicRaceSelectDialog
            isOpen = {TopicRaceSelectDialogOpen}
            onClose={() => setTopicRaceSelectDialogOpen(false)}
            onSearch={handleSearch}
            handleDialog={handleSetIsRaceListDialog}/>
      </div>
    );
  };