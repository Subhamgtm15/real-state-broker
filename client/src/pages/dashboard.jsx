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
  const [loading, setLoading] = useState(false)

  // 🔥 Fetch properties from backend
  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const response = await api.get("/properties")
        setProperties(response.data)
      } catch (error) {
        console.log("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  function handleToggleFavourite(propertyId) {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    )
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
      
      {/* 🔹 Top Bar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-sm capitalize text-gray-500">
              {user?.role || "buyer"}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 Content */}
      <div className="p-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "User"}
        </h2>

        <p className="mb-6 text-gray-600">
          Browse available properties and add them to your favourites.
        </p>

        {/* 🔹 Tabs */}
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

        {/* 🔹 Main Section */}
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

        {/* 🔹 Favourite Section */}
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