import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

// collaboration: <Hero /> pizza image spinning and green leaf placements and other CSS

export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />

      <section className="text-center my-16 " id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About Us"} />
        <div className="max-w-xl mx-auto mt-4 flex flex-col gap-4 text-gray-500">
          <p>
            Ipsum nostrud dolore esse sint. Quis dolor cillum adipisicing
            consequat sint sint minim. Eiusmod nostrud laborum mollit quis. Sint
            eiusmod anim cupidatat voluptate eiusmod aliquip mollit do cillum
            velit. Enim deserunt dolor deserunt et id nisi id ex occaecat culpa
            incididunt cillum aute. Magna enim dolor pariatur fugiat veniam sunt
            pariatur reprehenderit mollit esse cupidatat ullamco. Tempor elit
            cupidatat laborum non.
          </p>
          <p>
            Deserunt magna duis dolore eiusmod anim. Deserunt dolore sit tempor
            dolor ex tempor dolor velit est. Fugiat reprehenderit velit elit
            minim minim. Elit ex officia laboris culpa id ipsum ea non
            exercitation est ea eiusmod occaecat in.
          </p>
          <p>
            Eiusmod ex consequat duis non deserunt labore officia. Tempor amet
            in enim pariatur id labore voluptate aliquip adipisicing. Minim
            tempor fugiat reprehenderit culpa nulla ex ullamco velit. Amet
            exercitation pariatur pariatur fugiat cupidatat eu est. Magna anim
            ullamco officia proident qui consectetur voluptate.
          </p>
        </div>
      </section>
      <section className="text-center my-16" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          {" "}
          <a className="text-4xl underline text-gray-500" href="tel:+122345678900">
            +1 234 567 8900
          </a>
        </div>
      </section>

      
    </>
  );
}
