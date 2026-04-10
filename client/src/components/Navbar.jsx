
export default function Navbar({ user, onLogout }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-3.5 flex items-center justify-between">

        {/* Title */}
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-gray-900">Real</span><span className="text-indigo-600">Estate</span>
        </h1>

        <div className="flex items-center gap-3">

          {/* User Info */}
          <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-full pl-1.5 pr-4 py-1.5">
            <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm leading-none">{user?.name || "User"}</p>
              <p className="text-xs capitalize text-gray-400 mt-0.5">{user?.role || "buyer"}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="text-sm font-medium text-gray-500 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-2 rounded-full transition-colors"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  )
}