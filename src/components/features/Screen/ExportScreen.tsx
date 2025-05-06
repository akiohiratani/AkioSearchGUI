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
    // 分析年数のデフォルト値を5に設定
    const [years, setYears] = useState<number>(5);
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
                
                await exportDataset(race.id, years);
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
            if(isSuccess){
                SetAlertDialogStatus({"open": true, "message": "正常に終了しました。"})
            }else{
                SetAlertDialogStatus({"open": true, "message": "実行に失敗しました。"})
            }
        }
    };

    const hanleOkClick = () =>{
        handleSearch();
    }

    if(!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* ヘッダー部分 */}
                <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">出力確認</h2>
                <p className="mt-2 text-sm text-gray-600">以下の内容でデータセットの出力を行います。</p>
                </div>
                
                {/* レース名表示部分 */}
                <div className="mb-6">
                <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-700">選択レース:</span>
                    <span className="ml-2 text-gray-900">{race.name}</span>
                </div>
                </div>
                
                {/* 分析年数選択部分 */}
                <div className="mb-8">
                <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900">
                    出力年数
                </label>
                <select
                    id="years"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value, 10))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    {Array.from({ length: 15 }, (_, i) => i + 1).map((year) => (
                    <option key={year} value={year}>
                        {year}年
                    </option>
                    ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">※年数が多いほど処理に時間がかかります。</p>
                </div>
                
                {/* ボタン部分 */}
                <div className="flex justify-end space-x-4">
                <Button variant="secondary" onClick={onClose}>
                    戻る
                </Button>
                <Button variant="primary" onClick={hanleOkClick}>
                    実行
                </Button>
                </div>
            </div>
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