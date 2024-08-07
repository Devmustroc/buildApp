
import Heading from "@/app/(marketing)/_components/heading";
import Heroes from "@/app/(marketing)/_components/hereos";
import Footer from "@/app/(marketing)/_components/footer";
import Detail from "@/app/(marketing)/_components/detail";
import {GridAbout} from "@/app/(marketing)/_components/gridAbout";

export default function Home() {
  return (
    <main className="min-h-full flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center justify-between md:justify-between text-center gap-x-8"
      >
          <Heroes />
          <Heading />

      </div>
      <div
        className="md:justify-between text-center gap-x-8 mx-2 flex-1"
      >
          <Detail />
      </div>
      <GridAbout />
      <Footer />
    </main>
  );
}
