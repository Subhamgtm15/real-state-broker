
export default function Navbar({ user, onLogout }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
        RealEstate
      </h1>

      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-1.5">

          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold text-sm">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="text-right">
            <p className="font-medium text-gray-900 text-sm">
              {user?.name || "User"}
            </p>
            <p className="text-xs capitalize text-gray-400">
              {user?.role || "buyer"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button onClick={onLogout} className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          Logout
        </button>

      </div>
    </div>
  )
}