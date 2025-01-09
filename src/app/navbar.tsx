export default function Navbar(){
    return (
        <nav className="bg-gradient-to-r from-green-700 to-green-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                <img src="plant-icon.png" alt="Logo Piantina" className="w-10 h-10" />
                <a href="#" className="text-2xl font-bold text-white tracking-wide">Fie-co</a>
                </div>
                <ul className="flex space-x-6">
                <li><a href="#" className="nav-link">Home</a></li>
                <li><a href="wiki.html" className="nav-link">Wiki</a></li>
                <li><a href="qa.html" className="nav-link">Q&A</a></li>
                <li><a href="iot.html" className="nav-link">Monitoraggio Dati</a></li>
                </ul>
            </div>
        </nav> 
    )
}