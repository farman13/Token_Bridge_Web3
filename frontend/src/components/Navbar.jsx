import Connectbutton from "./ConnectButton";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="bg-gray-900 p-4 relative z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-3xl"><div>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABu0lEQVR4nO2XQU/CMBTHywXFBCNcDErk4AlBTZSDgQ/rwVvjWLu1b10ZIUayk98J00WSSXCAdAjz/ZIly/pv+976b9NHCIIgCIJsgeThoAgPKUwiaZZ+PLC2vQtI/ttEZFH2iCxKIsi+IXk4AK6ffCfsCvFeW6ePoqpu9KafLWtsGwNZHNDzRldZA4hX0crb794vYkgaKKVlcKApXNU3H4UQtZ/+QtLuqr7vR5emH7GE1RjAgaYRBXzcWTaI74fdxAYONG0lkEsMlNLy3K9LJ/nyo82VyC0GmXEu7+rMljZiwEQsInFFUqC1LCLRWinQWhaRaK0UaK19thZjrCqEbmumLwiZlbIGgRc4FUPdNlfr2WxWyppjlVYuxjDUbbZGDCSO48rkeXIMAEdzIedBJ124CBE+zt8pjStGayZxnKBhrtzfCh2me0KMW6amoJRurJUbxKCUqk/ZtEoAJsn9f+nDdC8I3hrAopuVld0fasFc+V3XPfN9dZ9ky3QPeHQHQ7g2tXN62T3v48SUoAEPOoEXPeyLVrqjW86jc7LKy+ZP2PD9LrQkvUfy8n1eWoV7hB/gHkEQBEEQks0npiwDPS4USB8AAAAASUVORK5CYII=" alt="bridge" /></div>
                    </div>
                    <div className="text-white text-3xl pl-2 font-semibold font-serif">  BRIDGE</div>
                    <div className="flex-1 flex justify-center space-x-4 text-lg">
                        <Link to='/' className="text-white  hover:bg-blue-400 py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">HOME</Link>
                        <Link to='/lockTokens' className="text-white  hover:bg-blue-400 py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Lock & Unlock Tokens</Link>
                        <Link to='/claimWTokens' className="text-white  hover:bg-blue-400 py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Claim & Burn W-Tokens</Link>
                    </div>
                    <div>
                        <Connectbutton />
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;