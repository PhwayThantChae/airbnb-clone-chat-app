export default function Conversation() {
  return (
    <div>
        <a
          href="#"
          className="flex items-center px-6 py-4 border-2 border-gray-100 border-solid rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="User 2"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden w-32 ml-4 lg:w-80 sm:block">
            <h2 className="text-sm font-semibold">User 1</h2>
            <p className="text-gray-500 truncate text-ellipsis">
              How are you doing?
            </p>
          </div>
        </a>
      </div>
  );
}
