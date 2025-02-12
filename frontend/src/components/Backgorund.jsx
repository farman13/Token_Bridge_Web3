const Background = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-green-300 to-blue-300 overflow-hidden">
            <div className="absolute w-40 h-40 bg-white opacity-20 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
            <div className="absolute w-60 h-60 bg-white opacity-10 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
        </div>
    );
};

export default Background;