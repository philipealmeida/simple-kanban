import './grid.css';

export type GridProps = {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  children: React.ReactNode;
  dataTestId?: string;
};
export const Grid = ({
  container,
  item,
  spacing,
  xs,
  children,
  dataTestId,
}: GridProps) => (
  <div
    className={`grid ${container ? 'grid--container' : ''} 
    ${item ? 'grid--item' : ''} ${spacing ? `grid--spacing-${spacing}` : ''} 
    ${xs ? `grid--xs-${xs}` : ''}`}
    data-testid={dataTestId}
  >
    {children}
  </div>
);
