import { useState } from "react";
import { Race } from "../../../domain/models/Race";
import { SearchDialog } from "../horse/SearchDialog";
import { SearchType } from "../common/type/SearchType";
import { exportDataset } from "../../../infrastructure/api/ExportApiClient";
import { AlertDialog } from "../common/AlertDialog";
import { AlertDialogStatus } from "../common/AlertDialog";
import { Button } from "../common/Button";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    keyword: SearchType;
};

export const ExportScreen = ({isVisible, onClose, keyword}: Props) => {
    const [loading, setLoading] = useState({open:false, message:""});
    const [alertDialogStatus, SetAlertDialogStatus] = useState<AlertDialogStatus>({open:false, message:""});
    const race = keyword.value as Race;

    // API連携
    const handleSearch = async () => {
        // 検索をダイアログの表示する
        setLoading({open:true, message:"データセット出力中・・・"});
        let isSuccess = true;
        try {
            switch(keyword.type){
            case "topicRace":
                // 検索ワードから馬を抽出
                if(keyword.value == null) return;
                
                await exportDataset(race.id);
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

    const hanleOnClick = () =>{
        handleSearch();
    }

    if(!isVisible) return null;

    return (
        <div className="space-y-4">
            <Button 
              variant="primary"
              aria-label="実行"
              onClick={() => {hanleOnClick()}}
            >
              実行
            </Button>

            <Button 
              aria-label="終わり"
              onClick={onClose}
            >
              終わり
            </Button>
            <SearchDialog 
                isOpen={loading.open} 
                message={loading.message}/>
            <AlertDialog
                open={alertDialogStatus.open} 
                message={alertDialogStatus.message} 
                onClose={()=> SetAlertDialogStatus({"open": false, "message": ""})}/>
        </div>
    );
}