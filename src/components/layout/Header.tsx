import { SearchBar } from './header/SearchBar';
import { ViewControls } from './header/ViewControls';
import { NewAssetButton } from './header/NewAssetButton';

export function Header() {
  return (
    <div className="h-16 border-b border-white/10 bg-[#13151A] flex items-center px-4 gap-4">
      <SearchBar />
      <ViewControls />
      <div className="flex-1" />
      <NewAssetButton />
    </div>
  );
}