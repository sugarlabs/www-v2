import { Loader2 } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-gray-500 dark:text-gray-400" />
      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
        Loading...
      </p>
    </div>
  );
};

export default PageLoader;
