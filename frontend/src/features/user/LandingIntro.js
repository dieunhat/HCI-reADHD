import TemplatePointers from "./components/TemplatePointers";

function LandingIntro() {
    return (
        <div className="h-[80%] rounded-l-xl bg-base-200">
            <div className="w-full carousel rounded-box ">
                <div className="carousel-item w-full">
                    <img src="background_1.png" className="w-full" />
                    <div className="flex justify-center w-full py-2 gap-2">
                </div>
                </div>
                <div className="carousel-item w-full">
                    <img src="background_2.png" className="w-full" />
                </div>
                <div className="carousel-item w-full">
                    <img src="background_3.png" className="w-full" />
                </div>
                <div className="carousel-item w-full">
                    <img src="background_4.png" className="w-full" />
                </div>
            </div>
        </div>
    );
}

export default LandingIntro;
