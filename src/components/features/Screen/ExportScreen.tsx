import { useState } from "react";
import { Race } from "../../../domain/models/Race";
import { SearchDialog } from "../horse/SearchDialog";
import { SearchType } from "../common/type/SearchType";
import { exportDataset } from "../../../infrastructure/api/ExportApiClient";
import { AlertDialog } from "../common/AlertDialog";
import { AlertDialogStatus } from "../common/AlertDialog";
import { ExportConfirmation } from "../export/ExportConfirmation";
import { ExportSuccess } from "../export/ExportSuccess";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    keyword: SearchType;
};

export const ExportScreen = ({isVisible, onClose, keyword}: Props) => {
    const [currentScreen, setCurrentScreen] = useState({"confirmationScreen":true, "successScreen":false});
    const [loading, setLoading] = useState({open:false, message:""});
    const [alertDialogStatus, setAlertDialogStatus] = useState<AlertDialogStatus>({open:false, message:""});
    const [outputPath, setOutputPath] = useState("");
    const race = keyword.value as Race;

    // 表示を初期化して閉じる
    const handleClose = () =>{
        setCurrentScreen({"confirmationScreen":true, "successScreen":false});
        onClose();
    }

    // API連携
    const handleSearch = async (years: number) => {
        // 検索をダイアログの表示する
        setLoading({open:true, message:"データセット出力中・・・"});
        let isSuccess = true;
        try {
            switch(keyword.type){
            case "topicRace":
                // 検索ワードから馬を抽出
                if(keyword.value == null) return;
                
                const outputPath = await exportDataset(race.id, years);
                setOutputPath(outputPath);
                break;
            default:{
                console.log("未知の検索");
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
            if(isSuccess){
                setCurrentScreen({"confirmationScreen" : false, "successScreen": true});
            }else{
                setAlertDialogStatus({"open": true, "message": "実行に失敗しました。"});
            }
        }
    };

    const hanleOnExport = (years: number) =>{
        handleSearch(years);
    }

    if(!isVisible) return null;

    return (
        <div>
            <ExportConfirmation
                isOpen={currentScreen.confirmationScreen}
                onClose={handleClose}
                onExport={hanleOnExport}
                raceName={race.name}
            />
            <ExportSuccess
                isOpen={currentScreen.successScreen}
                onClose={handleClose}
                outputPath={outputPath}
            />

            <SearchDialog 
                isOpen={loading.open} 
                message={loading.message}/>
            <AlertDialog
                open={alertDialogStatus.open} 
                message={alertDialogStatus.message}
                onClose={()=> setAlertDialogStatus({"open": false, "message": ""})}/>
        </div>
    );
}