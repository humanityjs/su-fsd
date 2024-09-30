function ItemCard({ date, file }: { date: string; file: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <p className="mb-1 text-sm">{date}</p>
      <p className="text-2xl">{file}</p>
    </div>
  );
}

export default ItemCard;
