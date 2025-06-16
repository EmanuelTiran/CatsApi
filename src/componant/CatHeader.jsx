import React from "react";

export default function CatHeader() {
    return (
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold  mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🐾 Cat breeds around the world 🐾
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover the wonderful breeds of cats, each with its own unique character and beauty.
            </p>
        </div>
    );
}
