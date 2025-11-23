export default function Detail() {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center backdrop-blur-sm">
      <div className="w-4/5 h-4/5 p-4 border border-gray-300 rounded-lg overflow-y-auto bg-purple-50/5 shadow-[0_0_60px_rgba(80,0,255,0.1)] ">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-indigo-300">Image Details</h2>
        <div className="text-start ">
          <p className="mb-2 text-lg md:text-xl text-slate-300"><strong className="text-sky-200">Title:</strong> Sample Image Title</p>
          <p className="mb-2 text-start text-base md:text-lg text-slate-300"><strong className="text-sky-200">fully history:</strong> This is a sample description of the image. It provides more context and information about the image displayed in the gallery.</p>
          <p className="mb-2 text-start text-base md:text-lg text-slate-300"><strong className="text-sky-200">Description:</strong> This is a sample description of the image. It provides more context and information about the image displayed in the gallery.</p>
          <p className="mb-2 text-lg md:text-xl text-slate-300"><strong className="text-sky-200">Photographer:</strong> John Doe</p>
        </div>
      </div>
    </div>
  );
}