import { Button } from "../common/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outputPath: string;
};

export const ExportSuccess = ({ isOpen, onClose, outputPath}: Props) => {
  
  if(!isOpen) return null;
  
  const fileDescriptions = [
    {
      "name":"TRAIN_dataset_race.csv",
      "description":"選択したレースの過去5年間のレース結果データ（天候・馬場状態・出走馬情報を含む）"
    },
    {
      "name":"TRAIN_dataset_horse.csv",
      "description":"過去3年間の出走馬の詳細戦歴（レース毎のタイム・順位・騎手情報）"
    },
    {
      "name":"TEST_dataset_horse.csv",
      "description":"今回の出走馬の直近10レースの詳細データ（調教師・馬体重の推移を含む）"
    },
    {
      "name":"TEST_dataset_candidate_list.csv",
      "description":"確定出走馬の基本情報（馬番・騎手・オッズ・馬主情報）"
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
              出力先（圧縮ファイル）:
            </p>
            <div className="w-full bg-gray-100 rounded px-3 py-2 mt-1 mb-2 font-mono text-xs text-gray-800 break-all select-all">
              {outputPath}
            </div>
            <p className="text-xs text-gray-500">
              ※ 上記のパスにZIPファイルとして保存されています。エクスプローラー等でご確認ください。
            </p>
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
                    {" - "}
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
