
interface FormProps {

}

const Form: React.FC<FormProps> = () => {
    return (
        <form className="flex flex-col space-y-4">
            <div className="flex space-x-4">
                <input type="text" placeholder="Nombre" className="flex-1 px-4 py-2 border-2 bg-transparent border-slate-500 rounded focus:outline-none focus:ring focus:border-slate-700" />
                <input type="email" placeholder="Email" className="flex-1 px-4 py-2 border-2 bg-transparent border-slate-500 rounded focus:outline-none focus:ring focus:border-slate-700" />
            </div>
            <textarea name="" id="" cols={30} rows={11} placeholder="Escriba su mensaje..." className="px-4 py-2 border-2 bg-transparent border-slate-500 rounded focus:outline-none focus:ring focus:border-slate-700"></textarea>
            <input type="submit" className="w-full sm:w-auto px-6 py-2 border border-transparent text-white bg-slate-500 rounded hover:bg-slate-700 cursor-pointer" value="Enviar" />
        </form>
    )
}

export default Form;


