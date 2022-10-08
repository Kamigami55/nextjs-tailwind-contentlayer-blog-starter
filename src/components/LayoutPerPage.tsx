import { useCommandPaletteLocaleActions } from '@/components/CommandPalette/useCommandPaletteLocaleActions';

type Props = {
  children: React.ReactNode;
};

const LayoutPerPage = ({ children }: Props) => {
  useCommandPaletteLocaleActions();

  return <>{children}</>;
};

export default LayoutPerPage;
