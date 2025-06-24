import React, { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import CatModal from "../CatModal/CatModal";
import CatHeader from "../CatHeader";
import CatSearch from "../CatSearch";
import CatGrid from "../CatGrid";
import Pagination from "../Pagination";

const API_KEY = import.meta.env.VITE_API_KEY || "05e9ce2c-8745-47a7-b5c9-f22df38d147f";

export default function CatBreeds() {
    const [allCats, setAllCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCat, setSelectedCat] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 18;

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/breeds", {
            headers: { "x-api-key": API_KEY },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllCats(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching cats:", error);
                setLoading(false);
            });
    }, []);

    const fuse = useMemo(() => {
        return new Fuse(allCats, {
            keys: ["name", "description"],
            threshold: 0.35,
        });
    }, [allCats]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            const indexOfLastCat = currentPage * itemsPerPage;
            const indexOfFirstCat = indexOfLastCat - itemsPerPage;
            setFilteredCats(allCats.slice(indexOfFirstCat, indexOfLastCat));
        } else {
            const results = fuse.search(searchQuery);
            const matched = results.map((r) => r.item);
            setFilteredCats(matched);
        }
    }, [searchQuery, currentPage, allCats, fuse]);

    const totalPages = Math.ceil(allCats.length / itemsPerPage);

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
            <CatHeader />
            <CatSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filteredCount={filteredCats.length}
                allCats={allCats}
            />
            {filteredCats.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-12 animate-pulse">
                    😿 No cat breeds found...
                </div>
            ) : (
                <CatGrid cats={filteredCats} onSelect={setSelectedCat} searchQuery={searchQuery} />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
            <CatModal cat={selectedCat} onClose={() => setSelectedCat(null)} />
        </>
    );
}
