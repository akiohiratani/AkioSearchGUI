import { Button } from "../common/Button";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outputPath: string;
};

export const ExportSuccess = ({ isOpen, onClose, outputPath}: Props) => {
  const [copyState, setCopyState] = useState({
    copied: false,
    showTooltip: false
  });
  
  if(!isOpen) return null;

  const copyPathToClipboard = () => {
    // クリップボードにパスをコピー
    navigator.clipboard.writeText(outputPath)
      .then(() => {
        // コピー成功
        setCopyState({ copied: true, showTooltip: true });
        
        // 成功表示のトースト/ツールチップを2秒後に消す
        setTimeout(() => {
          setCopyState(prev => ({ ...prev, showTooltip: false }));
        }, 2000);
      })
      .catch(err => {
        console.error('クリップボードへのコピーに失敗しました:', err);
        alert('パスのコピーに失敗しました。お手動でテキストを選択してコピーしてください。');
      });
  };

  const fileDescriptions = [
    {
      "name":"TRAIN_dataset_race.[レース名]_分析データ.csv",
      "description":"過去の開催データと今週の出走予定馬の基本情報が含まれます"
    },
    {
      "name":"[レース名]_出走する馬の戦歴データ.csv",
      "description":"今週出走する各馬の過去レース成績が含まれます"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-2">
      <div
        className="
          bg-white rounded-xl shadow-xl flex flex-col
          max-w-[95vw] w-full md:max-w-2xl
          max-h-[90vh]
        "
      >
        {/* ヘッダー部分 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-green-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              出力が正常に完了しました
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              出力先:
            </p>
            
            {/* クリック可能なフォルダパス */}
            <button 
              onClick={copyPathToClipboard}
              className="w-full bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 mt-1 mb-2 font-mono text-xs text-gray-800 break-all text-left flex items-center relative transition-colors duration-200 group"
            >
              <span className="flex-1">{outputPath}</span>
              {/* コピーアイコン */}
              <svg 
                className="text-gray-400 group-hover:text-gray-600 ml-2 h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              
              {/* コピー成功時のツールチップ */}
              {copyState.showTooltip && (
                <div className="absolute right-0 -top-8 bg-gray-800 text-white text-xs rounded py-1 px-2">
                  パスをコピーしました！
                </div>
              )}
            </button>
            
            {/* クリック可能な説明文 */}
            <p 
              onClick={copyPathToClipboard}
              className="text-xs text-gray-500 flex items-center cursor-pointer hover:text-blue-500 transition-colors duration-200"
            >
              ※ 上記のパスにCSVファイルとして保存されています。クリックしてパスをコピー 
            </p>
            
            {/* フォルダを開く方法の説明 */}
            {copyState.copied && (
              <div className="mt-3 text-xs bg-blue-50 text-blue-700 p-2 rounded-md">
                <p className="font-medium mb-1">フォルダを開くには：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Windows</strong>：エクスプローラーを開き、アドレスバーにコピーしたパスを貼り付けて Enter キーを押してください。</li>
                  <li><strong>Mac</strong>：Finderを開き、⌘+Shift+G キーを押してから、コピーしたパスを貼り付けて移動ボタンをクリックしてください。</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* スクロール可能なコンテンツ */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* ファイル説明 */}
          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">
                生成されたファイル
              </h3>
              <div className="space-y-3">
                {fileDescriptions.map((desc) => (
                  <p key={desc.name} className="text-gray-700 break-words">
                    <span className="font-medium text-blue-600">{desc.name}</span>
                    <br></br>
                    {desc.description}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* データ活用説明 */}
          <div className="mb-2">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-indigo-800 mb-3 flex items-center">
                <span className="mr-2">🚀</span>データの活用法
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AI分析 */}
                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">AI分析</p>
                    <p className="text-sm text-gray-600">
                      このCSVを生成AIや機械学習ツールに<br />
                      データセットとして読み込ませて<br />
                      予測や推論に活用できます。
                    </p>
                  </div>
                </div>

                {/* Excel分析 */}
                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Excel分析</p>
                    <p className="text-sm text-gray-600">
                      ダブルクリックでExcelを開いて<br />
                      ピボットテーブルやグラフ作成など<br />
                      自由に集計・可視化できます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="p-4 border-t border-gray-200 flex justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full md:w-auto"
          >
            最初の画面に戻る
          </Button>
        </div>
      </div>
    </div>
  );
};
