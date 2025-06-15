// components/CatModal.jsx
import React, { useEffect, useState } from "react";
import './CatModal.css'

export default function CatModal({ cat, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (cat) {
            setIsVisible(true);
            setIsClosing(false);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [cat]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isVisible]);

    if (!cat) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 
                       ${isVisible && !isClosing ? 'bg-black bg-opacity-50 backdrop-blur-sm' : 'bg-black bg-opacity-0'}`}
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white max-w-md w-full mx-4 rounded-xl shadow-2xl border border-gray-100 
                           transform transition-all duration-300 ease-out overflow-hidden
                           ${isVisible && !isClosing
                        ? 'scale-100 opacity-100 translate-y-0 rotate-0'
                        : 'scale-95 opacity-0 translate-y-8 rotate-1'}`}
            >
                {/* Header with close button */}
                <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                    <button
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                                 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full
                                 transition-all duration-200 hover:scale-110 hover:rotate-90
                                 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={handleClose}
                        aria-label="סגור"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Image section */}
                <div className="relative overflow-hidden">
                    <img
                        src={cat.image?.url || "https://placekitten.com/300/300"}
                        alt={cat.name}
                        className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Content section */}
                <div className="p-6 space-y-4">
                    <div className="transform transition-all duration-300 hover:translate-x-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                            <span className="mr-2">🐱</span>
                            {cat.name}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600 transform transition-all duration-300 hover:translate-x-1 hover:text-blue-600">
                            <span className="mr-2">🌍</span>
                            <span className="font-medium">מוצא:</span>
                            <span className="mr-2 text-gray-800">{cat.origin}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 transform transition-all duration-300 hover:translate-x-1 hover:text-green-600">
                            <span className="mr-2">⏰</span>
                            <span className="font-medium">תוחלת חיים:</span>
                            <span className="mr-2 text-gray-800">{cat.life_span} שנים</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 transform transition-all duration-300 hover:bg-gray-100">
                        <p className="text-gray-700 leading-relaxed text-sm">
                            {cat.description}
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 transform transition-all duration-300 hover:from-purple-100 hover:to-blue-100">
                        <div className="flex items-start">
                            <span className="mr-2 text-lg">🎭</span>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">temperament:</p>
                                <p className="text-sm text-gray-700 italic leading-relaxed">
                                    {cat.temperament}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 text-center">
                    <p className="text-xs text-gray-500">Press ESC or outside the window to close</p>
                </div>
            </div>
        </div>
    );
}