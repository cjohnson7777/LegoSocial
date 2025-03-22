import { get_lego_sets, search_lego_set } from "../api/rebrick"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home(){
        const [loading, setLoading] = useState(true)
        const [legoSets, setLegoSets] = useState([])
        const [page, setPage] = useState(1)
        const [search, setSearch] = useState("")
        const [query, setQuery] = useState("")
        const [count, setCount] = useState(0)
    
        // GET LEGO SETS
        useEffect(() => {
            const fetchData = async () => {
                try{
                    const data = await get_lego_sets(page)
                    console.log(get_lego_sets())
                    setLegoSets(prevSets => [...prevSets, ...data.results]);
                    console.log(legoSets)
                    
                }catch(error){
                    console.log(error)
                }finally{
                    setLoading(false)
                }
            }
            if (query === ""){ 
                fetchData()
            }
    
        }, [page, query])

        // GET NEXT PAGE
        const nextPage = () => {
            if (query !== ""){
                return
            }
            setPage(prevPage => prevPage + 1)
        }

        // GET SEARCHED SETS
        useEffect(() => {
            const fetchSearchResults = async () => {
                setLoading(true)
                try{
                    const data = await search_lego_set(query)
                    setLegoSets(data.results)
                    setCount(data.count)
                }catch (error) {
                    console.log(error)
                }finally{
                    setLoading(false)
                }
            }

            if (query !== "") {
                fetchSearchResults()
            }
        }, [query])

        // HANDLE SEARCH
        const handleSearch = () => {
            if (search.trim() === ""){
                return
            }
            setPage(1)
            setLegoSets([])
            setQuery(search)
        }

    return (
        <div className="flex flex-col">
            <p className="flex justify-center text-4xl ml-10 mt-15 font-bold ">Explore 
                <span><input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="border rounded-md ml-10 font-light text-lg p-2 w-100" placeholder="search"/>
                <button onClick={handleSearch} className="border rounded-md ml-1 font-light text-lg p-2 hover:bg-gray-300 cursor-pointer">Search</button>
                </span>
            </p>
            {!loading && <p className=" flex ml-10 mb-0 mt-5">{query !== "" && <p>{count} Results Found</p>}</p>}
            <div className="flex flex-wrap grid grid-cols-3 gap-5 px-10 py-5">
                {loading ? <p>Loading</p> : legoSets.map((set) => {
                    return <SetDetails key={set.set_num} name={set.name} set_num={set.set_num} num_parts={set.num_parts} set_img_url={set.set_img_url} theme={set.theme_id}/>
                })}
            </div>
            <button className={`flex p-2 w-1/2 justify-center ml-60 mb-10 border rounded hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 ${query !== "" ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={nextPage}>Load More</button>

        </div>
    )
}

export function SetDetails(props){
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
        let set = {
            name: props.name,
            pieces: props.num_parts,
            img: props.set_img_url,
            num: props.set_num
        }
        navigate(`/sets/:${props.set_num}`, { state: { set} }) 
    }

    return (
        <div className="cursor-pointer" onClick={handleNav}>
            <img className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-12/8" src={props.set_img_url} alt="set-image" />
            <p className="mt-1 text-md font-medium text-gray-900">{props.name}</p>
            <p className="mb-3 text-md text-gray-700">{props.num_parts} Pieces</p>
            <p>{themeName}</p>
  
        </div>
    )
}

export default Home