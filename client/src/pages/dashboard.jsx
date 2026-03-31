import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../services/api"
import PropertyCard from "../components/PropertyCard"

export default function Main({ onLogout }) {
  const token = localStorage.getItem("token")

  let user = {}
  if (token) {
    user = jwtDecode(token)
  }

  const [favourites, setFavourites] = useState([])
  const [activeSection, setActiveSection] = useState("main")
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [favLoading, setFavLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const [propertiesRes, favouritesRes] = await Promise.all([
          api.get("/properties"),
          api.get("/properties/favourites/me"),
        ])

        setProperties(propertiesRes.data)

        // store only favourite property ids
        const favouriteIds = favouritesRes.data.map((property) => property.id)
        setFavourites(favouriteIds)
      } catch (error) {
        console.log("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  async function handleToggleFavourite(propertyId) {
    try {
      setFavLoading(true)

      if (favourites.includes(propertyId)) {
        await api.delete(`/properties/${propertyId}/favourite`)
        setFavourites((prev) => prev.filter((id) => id !== propertyId))
      } else {
        await api.post(`/properties/${propertyId}/favourite`)
        setFavourites((prev) => [...prev, propertyId])
      }
    } catch (error) {
      console.log("Error updating favourite:", error)
      alert(error.response?.data?.message || "Could not update favourite")
    } finally {
      setFavLoading(false)
    }
  }

  const favouriteProperties = properties.filter((property) =>
    favourites.includes(property.id)
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading properties...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
<div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 shadow-lg">
  
  <h1 className="text-2xl font-bold text-white tracking-wide">
    🏠 RealEstate 
  </h1>

  <div className="flex items-center gap-4">
    
    {/* 👤 User Info */}
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-md">
      
      {/* Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 font-bold">
        {user?.name?.[0]?.toUpperCase() || "U"}
      </div>

      {/* Name + Role */}
      <div className="text-right">
        <p className="font-semibold text-white">
          {user?.name || "User"}
        </p>
        <p className="text-xs capitalize text-blue-100">
          {user?.role || "buyer"}
        </p>
      </div>
    </div>

    {/* 🚪 Logout Button */}
    <button
      onClick={onLogout}
      className="rounded-lg bg-white px-4 py-2 font-medium text-blue-600 shadow-md transition hover:bg-gray-100"
    >
      Logout
    </button>
  </div>
</div>

      <div className="p-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "User"}
        </h2>
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveSection("main")}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              activeSection === "main"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 shadow"
            }`}
          >
            Main
          </button>

          <button
            onClick={() => setActiveSection("favourites")}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              activeSection === "favourites"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 shadow"
            }`}
          >
            Favourites
          </button>
        </div>

        {favLoading && (
          <p className="mb-4 text-sm text-gray-500">Updating favourites...</p>
        )}

        {activeSection === "main" && (
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              All Properties
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onToggleFavourite={handleToggleFavourite}
                  isFavourite={favourites.includes(property.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === "favourites" && (
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Favourite Properties
            </h3>

            {favouriteProperties.length === 0 ? (
              <p className="text-gray-600">No favourite properties yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favouriteProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onToggleFavourite={handleToggleFavourite}
                    isFavourite={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}