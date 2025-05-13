import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export const AlertDialog = ({ open, onClose, message }: Props) => {
  if (!open) return null;

  // 改行コードを保持するためにホワイトスペースを保持し、改行を維持
  const formattedMessage = message.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== message.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <>
      {/* オーバーレイ */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        onClick={onClose} // オーバーレイクリックでもダイアログを閉じる
      />
      
      {/* モーダル本体 - 横幅を広げる */}
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-96 sm:w-[450px] md:w-[500px] p-8 pointer-events-auto">
        {/* メッセージ部分 - 改行とテキスト配置を調整 */}
        <div className="mb-8 text-left text-lg whitespace-pre-line leading-relaxed">
          {formattedMessage}
        </div>
        
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors duration-200"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </>
  );
};

export interface AlertDialogStatus {
  open: boolean;
  message: string;
}