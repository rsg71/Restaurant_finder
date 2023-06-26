import { useEffect, useState } from 'react'
import API from '../utils/API';


export default function MyComponent() {


    const [data, setData] = useState<any>(null);


    useEffect(() => {
        API.getData()
        .then(res => {
            console.log(res);
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (

        <div>
            <div>
                {JSON.stringify(data)}
            </div>
        </div>
    )
}