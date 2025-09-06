export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto animate-spin" />
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading KnowYourRights</h2>
          <p className="text-gray-300">Preparing your rights guide...</p>
        </div>
      </div>
    </div>
  );
}
