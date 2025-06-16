import React, { useEffect, useState } from "react";
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

    const indexOfLastCat = currentPage * itemsPerPage;
    const indexOfFirstCat = indexOfLastCat - itemsPerPage;
    const currentCats = allCats.slice(indexOfFirstCat, indexOfLastCat);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCats(currentCats);
        } else {
            const filtered = allCats.filter(cat =>
                cat.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCats(filtered);
        }
    }, [searchQuery, currentPage, allCats]);

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
            />
            <CatGrid cats={filteredCats} onSelect={setSelectedCat} searchQuery={searchQuery} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
            <CatModal cat={selectedCat} onClose={() => setSelectedCat(null)} />
        </>
    );
}
