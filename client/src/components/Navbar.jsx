
export default function Navbar({ user, onLogout }) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 shadow-lg">
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-white tracking-wide">
        RealEstate
      </h1>

      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-md">

          <div className="h-10 w-10 rounded-full border border-white/30 bg-white flex items-center justify-center text-blue-600 font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="text-right">
            <p className="font-semibold text-white">
              {user?.name || "User"}
            </p>
            <p className="text-xs capitalize text-blue-100">
              {user?.role || "buyer"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button onClick={onLogout} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
          Logout
        </button>

      </div>
    </div>
  )
}