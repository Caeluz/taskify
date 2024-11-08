import { Loader2 } from "lucide-react";

export default function LoadingComponent({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping"></div>
        <div className="relative rounded-full bg-primary p-4">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        {message}
      </h2>
    </div>
  );
}
