import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
	const response = await fetch(url, config);
	const resData = await response.json();

	if(!response.ok) {
		throw new Error(resData.message || "Failed to send request");
	}

	return resData;
}

export default function useHttp(url, config, initialData) {
	const [data, setData] = useState(initialData);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState();

	const sendRequest = useCallback(async function sendRequest(data) {
		setIsFetching(true);
		try {
			const resData = await sendHttpRequest(url, {...config, body: data});
			setData(resData);
		} catch (error) {
			setError(error.message || "Something went wrong");
		}
		setIsFetching(false);
	}, [url, config]);

	useEffect(() => {
		console.log(!config || config.method === "GET");
		if(!config || !config.method || config.method === "GET") {
			console.log("sending request");
			sendRequest();
		}
	}, [sendRequest, config]);

	return {
		data,
		isFetching,
		error,
		sendRequest
	}
	
}