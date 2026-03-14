import {useState, useEffect} from "react";

//a unique interface for each item
type item={
  id:string
  name:string
}
//defining allowed columns
type Col = "wishlist" |"bought"|"used"; 

export default function App(){
  const [items, setItem] = useState<Record<string, item>>(() => {
    const saved = localStorage.getItem("board")
    if (!saved) return {}

    try {
      return JSON.parse(saved).items || {}
    } catch {
      return {}
    }
  })

  const [cols, setCols] = useState<Record<Col, string[]>>(() => {
    const saved = localStorage.getItem("board")
    if (!saved)
      return { wishlist: [], bought: [], used: [] }

    try {
      return JSON.parse(saved).cols || {
        wishlist: [],
        bought: [],
        used: []
      }
    } catch {
      return { wishlist: [], bought: [], used: [] }
    }
  })
  const [query,setQuery]= useState("");
  const [suggestions , setSuggestions]= useState<string[]>([]);
  const [dragItem, setDragItem] = useState<{ id: string; from: Col } | null>(null)


  useEffect(()=>{ //whenever columns change
    localStorage.setItem("board", JSON.stringify({items,cols}));
  },[items,cols])

  
  const search= async(v:string)=>{
    if(v.length<2){
      setSuggestions([]);
      return;
    }
    const res=await fetch(`https://api.frontendeval.com/fake/food/${v}`)
    const data = await res.json();
    setSuggestions(data);
  }

  const addItem= (name:string)=>{
    const id= crypto.randomUUID()
    setItem(prev=>({
      ...prev ,
      [id]:{id,name} //new item inserted using a random key
    }))

    setCols(prev=>({
      ...prev,
      wishlist:[...prev.wishlist,id] // new item is added into the wishlist col
    }))

    setQuery("") //clears input searchbar
    setSuggestions([])
  }

  const moveItem = (id: string, from: Col, to: Col) => {
    if (from === to) return

    setCols(prev => {
      const fromArr = prev[from].filter(x => x !== id)
      const toArr = [...prev[to], id]

      return {
        ...prev,
        [from]: fromArr,
        [to]: toArr
      }
    })
  }

  const deleteItem= (id:string)=>{
    setItem(prev=>{
      const copy= {...prev}
      delete copy[id];
      return copy;
    })
    setCols(prev => ({
    wishlist: prev.wishlist.filter(x => x !== id),
    bought: prev.bought.filter(x => x !== id),
    used: prev.used.filter(x => x !== id)
  }))
  }

return (
  <div
    style={{
      padding: "20px",
      fontFamily: "Arial",
      background: "#f4f6f8",
      minHeight: "100vh"
    }}
  >
    {/* Search */}
    <div style={{ marginBottom: "20px", position: "relative", width: "300px" }}>
      <input
        value={query}
        placeholder="Search food..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
        onChange={(e) => {
          const v = e.target.value
          setQuery(v)
          search(v)
        }}
      />

      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ddd",
            width: "100%",
            marginTop: "4px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          {suggestions.map((s) => (
            <div
              key={s}
              onClick={() => addItem(s)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Columns */}
    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      {(["wishlist", "bought", "used"] as Col[]).map((col) => (
        <div
          key={col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragItem) {
              moveItem(dragItem.id, dragItem.from, col)
              setDragItem(null)
            }
          }}
          style={{
            flex: 1,
            background: "white",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            minHeight: "200px"
          }}
        >
          <h3 style={{ textTransform: "capitalize", marginBottom: "10px" }}>
            {col} ({cols[col].length})
          </h3>

          {cols[col].map((id) => (
            <div
              key={id}
              draggable
              onDragStart={() => setDragItem({ id, from: col })}
              style={{
                background: "#f9fafb",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #eee"
              }}
            >
              <span>{items[id].name}</span>

              <div style={{ display: "flex", gap: "6px" }}>

                {/* Move Left */}
                {col !== "wishlist" && (
                  <button
                    onClick={() =>
                      moveItem(
                        id,
                        col,
                        col === "bought" ? "wishlist" : "bought"
                      )
                    }
                    style={{
                      background: "#e5e7eb",
                      border: "none",
                      padding: "4px 6px",
                      cursor: "pointer",
                      borderRadius: "4px"
                    }}
                  >
                    ←
                  </button>
                )}

                {/* Move Right */}
                {col !== "used" && (
                  <button
                    onClick={() =>
                      moveItem(
                        id,
                        col,
                        col === "wishlist" ? "bought" : "used"
                      )
                    }
                    style={{
                      background: "#e5e7eb",
                      border: "none",
                      padding: "4px 6px",
                      cursor: "pointer",
                      borderRadius: "4px"
                    }}
                  >
                    →
                  </button>
                )}

                {/* Delete */}
                <button
                  onClick={() => deleteItem(id)}
                  style={{
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)
}