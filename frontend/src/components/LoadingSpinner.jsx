import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="relative w-12 h-12 animate-spin">
            <div className="absolute w-12 h-12 animate-spin">
                {/* For Sun */}
                <div className="absolute inset-2 rounded-full bg-yellow-400 shadow-lg">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 w-1 h-4 bg-yellow-300 origin-bottom"
                            style={{
                                transform: `rotate(${index * 45}deg) translateY(-12px)`,
                            }}
                        />
                    ))}
                </div>
                {/* For Cloud */}
                <div className="absolute bottom-2 left-4 bg-gray-300 rounded-full w-10 h-6 animate-pulse opacity-90"/>
                <div className="absolute bottom-3 left-2 bg-gray-200 rounded-full w-6 h-6 animate-pulse opacity-90"/>
            </div>
        </div>
    </div>
  );
};

export default LoadingSpinner;