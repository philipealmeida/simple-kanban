import './button.css';

export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  outlined?: boolean;
};

export const Button = ({
  onClick,
  children,
  disabled = false,
  outlined = true,
}: ButtonProps) => (
  <button
    className={`custom-button ${outlined ? 'custom-button--outlined' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
