'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-5 text-red-500">
      <h2>Помилка завантаження нотатки!</h2>
      <button onClick={() => reset()} className="mt-2 p-2 bg-white text-black">Спробувати знову</button>
    </div>
  );
}