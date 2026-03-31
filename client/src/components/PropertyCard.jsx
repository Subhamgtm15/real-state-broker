export default function PropertyCard({property,onToggleFavourite,isFavourite,}) 
{
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl hover:scale-105 *:duration-300">
      <img
        src={property.image || "https://placehold.co/600x400?text=No+Image"}
        alt={property.title}
        className="h-52 w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{property.title}</h3>
          <p className="text-sm text-slate-500">{property.location}</p>
        </div>

        <p className="text-lg font-semibold text-blue-600">
          NPR {property.price.toLocaleString()}
        </p>

        <button onClick={() => onToggleFavourite(property.id)} className={`w-full rounded-lg px-4 py-2 font-medium text-white transition ${isFavourite? "bg-red-500 hover:bg-red-600": "bg-blue-600 hover:bg-blue-700"}`}>
          {isFavourite ? "Remove Favourite" : "Add to Favourite"}
        </button>
      </div>
    </div>
  );
}