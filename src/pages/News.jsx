import React, { useState } from "react";
import { Newspaper, ChevronRight, Tag } from "lucide-react";

export default function News() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Manufacturing", "Technology", "Market", "Safety", "Energy"];

    const newsData = [
        {
            id: 1,
            title: "India’s Manufacturing Sector Reaches New Growth High",
            category: "Manufacturing",
            summary:
                "Industrial output rises by 8.2% this quarter, driven by machinery, steel, and automotive production.",
            time: "2 hours ago",
        },
        {
            id: 2,
            title: "AI-based Automation Now Transforming Heavy Industries",
            category: "Technology",
            summary:
                "Factories adopting AI robotics see up to 40% improvement in operational efficiency.",
            time: "1 day ago",
        },
        {
            id: 3,
            title: "Global Steel Prices Surge Due to Rising Demand",
            category: "Market",
            summary:
                "Raw material shortages and global construction growth create upward price pressure.",
            time: "3 days ago",
        },
        {
            id: 4,
            title: "Safety Compliance Rules Updated for Industrial Workers",
            category: "Safety",
            summary:
                "New government guidelines aim to reduce workplace hazards in the manufacturing sector.",
            time: "5 days ago",
        },
        {
            id: 5,
            title: "Renewable Energy Investments Increase in 2025",
            category: "Energy",
            summary:
                "Solar and wind energy adoption surges as companies reduce dependency on coal.",
            time: "1 week ago",
        }
    ];

    const filteredNews =
        activeCategory === "All"
            ? newsData
            : newsData.filter((item) => item.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">

            {/* PAGE TITLE */}
            <div className="flex items-center gap-3 mb-6">
                <Newspaper className="text-blue-600" size={32} />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Industry News</h1>
                    <p className="text-gray-600 text-sm">Latest updates from industrial markets</p>
                </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div className="mb-6 flex gap-3 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition 
                            ${
                                activeCategory === cat
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white hover:bg-blue-50 border-gray-300"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* FEATURED NEWS */}
            <div className="bg-white p-6 shadow rounded-xl mb-8 border hover:shadow-lg">
                <h2 className="text-xl font-bold mb-2">🔥 Featured</h2>
                <p className="text-gray-600 mb-4">
                    Automation, renewable energy, and AI-driven control systems are defining
                    the next decade of industrial innovation.
                </p>
                <button className="flex items-center gap-2 text-blue-600 font-semibold">
                    Continue Reading <ChevronRight size={18} />
                </button>
            </div>

            {/* NEWS LIST */}
            <div className="space-y-5">
                {filteredNews.map((news) => (
                    <div
                        key={news.id}
                        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                            <Tag size={16} />
                            {news.category}
                        </div>

                        <h3 className="font-bold text-lg mb-1">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{news.summary}</p>

                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">{news.time}</span>
                            <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
                                Read More <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
