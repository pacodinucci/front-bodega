import { StaticImageData } from "next/image";
import Slider from "react-slick";

interface StorySlide {
    image: StaticImageData;
    description: string;
}

interface ImageSliderProps {
    slides: StorySlide[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    return (
        <div className='relative w-full h-full'>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className='w-full h-full'>
                        <img
                            src={slide.image}
                            alt={`Slide ${index}`}
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute bottom-0 left-0 p-4 bg-white/70'>
                            {/* <h3 className='text-lg font-bold'>{slide.title}</h3> */}
                            <p>{slide.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ImageSlider;