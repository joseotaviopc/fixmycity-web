import { Link } from "react-router-dom";

export function Sidebar() {
    return <div className="w-1/5 bg-gray-200 flex flex-col gap-2 p-2" >
        <Link to='/'>Home</Link>
        <Link to='/issue'>Report Issue</Link>
        <Link to='/reports'>View Reports</Link>
        <Link to='/settings'>Settings</Link>
    </div>;
}