import { useEffect, useContext, useState } from 'react';
import axios from "axios";
import { DataContext } from "./Utils"

function DataManager() {
    const { threads, setState } = useContext(DataContext);
    const [refreshInterval, setRefreshInterval] = useState(1000);
    const [lastUpdate, setLastUpdate] = "";

    async function getThreadData() {
        let dataObj = await axios.post('https://estuary.altinc.ca/threads', {
            userId: 'cl1m8wqyr4917bqskm0z1mcxb',
        })
            .then((response) => {
                // console.log(response.data)
                return response.data
            }, (error) => {
                return error;
            });

        return dataObj

    }


    async function processThreadData() {
        let threadData = await getThreadData()
        // console.log(threadData)
        let tempArray = []
        for (let item in threadData) {
            tempArray[item] = []
            tempArray[item].key = threadData[item].party
            tempArray[item].label = threadData[item].party
            tempArray[item].new = threadData[item]._count.body
        }
        setState({ threads: tempArray })
    }



    useEffect(() => {
        // setThreads(["000","0001"])
        // console.log("test")
        processThreadData()
        // console.log(threads)
    }, []);

    const fetchUpdate = () => {
        processThreadData()
    }

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchUpdate, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [refreshInterval]);

    // return (
    //     <div>Main Component</div>
    // )
}
export { DataManager };