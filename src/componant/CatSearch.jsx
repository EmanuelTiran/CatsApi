import React, { useMemo } from "react";

export default function CatSearch({ searchQuery, onSearchChange, filteredCount, allCats }) {
    const suggestions = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const lower = searchQuery.toLowerCase();
        return allCats
            .filter((cat) => cat.name.toLowerCase().includes(lower))
            .slice(0, 5); // עד 5 הצעות
    }, [searchQuery, allCats]);

    return (
        <div className="mb-8">
            <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-xl">🔍</span>
                </div>
                <input
                    type="text"
                    placeholder="Search for a cat breed..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                             transition-all duration-300 outline-none text-right
                             shadow-sm hover:shadow-md"
                />

                {suggestions.length > 0 && (
                    <ul className="absolute z-10 left-0 right-0 bg-white mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                        {suggestions.map((cat, i) => (
                            <li
                                key={i}
                                onClick={() => onSearchChange(cat.name)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-right"
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    {searchQuery.trim() !== "" ? (
                        <>{filteredCount} results found for "{searchQuery}"</>
                    ) : (
                        <>showing {filteredCount} breeds</>
                    )}
                </p>
            </div>
        </div>
    );
}
