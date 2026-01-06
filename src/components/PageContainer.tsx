interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'small' | 'medium' | 'large';
}

function PageContainer({ children, maxWidth = 'large' }: PageContainerProps) {
  return (
    <div className={`page-container page-container-${maxWidth}`}>
      {children}
    </div>
  );
}

export default PageContainer;
