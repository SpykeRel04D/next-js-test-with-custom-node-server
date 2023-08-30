function HomePage({ fact }) {
	return (
		<div>
			<div data-cy="chuck-facts">{fact ?? "Not available"}</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	console.log("\x1b[33m > HomePage getServerSideProps running. \x1b[0m");
	console.log("API URL: ", process.env.NEXT_PUBLIC_API_BASE_URL);

	const url = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
	const result = await fetch(url + "jokes/random", {
		headers: {
			Accept: "application/json"
		}
	})
		.then((res) => {
			console.log("Inside then res");
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			console.log("Inside then data");
			return {
				props: {
					fact: data.value
				}
			};
		})
		.catch((err) => {
			console.log("Inside catch");
			return {
				props: {
					fact: null
				}
			};
		});

	console.log("Result: ", result);

	return result;
}

export default HomePage;
