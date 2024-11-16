import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        console.log(count);
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Counter</h1>
            <p>Current Count: {count}</p>
            <button //
                type="button"
                onClick={handleClick}
            >
                Increment
            </button>
        </div>
    );
};
