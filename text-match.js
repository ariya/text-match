#!/usr/bin/env node

const fs = require('fs');

const tokenize = text =>
    text.toLowerCase()
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .split(' ')
        .filter(term => term);

const bm25 = (sentences, query, top_k = 3) => {
    const k1 = 1.2;
    const b = 0.75;

    const doc = sentences.map(tokenize);
    const qt = tokenize(query);

    const df = {};
    doc.forEach(terms => {
        const uniqueTerms = new Set(terms);
        uniqueTerms.forEach(term => {
            df[term] = (df[term] || 0) + 1;
        });
    });

    const avgdl = doc.reduce((sum, terms) => sum + terms.length, 0) / doc.length;

    const scores = doc.map((terms, index) => {
        let score = 0;
        qt.forEach(qi => {
            if (df[qi]) {
                const idf = Math.log((sentences.length - df[qi] + 0.5) / (df[qi] + 0.5) + 1);
                const tf = terms.filter(term => term === qi).length;
                const numerator = tf * (k1 + 1);
                const denominator = tf + k1 * (1 - b + b * (terms.length / avgdl));
                score += idf * (numerator / denominator);
            }
        });
        return { index, score };
    });

    return scores.sort((a, b) => b.score - a.score).slice(0, top_k);
}

(async () => {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log('Usage: text-match document query');
        process.exit(-1);
    }
    const filename = args[0];
    const query = args[1];

    const document = fs.readFileSync(filename, 'utf-8');
    const sentences = document.split('\n')
        .map(line => line.trim())
        .filter(line => line.trim().length > 0);

    console.log('Searching for', query);
    const matches = await bm25(sentences, query);
    console.log();
    matches.map(match => {
        const { index, score } = match;
        const sentence = sentences[index];
        const relevancy = Math.round(score * 100) / 100;
        console.log('Line', index + 1, `(score: ${relevancy})`, sentence);
    });

})();
