
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div className="max-w-[100rem] font-roboto  h-full w-full bg-gray-950 mx-auto overflow-x-hidden overflow-y-clip flex flex-col relative">
       <div className="font-roboto z-20 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <Navbar />
      <HeroSection/>
    </div>
  );
}
