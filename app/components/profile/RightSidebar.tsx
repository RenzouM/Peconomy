import { mockSuggestedUsers, mockSavedUsers } from "../../data/mockData";
import Image from "next/image";

export default function RightSidebar() {
  const suggestedUsers = mockSuggestedUsers;
  const savedUsers = mockSavedUsers;

  return (
    <div className="flex flex-col space-y-4 pb-4 overflow-hidden justify-start">
      {/* Right Sidebar */}
      {/* Filter Section */}
      <div className="rounded-2xl px-4 py-3 border border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">Suggestions</h3>
          <button className="cursor-pointer text-gray-400 text-xs">⚙️</button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex gap-1">
            <button className="bg-gray-900 cursor-pointer text-white rounded-md px-2 py-1 text-xs">Latest</button>
            <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Interest</button>
            <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Similar</button>
          </div>
          <div className="flex gap-1">
            <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Followed</button>
            <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Saved</button>
          </div>
        </div>
      </div>

      {/* Suggested Section */}
      <div className="grid grid-cols-2 gap-2 p-2 border border-gray-200 rounded-2xl space-y-2 items-start">
        {suggestedUsers.map((user, index) => (
          <div
            key={index}
            className="flex cursor-default items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.handle}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-xs">{user.handle.charAt(1).toUpperCase()}</div>
                )}
              </div>
              <div className="w-24 grid">
                <div className="font-medium text-gray-900 text-sm">{user.handle}</div>
                <div className="text-xs text-gray-500 flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">{user.followers?.toLocaleString() || "0"} followers</div>
                <button className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white text-xs px-2 py-1 rounded-md">Follow</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Saved Users Section */}
      <div className="rounded-2xl px-4 py-3 border border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">Saved Users</h3>
          <button className="cursor-pointer text-gray-400 text-xs">⚙️</button>
        </div>
        <div className="grid grid-cols-2 gap-2 space-y-2 items-start">
          {savedUsers.map((user, index) => (
            <div
              key={index}
              className="flex cursor-default items-center justify-between hover:bg-gray-50 rounded-lg group">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.handle}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-xs">{user.handle.charAt(1).toUpperCase()}</div>
                )}
              </div>
              <div className="w-24 grid">
                <div className="font-medium text-gray-900 text-sm">{user.handle}</div>
                <div className="text-xs text-gray-500">{user.lastSeen}</div>
                <button className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-gray-900">2.1M</div>
            <div className="text-xs text-gray-600">Followers</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-gray-900">156</div>
            <div className="text-xs text-gray-600">Following</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-gray-900">89</div>
            <div className="text-xs text-gray-600">Saved</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-gray-900">24</div>
            <div className="text-xs text-gray-600">Posts</div>
          </div>
        </div>
      </div>
      {/* Account Reach Thermometer */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 hidden 2xl:block">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Reach</h3>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>0%</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: "75%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
