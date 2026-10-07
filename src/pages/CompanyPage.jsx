import { useState, useEffect } from 'react';

export default function CompanyPage() {
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoffee = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://coffee.alexflipnote.dev/random.json');
      const data = await res.json();
      console.log(data); // { file: "https://..." }
      setCoffee(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoffee();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Loading Coffee...</div>;

  return (
    <div className="bg-white rounded-xl p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Random Coffee API ☕</h1>

      {coffee && (
        <div>
          <img
            src={coffee.file}
            alt="coffee"
            className="w-full max-w-[500px] h-[400px] object-cover mx-auto rounded-xl shadow-lg"
          />
          <p className="mt-4 text-sm text-gray-500 break-all">{coffee.file}</p>
        </div>
      )}

      <button
        onClick={fetchCoffee}
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        New Coffee 🔄
      </button>
    </div>
  );
} 