import { Component as SpotlightCursor } from "@/components/ui/spotlight-cursor";

export const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-black overflow-hidden relative">
      <h1 className="text-white text-4xl font-bold z-10 pointer-events-none select-none">Move your mouse!</h1>
      <SpotlightCursor config={{ radius: 250, brightness: 0.15, color: '#38bdf8' }} />
    </div>
  );
};

export default DemoOne;
