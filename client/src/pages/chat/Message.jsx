export default function Message({own}) {
  return (
    <div className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs p-3 sm:text-sm text-white rounded-lg ${own ? 'bg-gray-400' : 'bg-blue-500'}`}>
        Hey there! How can I help you today?
      </div>
    </div>
  );
}
