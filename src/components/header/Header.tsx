import "../../app/globals.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background-secondary">
      <div className="mx-auto max-w-sm px-3 py-4 md:max-w-md xl:max-w-xl">
        <h1 className="text-3xl font-bold text-primary-400">
          <Link href="/">Glocal</Link>
        </h1>
      </div>
    </header>
  );
};
export default Header;