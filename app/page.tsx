import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import imagen1 from "@/public/nuestrosvinos.png";
import imagen2 from "@/public/leyendatienda.png";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import Map from "@/components/Map";

export default async function Home() {

  const products = await getProducts({ isFeatured: true });

  const slides = [
    "/bannervinedo.png",
    "/bannertanques.png",
    "/bannercava.png"
  ]

  return (
    <>
      <nav className='absolute w-full z-50 flex items-center justify-between pt-4 px-6'>
        <img src="logogaviotas.svg" alt="logo" className='h-[10vh] w-[10vw]' />
        <div>
          <ul className='flex text-white gap-12 mr-24 py-4 px-4 border-b border-white oswald.classname'>
            <li>LOS VINOS</li>
            <li>LA BODEGA</li>
            <li>BARRICA PROPIA</li>
            <li>EVENTOS</li>
            <li>CONTACTO</li>
          </ul>
        </div>
        <div>
          <ShoppingCart size={20} color="white" className="mr-12" />
        </div>
      </nav>
      <main>
        <section className='bg-landing h-screen bg-cover bg-center flex items-center justify-center'>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <img src="alestelogotipo.svg" alt="logo" className='h-[36vh] w-[36vw] z-10' />
        </section>
        <section className="mb-24">
          <div className="flex justify-between items-end px-16 pt-8 mb-8">
            <Image src={imagen1} alt="logotipotienda" width={250} />
            <div className="mb-2 border-l-4 pl-4 border-amber-700">
              <Image src={imagen2} alt="leyendatienda" width={350} />
            </div>
          </div>
          <div>
            <div className="flex flex-col px-4 sm:px-6 lg:px-8">
              <ProductList items={products} />
            </div>
          </div>
        </section>
        <section className="flex justify-center mb-12">
          <div className="max-w-[95vw]">
            <Slider autoSlide={true} autoSlideInterval={10000}>
              {slides.map((slide) => (
                <img key={slide} src={slide} alt="" className="max-w-screen" />
              ))}
            </Slider>
          </div>
        </section>
        <section className="h-[70vh] bg-zinc-50 flex items-center justify-center">
          <div className="flex justify-center items-center">
            <div className="w-1/2">
              <h3 className="ml-24 text-2xl">HISTORIA DE LA BODEGA</h3>
              <p className="w-3/4 ml-24">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sunt ex corrupti, quos quisquam reiciendis commodi veritatis cum alias nesciunt! Veritatis alias ullam, quo quia, sunt mollitia possimus harum dolore beatae repudiandae sequi inventore quis nihil, voluptas ab! Nam suscipit possimus temporibus velit incidunt enim totam, voluptatem deleniti? Dolor accusantium itaque rerum fugit unde cumque doloremque reprehenderit provident laborum illum omnis obcaecati expedita quis quisquam debitis dignissimos laboriosam, veritatis officiis hic? Odit vel illo iste fugit autem vero culpa aspernatur voluptatum recusandae pariatur dicta neque nobis accusamus architecto quo temporibus dolor, quas ipsum aliquid? Aliquid maxime quaerat commodi expedita! Obcaecati?</p>
            </div>
            <div className="w-1/2 flex justify-center">
              <Image src="/amanecerquinta.jpg" alt="imagen quinta" width={500} height={0} />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="flex justify-center items-center gap-4 mb-12">
            <Image src="/bannerbarrica.png" alt="Imagen barrica" width={720} height={0} />
            <Image src="/bannerpersonalizados.png" alt="Imagen personalizados" width={720} height={0} />
          </div>
          <div className="flex justify-center">
            <Image src="/eventos.png" alt="Imagen eventos" width={1444} height={0} />
          </div>
        </section>
        <section>
          <div className="flex gap-12 w-full p-10 bg-zinc-200">
            <div className="w-3/4 space-y-4">
              <h3 className="text-2xl text-gray-800 font-semibold">UBICACIÓN</h3>
              <Map center={[-38.814047, -62.694058]} zoom={10} />
            </div>
            <div className="w-3/4  rounded-lg space-y-4">
              <h3 className="text-2xl text-gray-800 font-semibold">CONTACTO</h3>
                <form className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <input type="text" placeholder="Nombre" className="flex-1 px-4 py-2 border-2 bg-transparent border-slate-500 rounded focus:outline-none focus:ring focus:border-slate-700" />
                    <input type="email" placeholder="Email" className="flex-1 px-4 py-2 border-2 bg-transparent border-slate-500 rounded focus:outline-none focus:ring focus:border-slate-700" />
                  </div>
                  <textarea name="" id="" cols={30} rows={11} placeholder="Escriba su mensaje..." className="px-4 py-2 border-2 bg-transparent border-slate-500 rounded focus:outline-none focus:ring focus:border-slate-700"></textarea>
                  <input type="submit" className="w-full sm:w-auto px-6 py-2 border border-transparent text-white bg-slate-500 rounded hover:bg-slate-700 cursor-pointer" value="Enviar" />
                </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
