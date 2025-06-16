import React from "react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-10">
            <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                               rounded-l-md hover:bg-gray-100 disabled:opacity-50"
                >
                    ← Previous
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 text-sm border border-gray-300 ${page === currentPage
                                ? "bg-blue-600 text-white font-bold"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                               rounded-r-md hover:bg-gray-100 disabled:opacity-50"
                >
                    Next →
                </button>
            </nav>
        </div>
    );
}
