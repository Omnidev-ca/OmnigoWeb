import TechWallpaper from "./tech-wallpaper";

export function Hero() {
    return (
    <div className=" mt-[130px] mb-[200px]">
        <TechWallpaper />
        <h1 className="text-6xl font-bold mb-4 text-center p-20 relative z-10">
            Votre projet mérite d'avoir de <span className="text-[#7DF9FF]">l'impact</span> !
        </h1>
    </div>
    )
}