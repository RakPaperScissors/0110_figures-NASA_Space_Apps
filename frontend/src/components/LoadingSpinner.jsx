import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#2d3748] to-[#6d85ae]">
        <div className="relative w-12 h-12 animate-spin">
            <div className="absolute w-12 h-12 animate-spin">
                {/* For Sun */}
                <div className="absolute inset-2 rounded-full bg-yellow-400 shadow-lg">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 w-1 h-5 bg-yellow-300 rounded-full origin-bottom"
                            style={{
                                transform: `translate(-50%, -100%) rotate(${index * 45}deg) translateY(-10px)`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoadingSpinner;