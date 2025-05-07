import React from 'react';

type type = {
  currentStep: 'race-selection' | 'dataset-output';
}

export const ProgressTracker = ({ currentStep }: type) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500">
        <li className={`flex md:w-full items-center ${
          currentStep === 'race-selection' ? 'text-blue-600' : currentStep === 'dataset-output' ? 'text-green-600' : ''
        } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
          <span className={`flex items-center justify-center w-8 h-8 ${
            currentStep === 'race-selection' 
              ? 'bg-blue-100 text-blue-600' 
              : currentStep === 'dataset-output' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100'
          } rounded-full lg:h-10 lg:w-10 shrink-0`}>
            {currentStep === 'dataset-output' ? (
              <svg className="w-3.5 h-3.5 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
            ) : (
              "1"
            )}
          </span>
          <span className="ml-2">レース選択</span>
        </li>
        
        <li className={`flex items-center ${
          currentStep === 'dataset-output' ? 'text-blue-600' : ''
        }`}>
          <span className={`flex items-center justify-center w-8 h-8 ${
            currentStep === 'dataset-output' 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100'
          } rounded-full lg:h-10 lg:w-10 shrink-0`}>
            {"2"}
          </span>
          <span className="ml-2">データセット出力</span>
        </li>
      </ol>
    </div>
  );
};
