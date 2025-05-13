import { useState } from "react";
import { Race } from "../../../domain/models/Race";
import { SearchType } from "../common/type/SearchType";
import { exportDataset, getProcessingTime } from "../../../infrastructure/api/ExportApiClient";
import { AlertDialog } from "../common/AlertDialog";
import { AlertDialogStatus } from "../common/AlertDialog";
import { ExportConfirmation } from "../export/ExportConfirmation";
import { ExportSuccess } from "../export/ExportSuccess";
import { ProgressDialog } from "../common/ProgressDialog";
import { getActivate } from "../../../infrastructure/api/ActivateApiClient";
import { ActivateError } from "../../../infrastructure/api/data/ApiError";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    keyword: SearchType;
};

const ALERT_MESSAGE = "⚠️ 利用期限が終了しました。\nこのアプリの利用期限（2025年9月30日）が終了しました。\n最新版の詳細は出品者のココナラをご確認ください。";

export const ExportScreen = ({isVisible, onClose, keyword}: Props) => {
    const [currentScreen, setCurrentScreen] = useState({"confirmationScreen":true, "successScreen":false});
    const [loading, setLoading] = useState({open:false, message:"", duration:0.00});
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

        // アプリが有効かどうか
        try{
            await getActivate();
        }catch (error){
            if (error instanceof ActivateError) {
                setAlertDialogStatus({"open": true, "message": ALERT_MESSAGE});
            }else{
                setAlertDialogStatus({"open": true, "message": "実行に失敗しました。"});
            }
            // 実行を中止
            return;
        }

        // 検索をダイアログの表示する
        setLoading({open:true, message:"",duration:0});
        
        let isSuccess = true;
        try {

            switch(keyword.type){
            case "topicRace":
                // 検索ワードから馬を抽出
                if(keyword.value == null) return;

                // 予想時間を取得
                setLoading({open:true, message:"セットアップ中・・・(1/2)", duration:70});
                const processingTime = await getProcessingTime(race.id, years);

                // 出力実行
                setLoading({open:true, message:"データセット出力中・・・(2/2)", duration:processingTime});
                const outputPath = await exportDataset(race.id, years, race.name);
                setOutputPath(outputPath);
                break;
            default:{
                console.log("未知の検索");
                break;
            }
            }
        } catch (error) {
            isSuccess = false;
            console.error('検索エラー:', error);
        } finally {
            // 進捗ダイアログを閉じる
            setLoading({open:false,message:"", duration:0});
    
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
            <ProgressDialog
                isOpen={loading.open}
                message={loading.message}
                duration={loading.duration}/>
            <AlertDialog
                open={alertDialogStatus.open} 
                message={alertDialogStatus.message}
                onClose={()=> setAlertDialogStatus({"open": false, "message": ""})}/>
        </div>
    );
}