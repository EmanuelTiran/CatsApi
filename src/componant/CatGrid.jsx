import React from "react";

export default function CatGrid({ cats, onSelect, searchQuery }) {
    if (cats.length === 0 && searchQuery.trim() !== "") {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">😿</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No results found.
                </h3>
                <p className="text-gray-500">
                    Try searching with other words or check the spelling.
                </p>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.map((cat, index) => (
                <div
                    key={cat.id}
                    onClick={() => onSelect(cat)}
                    className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 
                             hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 ease-out
                             animate-fade-in-up group"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    <div className="relative overflow-hidden rounded mb-4 w-48 h-48">
                        <img
                            src={cat.image?.url || "https://placekitten.com/200/200"}
                            alt={cat.name}
                            className="w-full h-full object-cover transition-transform duration-500 
                                     group-hover:scale-110 group-hover:rotate-2"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="text-center transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 
                                     group-hover:text-blue-600 transition-colors duration-300">
                            {cat.name}
                        </h2>
                        <p className="text-sm text-gray-500 mb-1 transition-colors duration-300 group-hover:text-gray-600">
                            From: {cat.origin}
                        </p>
                        <p className="text-sm text-gray-500 mb-2 transition-colors duration-300 group-hover:text-gray-600">
                            life expectancy: {cat.life_span} years
                        </p>
                        <p className="text-sm text-gray-700 text-center line-clamp-2 leading-relaxed
                                    transition-colors duration-300 group-hover:text-gray-800">
                            {cat.description}
                        </p>
                    </div>

                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-blue-500 font-medium">Click for more details ←</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
