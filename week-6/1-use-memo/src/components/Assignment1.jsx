import { useState,useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState("");
    // Your solution starts here

    function fact(p) {
        if(p=="")
        {
            console.log("input inavlid");
            return 0;
        }
        p = Number(p);
        let element =1;
        for (let i = 2; i <=p; i++)
            element *= i;
        return element;
    }
    // Your solution ends here
    const expensiveValue = useMemo(()=>fact(input),[input]);

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}