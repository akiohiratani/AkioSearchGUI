import { useState } from 'react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ部分 */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">AkioSearch</h1>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  ホーム
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  レース検索
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  データ分析
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              ホーム
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              レース検索
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              データ分析
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
