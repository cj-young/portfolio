import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="width-full">
      <ul className="width-full align-center flex justify-start gap-4 p-8">
        <li>
          <Link className="text-gray-400 underline" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-gray-400 underline" to="/projects/com-chess">
            Com.chess
          </Link>
        </li>
        <li>
          <Link className="text-gray-400 underline" to="/projects/whischat">
            Whischat
          </Link>
        </li>
        <li>
          <Link className="text-gray-400 underline" to="/projects/dev-forge">
            DevForge
          </Link>
        </li>
      </ul>
    </nav>
  );
}
