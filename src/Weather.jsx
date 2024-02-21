import { useEffect, useRef, useState } from "react";

export default function Weather() {
    const inputRef = useRef();
    // let key = "ddbcd4f4eaa58fdc6236000e53ff1db3";
    const [data, setData] = useState({})
    let [cityName, setCityName] = useState("mohali");
    let [dataFlag, setDataFlag] = useState(false);

    function getCityName() {
        setCityName(inputRef.current.value);
        setDataFlag(false)
    }

    async function fetchData() {
        setDataFlag(true);
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`);
        let json = await res.json();
    
        setData(json);
    }

    return (
        <>
            <div id='container'>
                <input ref={inputRef} type='text' placeholder='search here' onKeyUp={getCityName} />
                <button onClick={fetchData}>Search</button>
                <div id="data">
                    {

                        dataFlag ?
                            <>
                                <h2>{cityName}, {data?.sys?.country}</h2>
                                <p>Temprature: {data?.main?.temp}</p>
                                <p>Humidity: {data?.main?.humidity}</p>
                                <p>Sunrise: {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()}</p>
                                <p>Sunset: {new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}</p>
                            </>
                            :
                            ""
                    }
                </div>
            </div>
        </>
    );
}