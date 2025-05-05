import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface Props {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

const buttonStyle = {
  'primary': 'bg-blue-600 text-white border-transparent hover:bg-blue-700',
  'secondary': 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50',
} as const;

// 再利用可能なボタンコンポーネント
export const Button = ({
  children,
  variant = 'secondary',
  className = '',
  onClick,
}:Props) => {
  return (
    <button
      type="button"
      className={`w-full py-3 px-4 border rounded-lg shadow-sm font-medium 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                 ${buttonStyle[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
