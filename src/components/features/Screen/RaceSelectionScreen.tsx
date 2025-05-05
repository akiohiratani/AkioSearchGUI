import { useState } from 'react';
import { Button } from '../common/Button';
import { AlertDialog, AlertDialogStatus } from '../common/AlertDialog';
import { TopicRaceSelectDialog } from '../raceSelection/TopicRaceSelectDialog';
import { SearchType } from '../common/type/SearchType';
import { exportDataset } from '../../../infrastructure/api/ExportApiClient';
import { SearchDialog } from '../horse/SearchDialog';

type ButtonAction = 'selectedRaceFromTopics' | 'selectedRaceDirect';

// メインのレース選択画面コンポーネント
export const RaceSelectionScreen = () => {
    const [alertDialogStatus, SetAlertDialogStatus] = useState<AlertDialogStatus>({open:false, message:""});
    const [loading, setLoading] = useState({open:false, message:""});
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
                        "message": "未対応。今後実装予定。"
                    })
                break;
            }
    }

    // 警告ダイアログ表示
    const handleSetIsRaceListDialog = (value:boolean) =>{
        setTopicRaceSelectDialogOpen(value);
    }

    // API連携
    const handleSearch = async (keyword: SearchType) => {
        // 検索をダイアログの表示する
        setLoading({open:true, message:"データセット出力中・・・"});
        let isSuccess = true;
        try {
          switch(keyword.type){
            case "topicRace":
                // 検索ワードから馬を抽出
                if(keyword.value == null || keyword.value === "") return;
                await exportDataset(keyword.value);
                break;
            default:{
                console.log("未知の検索")
                break;
            }
          }
        } catch (error) {
          console.error('検索エラー:', error);
          isSuccess = false;
        } finally {
          // 進捗ダイアログを閉じる
          setLoading({open:false,message:""});
    
          // 結果に応じて警告ダイアログを表示する
          if(!isSuccess){
            SetAlertDialogStatus({"open": true, "message": "実行に失敗しました。"})
          }
        }
      };

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
              直接指定
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
        <SearchDialog isOpen={loading.open} message={loading.message}/>
      </div>
    );
  };