import { useEffect, useState } from 'react';
import { Race } from '../../../domain/models/Race';
import { searchRaces } from '../../../infrastructure/api/RaceApiClient';
import { SearchType } from '../common/type/SearchType';
import { AlertDialog } from '../common/AlertDialog';
import { AlertDialogStatus } from '../common/AlertDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (keyword: SearchType) => void;
  handleDialog: (value:boolean) => void;
};

export const TopicRaceSelectDialog = ({ isOpen, onClose, onSearch, handleDialog }:Props) => {
  const [alertDialogStatus, SetAlertDialogStatus] = useState<AlertDialogStatus>({open:false, message:""});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [races, setRaces] = useState<Race[]>([]);  
  useEffect(() => {
    if (isOpen) {
      const searchRace = async () =>{
        try{
          setIsLoading(true);
          setRaces([]);
          const races = await searchRaces();
          setRaces(races);
        }catch(error){
          console.error('検索エラー', error);
          SetAlertDialogStatus({"open": true, "message": "検索に失敗しました。"})
        }finally{
          setIsLoading(false);
        }
      }
      searchRace();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRaceClick = (race: Race) => {
    onSearch({
      "type":"topicRace",
      "value":race
    });

    handleDialog(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col">
        {/* ヘッダー */}
        <div
          className="flex justify-center items-center p-4"
          style={{
            backgroundColor: 'rgba(128, 151, 228, 0.85)',
            backdropFilter: 'saturate(180%) blur(10px)',
            WebkitBackdropFilter: 'saturate(180%) blur(10px)',
          }}
        >
          <h3 className="text-xl font-semibold text-gray-900">レース一覧</h3>
        </div>

        {/* コンテンツ */}
        <div className="p-6 flex-grow overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">レース情報を読み込み中...</p>
              <p className="text-sm text-gray-500 mt-2">（お待ちください）</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {races.map((race) => (
                <li key={race.id}>
                  <button
                    type="button"
                    onClick={() => handleRaceClick(race)}
                    className="w-full text-left rounded-xl bg-blue-50/60 hover:bg-blue-100 transition-colors duration-200 shadow-sm px-5 py-4 flex flex-col gap-1 group border border-blue-100"
                  >
                    <span className="text-lg font-bold text-blue-700 group-hover:text-blue-900 flex items-center">
                      {race.name}
                      <svg
                        className="w-5 h-5 ml-2 text-blue-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 mt-1">
                      <span>場所: <span className="font-medium">{race.place}</span></span>
                      <span>日付: <span className="font-medium">{race.date}</span></span>
                      <span>距離: <span className="font-medium">{race.distance}</span></span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* フッター */}
        <div className="p-4 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            キャンセル
          </button>
        </div>
      </div>
      <AlertDialog
            open={alertDialogStatus.open} 
            message={alertDialogStatus.message} 
            onClose={()=> SetAlertDialogStatus({"open": false, "message": ""})}/>
    </div>
  );
};
