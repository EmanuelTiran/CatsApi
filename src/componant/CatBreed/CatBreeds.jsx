// components/CatBreeds.jsx
import React, { useEffect, useState } from "react";
import './CatBreeds.css'
import CatModal from "../CatModal/CatModal";

// const API_KEY = "05e9ce2c-8745-47a7-b5c9-f22df38d147f";
const API_KEY = import.meta.env.VITE_API_KEY || "05e9ce2c-8745-47a7-b5c9-f22df38d147f";
export default function CatBreeds() {
    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCat, setSelectedCat] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [allCats, setAllCats] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/breeds", {
            headers: {
                "x-api-key": API_KEY,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllCats(data);
                setCats(data.slice(0, 20));
                setFilteredCats(data.slice(0, 20));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching cats:", error);
                setLoading(false);
            });
    }, []);

    // Filter cats based on search query
    useEffect(() => {
        const currentVisibleCats = allCats.slice(0, visibleCount);

        if (searchQuery.trim() === "") {
            setFilteredCats(currentVisibleCats);
        } else {
            const filtered = currentVisibleCats.filter(cat =>
                cat.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCats(filtered);
        }
    }, [searchQuery, visibleCount, allCats]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🐱</span>
                    </div>
                </div>
                <p className="ml-4 text-lg text-gray-600 animate-pulse">loading...</p>
            </div>
        );
    }

    return (
        <>
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🐾 Cat breeds around the world🐾
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Discover the wonderful breeds of cats, each with its own unique character and beauty.                </p>
            </div>

            {/* Search Section */}
            <div className="mb-8">
                <div className="max-w-md mx-auto relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-xl">🔍</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a cat breed..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                 transition-all duration-300 outline-none text-right
                                 shadow-sm hover:shadow-md"
                    />
                </div>

                {/* Search Results Counter */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        {searchQuery.trim() !== "" && (
                            <>{filteredCats.length} results found for "{searchQuery}"</>)}
                        {searchQuery.trim() === "" && (
                            <>showing {filteredCats.length} breeds</>
                        )}
                    </p>
                </div>
            </div>

            {/* No Results Message */}
            {filteredCats.length === 0 && searchQuery.trim() !== "" && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">😿</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No results found.                    </h3>
                    <p className="text-gray-500">
                        Try searching with other words or check the spelling.                    </p>
                </div>
            )}

            {/* Cats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCats.map((cat, index) => (
                    <div
                        key={cat.id}
                        onClick={() => setSelectedCat(cat)}
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

                        {/* Hover effect indicator */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-blue-500 font-medium">Click for more details ←</span>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < allCats.length && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setVisibleCount(visibleCount + 20)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        load more🐾
                    </button>
                </div>
            )}
            <CatModal cat={selectedCat} onClose={() => setSelectedCat(null)} />
        </>
    );
}