export default function Title({ TitleText = "Dynamic Gallery" }) {
  return (
    <div className="w-full h-1/10 p-4">
      <h1 className="text-3xl font-bold text-center">
        {TitleText}
      </h1>
    </div>
  );
}