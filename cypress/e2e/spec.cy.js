it("getServerSideProps returns mock", () => {
	const fact = "Chuck Norris drives a solar powered car at night.";

	cy.task("mockServer", { interceptUrl: `http://localhost:4000/jokes/random`, fixture: "fact.json" });

	cy.visit("http://localhost:3000");

	cy.contains("[data-cy=chuck-facts]", fact);
});
