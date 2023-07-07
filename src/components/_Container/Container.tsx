import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

export function Container() {
  return (
    <div className="flex justify-center">
      <section className="container max-w-full w-3/5">
        <AboutMe />
        <Portfolio />
      </section>
    </div>
  );
}
