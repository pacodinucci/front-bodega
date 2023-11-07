import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import imagen1 from "@/public/nuestrosvinos.png";
import imagen2 from "@/public/leyendatienda.png";
import imagen3 from "@/public/medanovinedo.jpg";
import imagen5 from "@/public/bodeganoche.jpeg";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/ProductList";
import ImageSlider from "@/components/Slider";


export default async  function Home() {

  const products = await getProducts({ isFeatured: true });

  const slides = [
    {
      image: {
        src: "../public/medanovinedo.jpg",
        width: 1024,
        height: 768
      },
      description: "sdjflnsljfnalkdfasd"
    },
    {
      image: {
        src: "../public/bodeganoche.jpeg",
        width: 1024,
        height: 768
      },
      description: "sdfowefuiowoeifwweewee"
    }
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
        <section className="mb-48">
          <div className="flex justify-between items-end px-16 pt-8 mb-8">
            <Image src={imagen1} alt="logotipotienda" width={250} />
            <div className="mb-2 border-l-4 pl-4 border-amber-700">
              <Image src={imagen2} alt="leyendatienda" width={350} />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
              <ProductList items={products} /> 
            </div>
          </div>
        </section>
        <section className="h-screen bg-slate-500">
          <ImageSlider slides={slides} />
        </section>
      </main>
    </>
  )
}
