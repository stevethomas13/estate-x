import React, { useState } from "react";
function Home() {
    const [value, setValue] = useState("");
    function handleChange(e) {
      console.log('hi')
        setValue(e.target.value);
    }
    return (
        <div
            style={{ textAlign: "center", margin: "auto" }}
        >
            <h1 style={{ color: "Green" }}>
                GeeksforGeeks
            </h1>
            <h3>
                Exemple for React onChange Event Handler
            </h3>
            <input value={value} onChange={handleChange} />
            <br />
            <div>User Input:- {value}</div>
        </div>
    );
}
 
export default Home;