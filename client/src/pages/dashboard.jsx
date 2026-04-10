import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../services/api"
import PropertyCard from "../components/PropertyCard"
import Navbar from "../components/Navbar"

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
    <div className="min-h-screen bg-neutral-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="pt-20 px-6 pb-6 max-w-7xl mx-auto">
        <div className="mt-6 mb-5">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome, {user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">Browse and save your favourite properties</p>
        </div>
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveSection("main")}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${
              activeSection === "main"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            All Properties
          </button>

          <button
            onClick={() => setActiveSection("favourites")}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${
              activeSection === "favourites"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Saved
          </button>
        </div>

        {favLoading && (
          <p className="mb-4 text-sm text-gray-500">Updating favourites...</p>
        )}

        {activeSection === "main" && (
          <div>
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