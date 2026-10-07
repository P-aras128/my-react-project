import { useState, useEffect } from 'react';

export default function Food() {
  const [recalls, setRecalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch('/food-api/api/recalls-latest.json');
        const data = await res.json();
        console.log("SARI FOOD DATA:", data);
        const list = Array.isArray(data) ? data : data.recalls || data.data || data.results || [];
        setRecalls(list);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchFood();
  }, []);

  if (loading) return <div className="p-10 font-bold text-xl">Loading Food Recalls...</div>;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Food Recalls - Sari Data ({recalls.length})</h1>
      
      <div className="space-y-4">
        {recalls.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow border p-4">
            <h2 className="font-bold text-lg text-red-600 mb-2">
              {item.product || item.title || item.product_name || `Recall #${idx+1}`}
            </h2>
            
            {/* Sari fields automatically show ho jayengi */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="border-b py-1">
                  <span className="font-bold text-gray-700 capitalize">{key.replace(/_/g, ' ')}: </span>
                  <span className="text-gray-600">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}