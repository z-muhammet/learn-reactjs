import App from "../../../reactExampleWithTailwind/src/app";



export default function Gallery({ images, handleNextButton, handleBackButton }) {
  return (
    <div className="w-full md:w-1/2 mt-10 md:mt-0">
      <div className="h-4/5 flex justify-center">
        <img
          src={images}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center mt-4 gap-2 md:gap-0">
        <button className="w-full md:w-1/2 bg-blue-500 text-white md:mx-2 py-2" onClick={handleBackButton}>Geri</button>
        <button className="w-full md:w-1/2 bg-blue-500 text-white md:mx-2 py-2" onClick={handleNextButton}>İleri</button>
      </div>
    </div>
  );
}