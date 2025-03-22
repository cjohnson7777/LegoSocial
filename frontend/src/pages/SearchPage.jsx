import { search_lego_set } from "../api/rebrick"
import { useState, useEffect } from "react"
import { SetDetails } from "./Home"
import { useLocation } from "react-router-dom"

function SearchPage(){
    const [loading, setLoading] = useState(true)
    const [legoSets, setLegoSets] = useState([])
    const location = useLocation();
    const query = location.state
    console.log(query)


    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await search_lego_set(query)
                console.log(data.results)
                setLegoSets(data.results)
                //setLegoSets(prevSets => [...prevSets, ...data.results]);                
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
            <p className="text-4xl ml-10 mt-15 font-bold">Explore 
                <span><input type="text" className="border rounded-md ml-10 font-light text-lg p-2 w-100" placeholder="search"/>
                <button className="border rounded-md ml-1 font-light text-lg p-2 hover:bg-gray-300 cursor-pointer">Search</button>
                </span>
            </p>
            <div className="flex flex-wrap grid grid-cols-3 gap-5 p-10">
                {loading ? <p>Loading</p> : legoSets.map((set) => {
                        return <SetDetails key={set.set_num} name={set.name} set_num={set.set_num} num_parts={set.num_parts} set_img_url={set.set_img_url} theme={set.theme_id}/>
                    })}
            </div>
            

        </div>
    )
}

export default SearchPage