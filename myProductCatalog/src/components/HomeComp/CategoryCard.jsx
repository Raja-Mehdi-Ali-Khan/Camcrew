const CategoryCard = ({ category }) => {
  return (
    <div className=" w-[19rem] md:w-[23rem] mx-10 overflow-hidden bg-bgimage shadow-md shadow-slate-600 rounded-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-x-6">
      <img
        className="w-full h-72 object-cover object-center"
        src={category.image}
        alt={category.name}
      />

      <div className="px-6 py-4">
        <div className="mb-2 text-2xl text-center font-bold">
          {category.name}
        </div>
        <p className="font-semibold text-2xl text-orange-500 text-center">
          {/* Min. {Math.floor(Math.random() * 8) + 1}0% Off */}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
