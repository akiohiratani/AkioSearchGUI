import { useState } from "react";
import { Button } from "../common/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onExport: (years: number) => void;
  raceName: string;
};

export const ExportConfirmation = ({isOpen, onClose, onExport, raceName}: Props) =>{
    // 分析年数のデフォルト値を5に設定
    const [years, setYears] = useState<number>(5);

    const hanleOkClick = () =>{
        onExport(years);
    }

    if(!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
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
                    <span className="ml-2 text-gray-900">{raceName}</span>
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
        </div>
    );
}