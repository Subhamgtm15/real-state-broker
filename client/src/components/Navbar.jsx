import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar({ user, onLogout }) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 shadow-lg">
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-white tracking-wide">
        RealEstate
      </h1>

      <div className="flex items-center gap-4">

        {/* 👤 User Info */}
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-md">

          <Avatar className="h-10 w-10 border border-white/30">
            <AvatarFallback className="bg-white text-blue-600 font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

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
        <Button onClick={onLogout} variant="secondary">
          Logout
        </Button>

      </div>
    </div>
  )
}