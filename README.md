# Text Match

A simple demo of text matching using the [BM25 algorithm](https://en.wikipedia.org/wiki/Okapi_BM25).

Requirement: [Node.js](https://nodejs.org), [Deno](https://deno.com), or [Bun](https://bun.sh).

```bash
./text-match.js filename query
```

* `filename`: Path to the text file you want to search.
* `query`: Search query, enclosed in double quotes.


As an example, to find the most relevant lines in `solar-system.txt` related to "gas giants composition":

```bash
./text-match.js solar-system.txt "gas giants composition"
```

This will output the top 3 most similar lines from `solar-system.txt` based on the provided query.