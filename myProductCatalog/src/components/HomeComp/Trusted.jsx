const Trusted = () => {
  const images = [
    "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image2.png",
    "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image3.png",
    "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image4.png",
    "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image6.png",
    "https://raw.githubusercontent.com/solodev/infinite-logo-carousel/master/images/image8.png",
  ];

  return (
    <section className="bg-bgimage py-32">
      <div className="container mx-auto">
        <h3 className="text-center text-textColor uppercase font-bold text-2xl mb-0">
          Trusted By 1000+ Companies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-8">
          {images.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={image}
                alt={`trusted-brand-${index}`}
                className="min-w-28 h-28"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trusted;
