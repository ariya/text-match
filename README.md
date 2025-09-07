# Text Match

A simple demo of text matching using the [BM25 algorithm](https://en.wikipedia.org/wiki/Okapi_BM25).

## Getting Started

1.  **Install Dependencies:**
```bash
npm install
```

2.  **Run the Search Script:**

```bash
./text-match.js <filename> "<query>"
```

* `<filename>`: The path to the text file you want to search. The file should contain one or more lines of text.
* `"<query>"`: The search query, enclosed in double quotes.

## Example Usage

To find the most relevant lines in `solar-system.txt` related to "gas giants composition":

```bash
./text-match.js solar-system.txt "gas giants composition"
```

This will output the top 3 most similar lines from `solar-system.txt` based on the provided query.