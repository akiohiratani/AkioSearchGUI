import React, { useState, useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  message: string;
  duration: number; // 秒数
};

export const ProgressDialog = ({ isOpen, message, duration }: Props) =>{
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // ダイアログが開かれたときに進捗をリセットし、タイマーを開始
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      
      // すでにインターバルが設定されている場合はクリア
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // 進捗バーのアニメーションを開始
      const updateInterval = 50; // 更新間隔 (ミリ秒)
      const increment = (100 / (duration * 1000)) * updateInterval;
      
      intervalRef.current = window.setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + increment;
          if (newProgress >= 100) {
            if (intervalRef.current !== null) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 100;
          }
          return newProgress;
        });
      }, updateInterval);
    } else {
      // ダイアログが閉じられたときにタイマーをクリア
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    // クリーンアップ関数
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800">{message}</h3>
          
          {/* 進捗バーコンテナ */}
          <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            {/* 進捗バー */}
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* 進捗パーセント表示 */}
          <div className="text-sm text-gray-600 text-right">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};
