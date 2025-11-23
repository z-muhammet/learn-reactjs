import Detail from './detail';
import Galery from './gallery';
export default function MainContent() {
  return (
    <div className="flex flex-1 flex-col-reverse sm:flex-row justify-center">
      <Galery />
      <Detail />
    </div>
  );

}