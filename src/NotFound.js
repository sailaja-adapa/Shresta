import erroricon from './404error.jpeg';

const NotFound = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white">
            <img 
            src={erroricon} 
            alt="Broken file" 
            className="w-screen h-screen max-w-screen max-h-screen object-contain" 
            onError={(e) => e.target.style.display = 'none'} 
/>
</div>

);
}



export default NotFound;