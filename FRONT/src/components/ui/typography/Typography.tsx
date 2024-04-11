type TypographyProps = {
  variant: 'h5' | 'body1';
  children: React.ReactNode;
  customClass?: string;
};

export const Typography = ({
  variant,
  children,
  customClass,
}: TypographyProps) => (
  <div className={`typography typography--${variant} ${customClass || ''}`}>
    {children}
  </div>
);
