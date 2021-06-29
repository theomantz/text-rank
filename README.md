# Readme

You can read the original research paper for the TestRank algorithm [here](https://web.eecs.umich.edu/~mihalcea/papers/mihalcea.emnlp04.pdf)

The overall process by which this implementation of Text-Rank works is as follows:

1. The input string is split at the sentence mark
2. The sentences are then cleaned up and punctuation, excess spaces, and other superflous items are removed
3. Sentences are then passed to the tokenizer,  in the tokenizer, sentences are split further into singular words. 
4. Arrays of tokens, representative of sentences are then passed to the Lexer which appends a POS tag to each Token
   1. At this stage we would want to filter out words that the user has deemed unecessary
   2. They will input an array of candidate parts of speech (PoS) when instantiating the TextRank object
5. We will return a new array of Tokenized words, filtered by candidate PoS
6. The returned array will then be passed to the TextRank algorithm and keywords will then be extracted
7. If chosen, key phrased will then be assembled from the resulting arrays of tokens