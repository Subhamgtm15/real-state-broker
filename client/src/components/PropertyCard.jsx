import { Heart } from "lucide-react"

export default function PropertyCard({
  property,
  onToggleFavourite,
  isFavourite,
}) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      
      {/* 🔹 Image Section */}
      <div className="relative">
        <img
          src={property.image || "https://placehold.co/600x400"}
          alt={property.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* ❤️ Favourite Icon */}
        <button
          onClick={() => onToggleFavourite(property.id)}
          className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur-md transition ${
            isFavourite
              ? "bg-red-500 text-white"
              : "bg-white/70 text-gray-700 hover:bg-white"
          }`}
        >
          <Heart
            size={18}
            fill={isFavourite ? "white" : "none"}
            className="transition"
          />
        </button>
      </div>

      {/* 🔹 Content */}
      <div className="space-y-3 p-5">
        
        {/* Title + Location */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-slate-500">
            {property.location}
          </p>
        </div>

        {/* Price */}
        <p className="text-xl font-semibold text-blue-600">
          NPR {property.price.toLocaleString()}
        </p>

        {/* Button */}
        <button
          onClick={() => onToggleFavourite(property.id)}
          className={`w-full rounded-lg px-4 py-2 font-medium transition ${
            isFavourite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
          }`}
        >
          {isFavourite ? "Remove Favourite" : "Add to Favourite"}
        </button>
      </div>
    </div>
  )
}