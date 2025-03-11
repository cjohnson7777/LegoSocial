import { get_lego_sets } from "../api/rebrick"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home(){
        const [loading, setLoading] = useState(true)
        const [legoSets, setLegoSets] = useState([])
    
        useEffect(() => {
            const fetchData = async () => {
                try{
                    const data = await get_lego_sets()
                    console.log(get_lego_sets())
                    setLegoSets(data.results)
                    console.log(legoSets)
                }catch(error){
                    console.log(error)
                }finally{
                    setLoading(false)
                }
            }
            fetchData()
    
        }, [])

    return (
        <div>
            <p className="text-4xl ml-10 mt-15 font-bold">Explore</p>
            <div className="flex flex-wrap grid grid-cols-3 gap-5 p-10">
                {loading ? <p>Loading</p> : legoSets.map((set) => {
                    return <SetDetails key={set.set_num} name={set.name} set_num={set.set_num} num_parts={set.num_parts} set_img_url={set.set_img_url} theme={set.theme_id}/>
                })}
              
            </div>

        </div>
    )
}

function SetDetails(props){
    let themeName = ''
    let num = props.theme
    const navigate = useNavigate()

    switch (num) {
        case 171:
            themeName = 'Star Wars'
            break
        case 155:
            themeName = "Modular Buildings"
        case 246:
            themeName = "Harry Potter"
            break
        case 673:
            themeName = 'Creator Expert'
            break
        default:
            themeName = 'Other'
    }

    const handleNav = () => {
        let setNum = props.set_num
        navigate(`/sets/:${props.set_num}`, { state: { setNum: setNum} }) 
    }

    return (
        <div className="cursor-pointer" onClick={handleNav}>
            <img className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-12/8" src={props.set_img_url} alt="set-image" />
            <p className="mt-1 text-md font-medium text-gray-900">{props.name}</p>
            <p className="mb-3 text-md text-gray-700">{props.num_parts} Pieces</p>
            <p>{props.theme}: {themeName}</p>
  
        </div>
    )
}

export default Home